'use strict';

const template = require('./template.marko');

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  template.render({}, res);
};
