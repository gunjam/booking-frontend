'use strict';

module.exports = function (...inputs) {
  return inputs.every(input => typeof input === 'string' && input.length > 0);
};
