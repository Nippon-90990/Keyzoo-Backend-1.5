'use strict';

/**
 * gift-card controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::gift-card.gift-card', ({ strapi }) => ({

    async getFilterOptions(ctx) {
        try {
            const knex = strapi.db.connection;
            const table = strapi.getModel("api::gift-card.gift-card").collectionName;

            const platforms = await knex(table).distinct("platform as value");
            const regions = await knex(table).distinct("card_region as value");
            const productTypes = await knex(table).distinct("item_type as value");
            const worksOn = await knex(table).distinct("work_platform as value"); // ✅ FIXED

            ctx.body = {
                platforms: platforms.map(p => p.value).filter(Boolean),
                regions: regions.map(r => r.value).filter(Boolean),
                productTypes: productTypes.map(t => t.value).filter(Boolean),
                worksOn: worksOn.map(w => w.value).filter(Boolean),
            };

        } catch (err) {
            console.error("FILTER ERROR:", err); // 🔥 important
            ctx.throw(500, "Filter fetch failed");
        }
    },
    async getCounts(ctx) {
        const knex = strapi.db.connection;
        const table = strapi.getModel("api::gift-card.gift-card").collectionName;

        const {
            platform = [],
            region = [],
            item_type = [],
            workPlatform = [],
            minPrice,
            maxPrice,
            Available
        } = ctx.query;

        const applyFilters = (qb, ignore = null) => {

            if (platform.length && ignore !== "platform") {
                qb.whereIn("platform", [].concat(platform));
            }

            if (region.length && ignore !== "region") {
                qb.whereIn("card_region", [].concat(region));
            }

            if (item_type.length && ignore !== "item_type") {
                qb.whereIn("item_type", [].concat(item_type));
            }

            // ✅ FIXED
            if (workPlatform.length && ignore !== "workPlatform") {
                qb.whereIn("work_platform", [].concat(workPlatform));
            }

            if (Available) {
                qb.where("Available", true);
            }

            if (minPrice) {
                qb.where(q => {
                    q.where("discountPrice", ">=", minPrice)
                        .orWhere("price", ">=", minPrice);
                });
            }

            if (maxPrice) {
                qb.where(q => {
                    q.where("discountPrice", "<=", maxPrice)
                        .orWhere("price", "<=", maxPrice);
                });
            }
        };

        // 🔥 PLATFORM
        const platformsRaw = await knex(table)
            .modify(qb => applyFilters(qb, "platform"))
            .select("platform")
            .count("* as count")
            .groupBy("platform");

        // 🔥 REGION
        const regionsRaw = await knex(table)
            .modify(qb => applyFilters(qb, "region"))
            .select("card_region")
            .count("* as count")
            .groupBy("card_region");

        // 🔥 PRODUCT TYPE
        const productTypesRaw = await knex(table)
            .modify(qb => applyFilters(qb, "item_type"))
            .select("item_type")
            .count("* as count")
            .groupBy("item_type");

        // 🔥 WORKS ON (FULL FIX)
        const worksOnRaw = await knex(table)
            .modify(qb => applyFilters(qb, "workPlatform"))
            .whereNotNull("work_platform") // ✅ avoid undefined
            .select("work_platform")
            .count("* as count")
            .groupBy("work_platform");

        const format = (arr, key) =>
            Object.fromEntries(arr.map(i => [i[key], Number(i.count)]));

        ctx.body = {
            platforms: format(platformsRaw, "platform"),
            regions: format(regionsRaw, "card_region"),
            productTypes: format(productTypesRaw, "item_type"),
            worksOn: format(worksOnRaw, "work_platform"), // ✅ FIXED
        };
    }

}));
