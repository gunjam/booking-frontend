'use strict';

const {getRooms} = require('../../lib/booking-api');
const template = require('./template.marko');

function get(req, res) {
  const roomList = getRooms();
  template.render({roomList}, res);
}

function post(req, res) {
  const {room} = req.body;

  if (room === undefined) {
    const roomList = getRooms();
    const errors = {room: req.t('choose:form.room.errors.presence')};
    template.render({roomList, errors}, res);
  } else {
    res.redirect(`/book/${room}`);
  }
}

module.exports = {get, post};
