'use strict';

/**
 * architect service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::architect.architect');
