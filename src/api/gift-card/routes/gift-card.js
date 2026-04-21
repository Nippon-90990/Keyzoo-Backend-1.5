// 'use strict';

// // const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = {
//     routes: [
//         {
//             method: 'GET',
//             path: '/gift-cards/filters',
//             handler: 'gift-card.getFilterOptions',
//             config: {
//                 auth: false,
//             },
//         },
//         {
//             method: 'GET',
//             path: '/gift-cards',
//             handler: 'gift-card.find',
//             config: {
//                 auth: { scope: ['api::gift-card.gift-card.find'] }, // ✅ correct format
//             },
//         },
//         {
//             method: 'GET',
//             path: '/gift-cards/:id',
//             handler: 'gift-card.findOne',
//             config: {
//                 auth: { scope: ['api::gift-card.gift-card.findOne'] }, // ✅ correct format
//             },
//         }
//     ],
// };


'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::gift-card.gift-card');