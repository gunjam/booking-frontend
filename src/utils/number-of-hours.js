'use strict';

module.exports = function (date) {
  return date.getHours() + (date.getMinutes() / 60);
};
