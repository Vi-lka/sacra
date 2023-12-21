'use strict';

/**
 * confession router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::confession.confession');
