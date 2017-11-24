'use strict';

const template = require('./template.marko');

module.exports = (req, res) => {
  const lang = req.language;
  template.render({lang}, res);
};
