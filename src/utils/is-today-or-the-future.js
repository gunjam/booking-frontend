'use strict';

const differenceInDays = require('date-fns/difference_in_days');

module.exports = function (date) {
  return differenceInDays(date, new Date()) >= 0;
};
