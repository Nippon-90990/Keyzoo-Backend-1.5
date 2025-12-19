
// config/middlewares.js
module.exports = [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      includeUnparsed: true, // keep Symbol.for('unparsedBody')
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

