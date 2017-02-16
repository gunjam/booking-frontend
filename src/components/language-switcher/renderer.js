'use strict';

const template = require('./template.marko');

exports.renderer = function (input, out) {
  const {originalUrl, language} = out.stream.req;
  const urlWithoutLang = originalUrl.indexOf('lng=') > -1 ? originalUrl.slice(0, -7) : originalUrl;
  const urlWithLangQry = urlWithoutLang.indexOf('?') > -1 ? urlWithoutLang + '&lng=' : '?lng=';
  template.render({language, urlWithLangQry}, out);
};
