'use strict';

const template = require('./template.marko');

function notFound(req, res, next) {
  const err = Object.assign(new Error('Not Found'), {status: 404});
  next(err);
}

function handleError(err, req, res, _next) {
  const status = (err.status || 500);
  template.render({status}, res);

  console.error(`${req.method} ${req.path} - ${status} - ${err.message}`);
  console.error(err.stack);
}

module.exports = [notFound, handleError];
