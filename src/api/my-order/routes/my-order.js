'use strict';

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/my-orders",
      handler: "my-order.myOrders", // ✅ correct
      config: {
        auth: {}, // requires login
      },
    },
  ],
};