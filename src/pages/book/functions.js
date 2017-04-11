'use strict';

const isEmail = require('validator/lib/isEmail');
const {getRoomWithBookings, deleteBooking, bookRoom} = require('../../lib/booking-api');
const sendMail = require('../../lib/send-mail');
const {validHours, validMinutes} = require('../../utils/consts');
const formatTime = require('../../utils/format-time');
const formatBookingDateTime = require('../../utils/format-booking-date-time');
const getDateAndErrors = require('../../lib/get-date-and-errors');
const isNotAny = require('../../utils/is-not-any');
const template = require('./template.marko');

function get(req, res, next) {
  const {roomId} = req.params;
  const {date, errors} = getDateAndErrors(req);
  const values = {dateDay: date.getDate(), dateMonth: date.getMonth() + 1, dateYear: date.getFullYear()};

  getRoomWithBookings(roomId, date)
    .then(response => template.render({room: response.body, date, errors, values}, res))
    .catch(next);
}

function post(req, res, next) {
  const {roomId} = req.params;
  const {date, errors} = getDateAndErrors(req);
  const {description = '', name = '', fromHours = '', fromMinutes = '',
    untilHours = '', untilMinutes = '', email = '', unbook = false} = req.body;
  const dateDay = date.getDate();
  const dateMonth = date.getMonth() + 1;
  const dateYear = date.getFullYear();
  const values = {
    description, name, email, fromHours, fromMinutes, untilHours, untilMinutes,
    dateDay, dateMonth, dateYear
  };

  if (unbook) {
    const {bookingId} = req.body;
    const gaPage = req.originalUrl + '/booking-canceled';
    const unbooked = true;

    if (!bookingId || Object.keys(errors).length > 0) {
      const err = new Error('unbook a book failure');
      return next(err);
    }

    return deleteBooking(bookingId)
      .then(() => getRoomWithBookings(roomId, date))
      .then(r => template.render({room: r.body, date, values, unbooked, gaPage}, res))
      .catch(next);
  }

  if (description === '') {
    errors.description = req.t('book:bookForm.description.errors.presence');
  }

  if (name === '') {
    errors.name = req.t('book:bookForm.name.errors.presence');
  }

  if (email === '') {
    errors.email = req.t('book:bookForm.email.errors.presence');
  } else if (!isEmail(email)) {
    errors.email = req.t('book:bookForm.email.errors.format');
  }

  if (isNotAny(fromHours, validHours)) {
    errors.from = req.t('book:bookForm.from.errors.hours');
  } else if (isNotAny(fromMinutes, validMinutes)) {
    errors.from = req.t('book:bookForm.from.errors.mintues');
  }

  if (isNotAny(untilHours, validHours)) {
    errors.until = req.t('book:bookForm.until.errors.hours');
  } else if (isNotAny(untilMinutes, validMinutes)) {
    errors.until = req.t('book:bookForm.until.errors.mintues');
  }

  if (fromHours > untilHours) {
    errors.from = req.t('book:bookForm.from.errors.backwards');
    errors.until = req.t('book:bookForm.until.errors.backwards');
  } else if (fromHours === untilHours && fromMinutes === untilMinutes) {
    errors.from = req.t('book:bookForm.from.errors.same');
    errors.until = req.t('book:bookForm.until.errors.same');
  }

  if (Object.keys(errors).length > 0) {
    getRoomWithBookings(roomId, date)
      .then(response => template.render({room: response.body, date, errors, values}, res))
      .catch(next);
  } else {
    const start = formatBookingDateTime(date, fromHours, fromMinutes);
    const end = formatBookingDateTime(date, untilHours, untilMinutes);

    bookRoom({start, end, description, name, roomId})
      .then(response => Promise.all([response, getRoomWithBookings(roomId, date)]))
      .then(([bookingResponse, roomResponse]) => {
        const booking = bookingResponse.body;
        const bookingId = booking.id;
        const room = roomResponse.body;
        const gaPage = req.originalUrl + '/room-booked';

        template.render({
          room, date, values: {dateDay, dateMonth, dateYear}, bookingId, gaPage
        }, res);

        const roomName = room.name;
        const start = new Date(booking.start);
        const end = new Date(booking.end);
        const bookingDate = req.t('date:dayMonth', {day: start.getDate(), month: start.getMonth()});
        const time = `${formatTime(start)} - ${formatTime(end)}`;
        const url = `${req.protocol}://${req.get('host')}/cancel/${bookingId}`;

        sendMail({
          to: email,
          subject: req.t('email:subject', {roomName, bookingDate, time}),
          text: req.t('email:body', {name, description, roomName, bookingDate, time, url})
        })
        .catch(err => console.error(err));
      })
      .catch(err => {
        if (err.response && (err.response.body.message || '').indexOf('doubleBooking')) {
          const double = req.t('book:bookForm.from.errors.double');
          const errors = {from: double, until: double};

          getRoomWithBookings(roomId, date)
            .then(response => template.render({room: response.body, date, errors, values}, res))
            .catch(next);
        } else {
          next(err);
        }
      });
  }
}

module.exports = {get, post};
