'use strict';

/**
 * stripe controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::stripe.stripe');
