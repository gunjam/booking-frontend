'use strict';

module.exports = function (dateString) {
  const date = new Date(dateString);
  return new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
};
