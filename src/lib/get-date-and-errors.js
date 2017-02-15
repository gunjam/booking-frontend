'use strict';

const getDate = require('../utils/get-date');
const allAreNonEmptyStrings = require('../utils/all-are-non-empty-strings');
const allAreUndefined = require('../utils/all-are-undefined');

module.exports = function (req) {
  const {dateDay, dateMonth, dateYear} = req.query;

  if (allAreUndefined(dateDay, dateMonth, dateYear)) {
    return {date: new Date(), errors: {}};
  } else if (allAreNonEmptyStrings(dateDay, dateMonth, dateYear)) {
    const queryDate = getDate(dateYear, dateMonth, dateDay);

    if (isNaN(queryDate)) {
      const errors = {date: req.t('book:dateForm.date.errors.format')};
      return {date: new Date(), errors};
    }
    return {date: queryDate, errors: {}};
  }

  const errors = {date: req.t('book:dateForm.date.errors.presence')};
  return {date: new Date(), errors};
};
