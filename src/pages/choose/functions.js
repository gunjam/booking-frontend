'use strict';

const {getRooms} = require('../../lib/booking-api');
const template = require('./template.marko');

function get(req, res, next) {
  getRooms()
    .then(response => template.render({rooms: response.body}, res))
    .catch(next);
}

function post(req, res, next) {
  const {room} = req.body;

  if (room === undefined) {
    const errors = {room: req.t('choose:form.room.errors.presence')};

    getRooms()
      .then(response => template.render({rooms: response.body, errors}, res))
      .catch(next);
  } else {
    res.redirect(`/book/${room}`);
  }
}

module.exports = {get, post};
