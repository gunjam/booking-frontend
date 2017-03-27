'use strict';

module.exports = function (date) {
  return date.toTimeString().substr(0, 5);
};
