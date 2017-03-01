'use strict';

const {getLocationsAndRooms} = require('../../lib/booking-api');
const template = require('./template.marko');

function get(req, res, next) {
  getLocationsAndRooms()
    .then(response => template.render({locations: response.body}, res))
    .catch(next);
}

module.exports = {get};
