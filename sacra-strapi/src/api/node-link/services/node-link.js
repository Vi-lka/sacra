'use strict';

/**
 * node-link service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::node-link.node-link');
