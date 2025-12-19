module.exports = {
    routes: [
        {
            method: "POST",
            path: "/checkout/session",
            handler: "checkout.create",
            config: { auth: false }, // public for now
        },
        {
            method: "POST",
            path: "/checkout/razorpay/create",
            handler: "checkout.createRazorpayOrder",
            config: { auth: false },
        },
        {
            method: "POST",
            path: "/checkout/razorpay/verify",
            handler: "checkout.verifyRazorpayPayment",
            config: { auth: false },
        },
    ],
};
