'use strict';

/**
 * confession service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::confession.confession');
