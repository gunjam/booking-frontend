'use strict';

const {getBooking} = require('../../lib/booking-api');
const template = require('./template.marko');

function get(req, res, next) {
  getBooking(req.params.id)
    .then(response => template.render({booking: response.body}, res))
    .catch(next);
}

module.exports = {get};
