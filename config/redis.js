'use strict';

const url = require('url');

module.exports = {
  prefix: 'bsp-frontend',
  db: 0
};

if (process.env.REDIS_URL) {
  const redis = url.parse(process.env.REDIS_URL);
  module.exports.host = redis.hostname;
  module.exports.port = redis.port;
  module.exports.pass = redis.auth.split(':')[1];
} else {
  module.exports.host = 'localhost';
  module.exports.port = 6379;
}
