'use strict';

const template = require('./template.marko');

module.exports = (req, res) => {
  template.render({}, res);
};
