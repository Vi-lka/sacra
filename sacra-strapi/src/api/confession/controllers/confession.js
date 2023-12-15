'use strict';

/**
 * confession controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::confession.confession');
