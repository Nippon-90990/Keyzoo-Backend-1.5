'use strict';

/**
 * my-order service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::my-order.my-order');
