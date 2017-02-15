'use strict';

const {validHours, validMinutes} = require('../../utils/consts');
const template = require('./template.marko');

exports.renderer = function (input, out) {
  const hours = Array.isArray(input.hours) ? input.hours : validHours;
  const minutes = Array.isArray(input.minutes) ? input.minutes : validMinutes;

  template.render(Object.assign({}, input, {hours, minutes}), out);
};
