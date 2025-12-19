// src/api/checkout/controllers/checkout.js
"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Razorpay = require("razorpay");
const crypto = require("crypto");

module.exports = {
  async create(ctx) {
    try {
      const { cartItems = [], email, userId } = ctx.request.body || {};

      // ❌ No guest checkout
      if (!userId) return ctx.badRequest("Login required to checkout");
      if (!cartItems.length) return ctx.badRequest("Cart is empty");
      if (!email) return ctx.badRequest("Email is required");

      // 🛒 Build Stripe line items with productId in metadata
      const line_items = cartItems.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
            images: item.image ? [item.image] : [],
            metadata: {
              productId: String(item.id), // 🔑 send Strapi productId
            },
          },
          unit_amount: Math.round(Number(item.price) * 100), // ₹ → paise
        },
        quantity: Number(item.quantity || 1),
      }));

      // ✅ Create checkout session
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"], // added UPI support
        line_items,
        customer_email: email,
        billing_address_collection: "required",
        phone_number_collection: { enabled: true },

        success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,

        // Attach order-level metadata
        metadata: {
          userId: String(userId),
          email,
          cart: JSON.stringify(
            cartItems.map((item) => ({
              id: item.id,
              title: item.title,
              region: item.region,
              quantity: item.quantity,
              price: item.price,
              image: item.image,  // include image too in CartItem (optional) if any error remove it.
            }))
          ),
        },
      });

      ctx.body = { url: session.url, id: session.id };
    } catch (err) {
      strapi.log.error("❌ Stripe Checkout Error:", err);
      return ctx.internalServerError("Unable to create checkout session");
    }
  },

  // ---------- RAZORPAY (new) ----------
  async createRazorpayOrder(ctx) {
    try {
      const { cartItems = [], email, userId, total } = ctx.request.body || {};

      if (!userId) return ctx.badRequest("Login required");
      if (!cartItems.length) return ctx.badRequest("Cart empty");
      if (!email) return ctx.badRequest("Email required");

      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const amountInPaise = Math.round(total * 100);

      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: `order_rcpt_${Date.now()}`,
        notes: {
          userId: String(userId),
          email,
          cart: JSON.stringify(cartItems),
        },
      });

      ctx.send({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.RAZORPAY_KEY_ID, // for frontend checkout.js
      });
    } catch (err) {
      strapi.log.error("❌ Razorpay order create failed:", err);
      return ctx.internalServerError("Razorpay order creation failed");
    }
  },

  async verifyRazorpayPayment(ctx) {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = ctx.request.body;

      console.log("🧾 Verification Data:", ctx.request.body);

      const body = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

      console.log("✅ Expected Signature:", expectedSignature);
      console.log("🧠 Received Signature:", razorpay_signature);

      if (expectedSignature !== razorpay_signature) {
        console.log("❌ Signature mismatch!");
        return ctx.badRequest("Invalid payment signature");
      }

      console.log("✅ Razorpay Payment Verified Successfully!");
      ctx.send({ verified: true });
    } catch (err) {
      strapi.log.error("❌ Razorpay verification failed:", err);
      return ctx.internalServerError("Razorpay verification failed");
    }
  },
};
