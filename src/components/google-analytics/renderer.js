'use strict';

const template = require('./template.marko');

module.exports = function (input, context) {
  if (input.trackingId && input.domain) {
    template.render(input, context);
  }
};
