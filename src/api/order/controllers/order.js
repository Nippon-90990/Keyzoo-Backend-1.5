// Updated code after new schema changes CartItems to Order Collection
// src/api/order/controllers/order.js
"use strict";

// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

function generateEmailTemplate(order, cartItems, assignedKeys) {

  const orderDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const itemsHtml = cartItems
    .map((item) => {
      const keysForProduct = assignedKeys
        .filter((k) => k.product === item.title)
        .map((k) => `<span style="color:#008000;">${k.key}</span>`)
        .join("<br/>");

      return `
        <tr>
          <td style="padding:15px; border-bottom:1px solid #eee;">
            <strong>${item.title}</strong><br/>
            Quantity: ${item.quantity}<br/>
            Price: ₹${item.price}<br/>
            Keys:<br/> ${keysForProduct || "<span style='color:orange;'>Pending delivery</span>"}
          </td>
        </tr>`;
    })
    .join("");

  return `
  <html>
    <body style="font-family: Arial, sans-serif; background:#ffffff; margin:0; padding:0;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table width="600" style="max-width:600px; margin:0 auto;">
              
              <tr>
                <td style="padding:20px;">
                  <img src="https://yourcdn.com/logo.png" height="30"/>
                </td>
                <td style="padding:20px; text-align:right; font-size:12px;">
                  ${orderDate}
                </td>
              </tr>

              <tr>
                <td colspan="2" style="padding:20px; text-align:center;">
                  <h2>Here are your keys 🎉</h2>
                  <p>Thank you for your purchase.</p>
                  <a href="${process.env.FRONTEND_URL}/orders/${order.id}"
                     style="padding:10px 20px; background:#000; color:#fff; text-decoration:none;">
                    View Order
                  </a>
                </td>
              </tr>

              ${itemsHtml}

              <tr>
                <td colspan="2" style="background:#000; color:#fff; padding:20px; text-align:center;">
                  Support: support@yourbrand.com
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

async function assignKeysAndSendEmail(order, cartItems, strapi) {
  let assignedKeys = [];

  for (const item of cartItems) {
    const product = await strapi.db.query("api::product.product").findOne({
      where: { title: item.title },
      populate: { gameKeys: true },
    });

    if (!product) continue;

    const availableKeys = product.gameKeys.filter(k => k.isAvailable);
    const keysToAssign = availableKeys.slice(0, item.quantity);

    for (const key of keysToAssign) {
      await strapi.db.query("api::game-key.game-key").update({
        where: { id: key.id },
        data: { isAvailable: false, assignedAt: new Date() },
      });

      assignedKeys.push({ product: product.title, key: key.code });
    }
  }

  const totalRequiredKeys = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  let deliveryStatus = "pending";
  if (assignedKeys.length === totalRequiredKeys) deliveryStatus = "completed";
  else if (assignedKeys.length > 0) deliveryStatus = "partial";

  await strapi.db.query("api::order.order").update({
    where: { id: order.id },
    data: {
      deliveryStatus,
      manualDeliveryRequired: assignedKeys.length < totalRequiredKeys,
      gameKeysAssigned: assignedKeys.length > 0,
      deliveredAt: deliveryStatus === "completed" ? new Date() : null,
      assignedKeys,
      totalKeysRequired: totalRequiredKeys,
      totalKeysAssigned: assignedKeys.length,
    },
  });

  // send email
  const htmlTemplate = generateEmailTemplate(order, cartItems, assignedKeys);

  await resend.emails.send({
    from: "Keyzoo <noreply@mail.quickcheckout.in>",
    to: order.deliveryEmail,
    subject: `Your Game Keys - Order #${order.orderNumber}`,
    html: htmlTemplate,
  });
}

