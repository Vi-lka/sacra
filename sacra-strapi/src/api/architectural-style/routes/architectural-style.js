'use strict';

/**
 * architectural-style router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::architectural-style.architectural-style');
