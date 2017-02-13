'use strict';

const template = require('./template.marko');

function get(req, res) {
  template.render({}, res);
}

function post(req, res) {
  template.render({}, res);
}

module.exports = {get, post};
