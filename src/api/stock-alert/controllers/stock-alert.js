const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::stock-alert.stock-alert', ({ strapi }) => ({

    async create(ctx) {
        const user = ctx.state.user;

        if (!user) {
            return ctx.unauthorized("Login required");
        }

        const { product } = ctx.request.body.data;

        if (!product) {
            return ctx.badRequest("Product required");
        }

        const existing = await strapi.entityService.findMany(
            "api::stock-alert.stock-alert",
            {
                filters: {
                    product: { id: product },
                    user: { id: user.id },
                },
            }
        );

        if (existing.length > 0) {
            return ctx.badRequest("Already subscribed");
        }

        const entry = await strapi.entityService.create(
            "api::stock-alert.stock-alert",
            {
                data: {
                    product: {
                        connect: [product],
                    },
                    user: {
                        connect: [user.id],
                    },
                },
            }
        );

        return entry;
    },

}));