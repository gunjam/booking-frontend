'use strict';

const {setHours, setMinutes} = require('date-fns');

module.exports = function (date, hours, minutes) {
  const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const withHours = setHours(dateWithoutTime, parseInt(hours, 10));
  const withHoursAndMinutes = setMinutes(withHours, parseInt(minutes, 10));
  return withHoursAndMinutes.toISOString();
};
