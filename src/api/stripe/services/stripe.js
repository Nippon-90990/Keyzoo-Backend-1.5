'use strict';

/**
 * stripe service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::stripe.stripe');
