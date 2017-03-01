'use strict';

const express = require('express');
const {get} = require('./functions');

const router = new express.Router();

router.get('/', get);

module.exports = router;
