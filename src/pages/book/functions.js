'use strict';

const {getRoomWithBookings, bookRoom} = require('../../lib/booking-api');
const {validHours, validMinutes} = require('../../utils/consts');
const formatDate = require('../../utils/format-date');
const getDateAndErrors = require('../../lib/get-date-and-errors');
const isNotAny = require('../../utils/is-not-any');
const template = require('./template.marko');

function get(req, res, next) {
  const {roomId} = req.params;
  const {date, errors} = getDateAndErrors(req);

  getRoomWithBookings(roomId, date)
    .then(response => template.render({room: response.body, errors}, res))
    .catch(next);
}

function post(req, res, next) {
  const {roomId} = req.params;
  const {date, errors} = getDateAndErrors(req);
  const {description = '', name = '', fromHours = '', fromMinutes = '',
    untilHours = '', untilMinutes = ''} = req.body;

  if (description === '') {
    errors.description = req.t('book:bookForm.description.errors.presence');
  }
  if (name === '') {
    errors.name = 'Need a name';
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
      .then(response => template.render({room: response.body, errors}, res))
      .catch(next);
  } else {
    const dateString = formatDate(date);
    const start = `${dateString}T${fromHours}:${fromMinutes}:00.000Z`;
    const end = `${dateString}T${untilHours}:${untilMinutes}:00.000Z`;

    bookRoom({start, end, description, name, roomId})
      .then(response => res.redirect(`/confirmation/${response.body.gid}`))
      .catch(next);
  }
}

module.exports = {get, post};
