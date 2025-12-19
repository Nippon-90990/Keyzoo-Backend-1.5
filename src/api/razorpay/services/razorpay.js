'use strict';

/**
 * razorpay service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::razorpay.razorpay');
