'use strict';

/**
 * game-key service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::game-key.game-key');
