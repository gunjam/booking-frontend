'use strict';

const express = require('express');
const {get} = require('./functions');

const router = new express.Router();

router.get('/:id', get);

module.exports = router;
