'use strict';

const {getRooms} = require('../../lib/booking-api');
const template = require('./template.marko');

function get(req, res) {
  const roomList = getRooms();
  template.render({roomList}, res);
}

function post(req, res) {
  template.render({}, res);
}

module.exports = {get, post};
