'use strict';

/**
 * my-order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::my-order.my-order', ({ strapi }) => ({

    async myOrders(ctx) {
        const user = ctx.state.user;

        if (!user) {
            return ctx.unauthorized("Login required");
        }

        const orders = await strapi.entityService.findMany(
            "api::order.order",
            {
                filters: {
                    user: user.id,
                },
                populate: "*",
                sort: { createdAt: "desc" },
            }
        );

        return { data: orders };
    }
    
}));