'use strict';

const got = require('got');
const addDays = require('date-fns/add_days');
const formatDate = require('../utils/format-date');

const apiUrl = (process.env.API_URL || 'http://localhost:3000') + '/api';

function getBooking(id) {
  return got(`${apiUrl}/Bookings/${id}`, {json: true, query: {'filter[include]': 'room'}});
}

function getLocationsAndRooms() {
  return got(`${apiUrl}/Locations`, {
    json: true,
    query: {
      filter: JSON.stringify({
        include: {
          relation: 'rooms',
          scope: {
            include: 'features',
            order: 'name ASC'
          }
        }
      })
    }
  });
}

function bookRoom(body) {
  return got.post(`${apiUrl}/Bookings`, {json: true, body});
}

function getRoomWithBookings(id, date) {
  const nextDay = addDays(date, 1);

  return got(`${apiUrl}/Rooms/${id}`, {
    json: true,
    query: {
      filter: JSON.stringify({
        include: [
          'location',
          'features',
          {
            relation: 'bookings',
            scope: {
              where: {
                and: [
                  {start: {gt: formatDate(date)}},
                  {start: {lt: formatDate(nextDay)}}
                ]
              }
            }
          }
        ]
      })
    }
  });
}

module.exports = {getBooking, getLocationsAndRooms, getRoomWithBookings, bookRoom};
