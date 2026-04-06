'use strict';

/**
 * stock-alert service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::stock-alert.stock-alert');
