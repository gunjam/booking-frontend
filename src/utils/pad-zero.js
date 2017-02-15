'use strict';

module.exports = function (input) {
  const string = typeof input === 'string' ? input : String(input);
  return string.length === 1 ? '0' + string : string;
};
