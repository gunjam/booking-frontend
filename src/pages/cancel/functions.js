'use strict';

const {getBooking, deleteBooking} = require('../../lib/booking-api');
const template = require('./template.marko');

function get(req, res, next) {
  const {bookingId} = req.params;

  getBooking(bookingId)
    .then(response => template.render(response.body, res))
    .catch(err => {
      if (err.statusCode === 404) {
        return template.render({alreadyCancelled: true}, res);
      }
      next(err);
    });
}

function post(req, res, next) {
  const {bookingId} = req.params;

  deleteBooking(bookingId)
    .then(() => res.redirect('/cancelled'))
    .catch(next);
}

module.exports = {get, post};
