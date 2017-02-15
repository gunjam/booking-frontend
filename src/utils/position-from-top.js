'use strict';

const numberOfHours = require('./number-of-hours');
const {validHours} = require('./consts');

module.exports = function (startDate) {
  return ((numberOfHours(startDate) - parseInt(validHours[0], 10)) / validHours.length) * 100;
};
