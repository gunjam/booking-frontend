'use strict';

const express = require('express');
const {get, post} = require('./functions');

const router = new express.Router();

router.get('/', get);
router.post('/', post);

module.exports = router;
