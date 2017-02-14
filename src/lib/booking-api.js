'use strict';

const got = require('got');

const apiUrl = (process.env.API_URL || 'http://localhost:3000') + '/api';

function getRooms() {
  return got(`${apiUrl}/Rooms`, {json: true})
    .then(response => response.body)
    .catch(err => console.error(err));
}

module.exports = {getRooms};
