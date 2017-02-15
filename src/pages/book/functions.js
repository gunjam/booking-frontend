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
    errors.description = 'Need a reason';
  }
  if (name === '') {
    errors.name = 'Need a name';
  }
  if (isNotAny(fromHours, validHours)) {
    errors.fromHours = 'Not good hours';
  }
  if (isNotAny(fromMinutes, validMinutes)) {
    errors.fromMinutes = 'Not good Minutes';
  }
  if (isNotAny(untilHours, validHours)) {
    errors.fromHours = 'Not good hours';
  }
  if (isNotAny(untilMinutes, validMinutes)) {
    errors.fromMinutes = 'Not good Minutes';
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
      .then(response => res.redirect(`/confirmation/${response.body.id}`))
      .catch(next);
  }
}

module.exports = {get, post};