// @ts-ignore
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({

  async webhook(ctx) {
    const sig = ctx.request.headers["stripe-signature"];
    const raw = Buffer.from(ctx.request.body[Symbol.for("unparsedBody")], "utf8");

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        raw,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      strapi.log.error(`❌ Stripe signature verification failed: ${err.message}`);
      return ctx.badRequest("Webhook Error");
    }

    if (event.type !== "checkout.session.completed") {
      strapi.log.info(`Ignored Stripe event: ${event.type}`);
      return ctx.send({ received: true });
    }

    const session = event.data.object;
    strapi.log.info(`🎉 Checkout completed: ${session.id}`);

    try {
      const userId = session.metadata?.userId;
      if (!userId) throw new Error("Session missing userId in metadata.");

      const cartItems = JSON.parse(session.metadata.cart || "[]");
      if (!Array.isArray(cartItems) || cartItems.length === 0) {
        throw new Error("Cart metadata missing or invalid.");
      }

      const existing = await strapi.db.query("api::order.order").findOne({
        where: { stripeSessionId: session.id },
      });

      if (existing) {
        strapi.log.warn("⚠️ Duplicate webhook ignored");
        return ctx.send({ received: true });
      }

      // 1. Create Order
      const order = await strapi.entityService.create("api::order.order", {
        data: {
          orderNumber: `STORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          totalAmount: session.amount_total,
          currency: session.currency?.toUpperCase() || "INR",
          paymentMethod: session.payment_method_types?.[0] || "card",
          paymentProvider: "stripe",
          paymentStatus: "paid",
          stripeSessionId: session.id,
          stripePaymentIntentId: session.payment_intent,
          deliveryEmail: session.customer_email,
          user: userId,
          cartSnapshot: cartItems, // ✅ save cart JSON
          status: "processing",
          deliveryStatus: "pending",
        },
      });

      strapi.log.info(
        `✅ Order ${order.orderNumber} created with ${cartItems.length} items.`
      );

      await assignKeysAndSendEmail(order, cartItems, strapi);

      // // 2. Assign Game Keys
      // let assignedKeys = [];
      // for (const item of cartItems) {
      //   const product = await strapi.db.query("api::product.product").findOne({
      //     where: { title: item.title },
      //     populate: { gameKeys: true },
      //   });

      //   if (!product) {
      //     strapi.log.warn(`⚠️ Product not found: ${item.title}`);
      //     continue;
      //   }

      //   const availableKeys = product.gameKeys.filter(k => k.isAvailable);
      //   const keysToAssign = availableKeys.slice(0, item.quantity);

      //   if (keysToAssign.length < item.quantity) {
      //     strapi.log.warn(
      //       `⚠️ Not enough keys for ${item.title}. Needed: ${item.quantity}, got: ${keysToAssign.length}`
      //     );
      //   }

      //   for (const key of keysToAssign) {
      //     await strapi.db.query("api::game-key.game-key").update({
      //       where: { id: key.id },
      //       data: { isAvailable: false, assignedAt: new Date() },
      //     });

      //     assignedKeys.push({ product: product.title, key: key.code });
      //   }
      // }

      // const totalRequiredKeys = cartItems.reduce(
      //   (sum, item) => sum + item.quantity,
      //   0
      // );

      // // 3. Update Order Delivery Info
      // let deliveryStatus;

      // if (assignedKeys.length === 0) {
      //   deliveryStatus = "pending";
      // } else if (assignedKeys.length < totalRequiredKeys) {
      //   deliveryStatus = "partial";
      // } else {
      //   deliveryStatus = "completed";
      // }

      // await strapi.db.query("api::order.order").update({
      //   where: { id: order.id },
      //   data: {
      //     deliveryStatus,
      //     manualDeliveryRequired: assignedKeys.length < totalRequiredKeys,
      //     gameKeysAssigned: assignedKeys.length > 0,
      //     deliveredAt: deliveryStatus === "completed" ? new Date() : null,
      //     assignedKeys,
      //     totalKeysRequired: totalRequiredKeys,
      //     totalKeysAssigned: assignedKeys.length,
      //   },
      // });

      // // 4. Send Email with Keys
      // if (order.deliveryEmail) {

      //   const htmlTemplate = generateEmailTemplate(order, cartItems, assignedKeys);

      //   await resend.emails.send({
      //     from: "Keyzoo <noreply@mail.quickcheckout.in>",
      //     to: order.deliveryEmail,
      //     subject: assignedKeys.length > 0
      //       ? `Your Game Keys - Order #${order.orderNumber}`
      //       : `Order Confirmed - Keys will be delivered soon (#${order.orderNumber})`,
      //     html: htmlTemplate,
      //   });

      //   strapi.log.info(`📩 Email sent to ${order.deliveryEmail}`);
      // }

    } catch (err) {
      strapi.log.error("❌ Webhook order handling failed:", err);
      return ctx.internalServerError("Order handling failed");
    }

    ctx.send({ received: true });
  },
  async sendKeysManually(ctx) {
    const { orderId } = ctx.request.body;

    if (!orderId) {
      return ctx.badRequest("Order ID required");
    }

    // if (ctx.request.header['x-admin-secret'] !== process.env.ADMIN_SECRET) {
    //   return ctx.unauthorized("Not allowed");
    // }

    // if (ctx.state.user.role.name !== "Admin") {
    //   return ctx.forbidden("Admins only");
    // }

    // if any error then simply remove it...

    // 🔐 Must be logged in
    if (!ctx.state.user) {
      return ctx.unauthorized("Login required");
    }

    // 🔐 Must be admin
    if (ctx.state.user.role?.name !== "Admin") {
      return ctx.forbidden("Admins only");
    }

    const order = await strapi.entityService.findOne("api::order.order", orderId);

    if (!order) return ctx.notFound("Order not found");

    const cartItems = order.cartSnapshot || [];
    let assignedKeys = order.assignedKeys || [];

    // 🔥 Assign remaining keys from DB
    for (const item of cartItems) {
      const product = await strapi.db.query("api::product.product").findOne({
        where: { title: item.title },
        populate: { gameKeys: true },
      });

      if (!product) continue;

      const alreadyAssigned = assignedKeys.filter(
        k => k.product === item.title
      ).length;

      const remainingQty = item.quantity - alreadyAssigned;

      if (remainingQty <= 0) continue;

      const availableKeys = product.gameKeys.filter(k => k.isAvailable);
      const keysToAssign = availableKeys.slice(0, remainingQty);

      for (const key of keysToAssign) {
        await strapi.db.query("api::game-key.game-key").update({
          where: { id: key.id },
          data: { isAvailable: false, assignedAt: new Date() },
        });

        assignedKeys.push({ product: product.title, key: key.code });
      }
    }

    // 🔥 Recalculate
    const totalRequiredKeys = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    let deliveryStatus;

    if (assignedKeys.length === 0) {
      deliveryStatus = "pending";
    } else if (assignedKeys.length < totalRequiredKeys) {
      deliveryStatus = "partial";
    } else {
      deliveryStatus = "completed";
    }

    // 🔥 Update order
    await strapi.entityService.update("api::order.order", orderId, {
      data: {
        assignedKeys,
        deliveryStatus,
        deliveredAt: deliveryStatus === "completed" ? new Date() : null,
        manualDeliveryRequired: assignedKeys.length < totalRequiredKeys,
        totalKeysAssigned: assignedKeys.length,
      },
    });

    // 🔥 Send email again
    const htmlTemplate = generateEmailTemplate(order, cartItems, assignedKeys);

    await resend.emails.send({
      from: "Keyzoo <noreply@mail.quickcheckout.in>",
      to: order.deliveryEmail,
      subject:
        deliveryStatus === "completed"
          ? `Your Remaining Keys - Order #${order.orderNumber}`
          : `Partial Delivery Update (#${order.orderNumber})`,
      html: htmlTemplate,
    });

    return ctx.send({ success: true });
  },
  async resendEmail(ctx) {
    if (!ctx.state.user) {
      return ctx.unauthorized("Login required");
    }

    if (ctx.state.user.role.name !== "Admin") {
      return ctx.forbidden("Admins only");
    }

    const { orderId } = ctx.request.body;

    const order = await strapi.entityService.findOne("api::order.order", orderId);

    if (!order) {
      return ctx.notFound("Order not found");
    }

    const html = generateEmailTemplate(
      order,
      order.cartSnapshot,
      order.assignedKeys
    );

    await resend.emails.send({
      from: "Keyzoo <noreply@mail.quickcheckout.in>",
      to: order.deliveryEmail,
      subject: `Your Keys - ${order.orderNumber}`,
      html,
    });

    return ctx.send({ success: true });
  },
  async deleteOrder(ctx) {
    if (!ctx.state.user) {
      return ctx.unauthorized("Login required");
    }

    if (ctx.state.user.role.name !== "Admin") {
      return ctx.forbidden("Admins only");
    }

    const { orderId } = ctx.request.body;

    await strapi.entityService.delete("api::order.order", orderId);

    return ctx.send({ success: true });
  },
  async createCashfreeOrder(ctx) {
    try {
      const { cartItems = [], email, userId, total } = ctx.request.body || {};

      if (!userId) return ctx.badRequest("Login required");
      if (!cartItems.length) return ctx.badRequest("Cart empty");
      if (!email) return ctx.badRequest("Email required");

      const order_id = `cf_${Date.now()}`;

      const payload = {
        order_id,
        order_amount: total,
        order_currency: "INR",
        customer_details: {
          customer_id: String(userId),
          customer_email: email,
          customer_phone: "9999999999",
          customer_name: "User",
        },
        order_meta: {
          return_url: `${process.env.FRONTEND_URL}/success`,
        },
      };

      const res = await fetch("https://sandbox.cashfree.com/pg/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2022-09-01",
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        strapi.log.error("❌ Cashfree API Error:", data);
        return ctx.throw(400, "Cashfree order creation failed");
      }

      // 🔥 SAVE TEMP ORDER (CRITICAL)
      await strapi.entityService.create("api::order.order", {
        data: {
          orderNumber: `CF-TEMP-${Date.now()}`,
          cashfreeOrderId: order_id,
          cartSnapshot: cartItems,
          user: userId,
          deliveryEmail: email,
          paymentStatus: "pending",
          paymentProvider: "cashfree",
          status: "processing",
          deliveryStatus: "pending",
        },
      });

      ctx.send({
        payment_session_id: data.payment_session_id,
      });

    } catch (err) {
      strapi.log.error("❌ Cashfree create error:", err);
      return ctx.internalServerError("Cashfree order failed");
    }
  },
  async cashfreeWebhook(ctx) {
    try {
      const payload = ctx.request.body;

      strapi.log.info("🔥 Cashfree webhook payload:");
      console.log(JSON.stringify(payload, null, 2));

      const isSuccess =
        payload.type === "PAYMENT_SUCCESS" ||
        payload.data?.payment?.payment_status === "SUCCESS";

      if (!isSuccess) {
        return ctx.send({ received: true });
      }

      const orderData = payload.data.order;

      // 🔁 RETRY LOGIC (IMPORTANT FIX)
      let tempOrder = null;

      for (let i = 0; i < 5; i++) {
        tempOrder = await strapi.db.query("api::order.order").findOne({
          where: { cashfreeOrderId: orderData.order_id },
        });

        if (tempOrder) break;

        // wait 500ms before retry
        await new Promise(res => setTimeout(res, 500));
      }

      if (!tempOrder) {
        strapi.log.error("❌ Temp order not found after retries");
        return ctx.send({ received: true });
      }

      // 🔁 prevent duplicate
      if (tempOrder.paymentStatus === "paid") {
        return ctx.send({ received: true });
      }

      const cartItems = tempOrder.cartSnapshot;

      if (!Array.isArray(cartItems) || cartItems.length === 0) {
        strapi.log.error("❌ Empty cart");
        return ctx.send({ received: true });
      }

      // ✅ UPDATE ORDER
      const updatedOrder = await strapi.entityService.update(
        "api::order.order",
        tempOrder.id,
        {
          data: {
            orderNumber: `CF-${Date.now()}`,
            totalAmount: orderData.order_amount,
            currency: "INR",
            paymentMethod: "upi",
            paymentProvider: "cashfree",
            paymentStatus: "paid",
            status: "processing",
            deliveryStatus: "pending",
          },
        }
      );

      await assignKeysAndSendEmail(updatedOrder, cartItems, strapi);

      ctx.send({ received: true });

    } catch (err) {
      strapi.log.error("❌ Cashfree webhook error:", err);
      return ctx.send({ received: false });
    }
  },














  async razorpaySuccess(ctx) {
    try {
      const { orderId, paymentId, userId, email, cartItems = [], amount } = ctx.request.body;

      if (!userId || !email || !cartItems.length) {
        return ctx.badRequest("Missing required fields");
      }

      // Create order in Strapi (like Stripe webhook)
      const order = await strapi.entityService.create("api::order.order", {
        data: {
          orderNumber: `RZP-${Date.now()}`,
          totalAmount: amount,
          currency: "INR",
          paymentMethod: "upi",
          paymentProvider: "razorpay",
          paymentStatus: "paid",
          razorpayOrderId: orderId,
          razorpayPaymentId: paymentId,
          deliveryEmail: email,
          user: userId,
          cartSnapshot: cartItems,
          status: "processing",
          deliveryStatus: "pending",
        },
      });

      // 🕹️ assign keys & send email (reuse same logic from webhook)
      await strapi.controller("api::order.order").assignKeysAndSendEmail(order, cartItems);

      ctx.send({ success: true, orderId: order.id });
    } catch (err) {
      strapi.log.error("❌ Razorpay order save failed:", err);
      return ctx.internalServerError("Razorpay order creation failed");
    }
  },

}));


