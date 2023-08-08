'use strict';

/**
 * architectural-style service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::architectural-style.architectural-style');
