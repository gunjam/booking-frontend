'use strict';

const express = require('express');
const {get} = require('./functions');

const router = new express.Router();

router.get('/:bookingId', get);

module.exports = router;
