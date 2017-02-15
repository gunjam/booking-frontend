'use strict';

const numberOfHours = require('./number-of-hours');
const {validHours} = require('./consts');

module.exports = function (startDate, endDate) {
  return ((numberOfHours(endDate) - numberOfHours(startDate)) / validHours.length) * 100;
};
