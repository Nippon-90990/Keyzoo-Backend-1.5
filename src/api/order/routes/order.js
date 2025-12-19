// module.exports = {
//   routes: [
//     {
//       method: "POST",
//       path: "/orders/stripe-webhook",
//       handler: "order.webhook",
//       config: {
//         auth: false, // Webhooks must be public (Stripe can't auth)
//         middlewares: ["global::raw-body"], // important for Stripe signature
//       },
//     },
//   ],
// };

// src/api/order/routes/order.js
'use strict';

module.exports = {
  routes: [
    // other generated CRUD routes are fine…

    {
      method: 'POST',
      path: '/orders/stripe/webhook',
      handler: 'order.webhook',
      config: {
        auth: false,       // webhooks must be public
        policies: [],      // no policies
        middlewares: [],   // IMPORTANT: no custom middleware here
      },
    },
    {
      method: 'POST',
      path: '/orders/razorpay/success',
      handler: 'order.razorpaySuccess',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/orders',
      handler: 'order.find',
      config: {
        auth: { scope: ['api::order.order.find'] }, // ✅ correct format
      },
    },
    {
      method: 'GET',
      path: '/orders/:id',
      handler: 'order.findOne',
      config: {
        auth: { scope: ['api::order.order.findOne'] }, // ✅ correct format
      },
    },
  ],
};
