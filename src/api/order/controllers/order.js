// Updated code after new schema changes CartItems to Order Collection
// src/api/order/controllers/order.js
"use strict";

// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

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

      // 1. Create Order
      const order = await strapi.entityService.create("api::order.order", {
        data: {
          orderNumber: `ORD-${Date.now()}`,
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

      // 2. Assign Game Keys
      let assignedKeys = [];
      for (const item of cartItems) {
        const product = await strapi.db.query("api::product.product").findOne({
          where: { title: item.title },
          populate: { gameKeys: true },
        });

        if (!product) {
          strapi.log.warn(`⚠️ Product not found: ${item.title}`);
          continue;
        }

        const availableKeys = product.gameKeys.filter(k => k.isAvailable);
        const keysToAssign = availableKeys.slice(0, item.quantity);

        if (keysToAssign.length < item.quantity) {
          strapi.log.warn(
            `⚠️ Not enough keys for ${item.title}. Needed: ${item.quantity}, got: ${keysToAssign.length}`
          );
        }

        for (const key of keysToAssign) {
          await strapi.db.query("api::game-key.game-key").update({
            where: { id: key.id },
            data: { isAvailable: false, assignedAt: new Date() },
          });

          assignedKeys.push({ product: product.title, key: key.code });
        }
      }

      // 3. Update Order Delivery Info
      await strapi.db.query("api::order.order").update({
        where: { id: order.id },
        data: {
          deliveryStatus: assignedKeys.length > 0 ? "delivered" : "pending",
          gameKeysAssigned: assignedKeys.length > 0,
          deliveredAt: assignedKeys.length > 0 ? new Date() : null,
          assignedKeys, // ✅ save assigned keys JSON
        },
      });

      // 4. Send Email with Keys
      // if (order.deliveryEmail && assignedKeys.length > 0) {
      //   const keysHtml = assignedKeys
      //     .map(k => `<p><strong>${k.product}</strong>: ${k.key}</p>`)
      //     .join("");

      //   await resend.emails.send({
      //     from: "onboarding@resend.dev",
      //     to: order.deliveryEmail,
      //     subject: `Your Game Keys - Order #${order.orderNumber}`,
      //     html: `
      //       <h2>Thank you for your purchase!</h2>
      //       <p>Here are your keys:</p>
      //       ${keysHtml}
      //     `,
      //   });

      //   strapi.log.info(`📩 Keys sent to ${order.deliveryEmail}`);
      // } else {
      //   strapi.log.warn("⚠️ No keys assigned, email skipped.");
      // }

      // 4. Send Email with Keys
      if (order.deliveryEmail && assignedKeys.length > 0) {
        const orderDate = new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });

        const itemsHtml = cartItems
          .map(
            (item) => {
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
            Keys:<br/> ${keysForProduct}
          </td>
        </tr>`;
            }
          )
          .join("");

        const htmlTemplate = `
  <html>
    <body style="font-family: Arial, sans-serif; background:#ffffff; margin:0; padding:0;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; margin:0 auto;">
              
              <!-- Header -->
              <tr>
                <td style="padding:20px; text-align:left;">
                  <img src="https://yourcdn.com/logo.png" alt="Logo" height="30"/>
                </td>
                <td style="padding:20px; text-align:right; font-size:12px; color:#555;">
                  ${orderDate}
                </td>
              </tr>

              <!-- Hero -->
              <tr>
                <td colspan="2" style="padding:20px; text-align:center;">
                  <h2 style="margin:0; font-size:22px; color:#000;">Here are your keys 🎉</h2>
                  <p style="font-size:14px; color:#555; line-height:20px;">
                    Thank you for your purchase. Below are your game keys.
                  </p>
                  <a href="${process.env.FRONTEND_URL}/orders/${order.id}"
                     style="display:inline-block; padding:12px 24px; background:#000; color:#fff; text-decoration:none; font-weight:bold; border-radius:4px;">
                    View Order
                  </a>
                </td>
              </tr>

              <!-- Order Info -->
              <tr>
                <td colspan="2" style="padding:20px; border-top:1px solid #eee; border-bottom:1px solid #eee;">
                  <table width="100%">
                    <tr>
                      <td style="font-size:14px; color:#555;">
                        <strong style="color:#000;">Order number</strong><br/> ${order.orderNumber}
                      </td>
                      <td style="font-size:14px; color:#555; text-align:right;">
                        <strong style="color:#000;">Order date</strong><br/> ${orderDate}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Items -->
              ${itemsHtml}

              <!-- Footer -->
              <tr>
                <td colspan="2" style="background:#000; color:#fff; padding:20px; font-size:12px; text-align:center;">
                  <p style="margin:0;">📩 For support, contact us at 
                    <a href="mailto:support@yourbrand.com" style="color:#fff;">support@yourbrand.com</a>
                  </p>
                  <p style="margin:10px 0 0;">&copy; 2025 YourBrand. All rights reserved.</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;

        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: order.deliveryEmail,
          subject: `Your Game Keys - Order #${order.orderNumber}`,
          html: htmlTemplate,
        });

        strapi.log.info(`📩 Fancy email sent to ${order.deliveryEmail}`);
      } else {
        strapi.log.warn("⚠️ No keys assigned, email skipped.");
      }

    } catch (err) {
      strapi.log.error("❌ Webhook order handling failed:", err);
      return ctx.internalServerError("Order handling failed");
    }

    ctx.send({ received: true });
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


