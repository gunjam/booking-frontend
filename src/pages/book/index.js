'use strict';

const express = require('express');
const {get, post} = require('./functions');

const router = new express.Router();

router.get('/:roomId', get);
router.post('/:roomId', post);

module.exports = router;
