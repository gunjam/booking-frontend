'use strict';

module.exports = function (date) {
  return date.toISOString().substr(0, 10);
};
