'use strict';

const {getBooking} = require('../../lib/booking-api');
const template = require('./template.marko');

function get(req, res, next) {
  const {bookingId} = req.params;

  getBooking(bookingId)
    .then(response => template.render(response.body, res))
    .catch(next);
}

module.exports = {get};
