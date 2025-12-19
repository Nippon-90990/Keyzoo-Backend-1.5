'use strict';

/**
 * play-station service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::play-station.play-station');
