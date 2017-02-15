'use strict';

module.exports = function (...inputs) {
  return inputs.every(input => typeof input === 'undefined');
};
