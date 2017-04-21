'use strict';

const router = require("koa-router")();
const controller = require('./controller.js');
const multer = require('koa-multer');

router.post('/', controller.insertOne);
router.get('/',controller.findAll);

module.exports = router;

