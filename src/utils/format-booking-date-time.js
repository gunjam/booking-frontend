'use strict';

const {setHours, setMinutes} = require('date-fns');

module.exports = function (date, hours, minutes) {
  const withHours = setHours(date, parseInt(hours, 10));
  const withHoursAndMinutes = setMinutes(withHours, parseInt(minutes, 10));
  return withHoursAndMinutes.toISOString();
};
