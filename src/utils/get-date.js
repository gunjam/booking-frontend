'use strict';

function padZero(input) {
  const string = typeof input === 'string' ? input : String(input);
  return string.length === 1 ? '0' + string : string;
}

module.exports = function (year, month, day) {
  const parsed = Date.parse(year + '-' + padZero(month) + '-' + padZero(day) +
    'T00:00:00.000Z');

  if (isNaN(parsed)) {
    return NaN;
  }

  const date = new Date(parsed);
  return date.getMonth() + 1 === parseInt(month, 10) ? date : NaN;
};
