'use strict';

const {getLocationsAndRooms} = require('../../lib/booking-api');
const template = require('./template.marko');

function get(req, res, next) {
  getLocationsAndRooms()
    .then(response => template.render({locations: response.body}, res))
    .catch(next);
}

function post(req, res, next) {
  const {room} = req.body;

  if (room === undefined) {
    const errors = {room: req.t('choose:form.room.errors.presence')};

    getLocationsAndRooms()
      .then(response => {
        console.log(response.body);
        template.render({locations: response.body, errors}, res);
      })
      .catch(next);
  } else {
    res.redirect(`/book/${room}`);
  }
}

module.exports = {get, post};
