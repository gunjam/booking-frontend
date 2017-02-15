'use strict';

module.exports = function (input, validValues) {
  return !validValues.some(value => input === value);
};
