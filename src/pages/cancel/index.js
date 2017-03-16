'use strict';

const express = require('express');
const {get, post} = require('./functions');

const router = new express.Router();

router.get('/:bookingId', get);
router.post('/:bookingId', post);

module.exports = router;
