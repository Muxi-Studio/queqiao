'use strict';

const product = require("koa-router")();
const controller = require('./controller.js');
const multer = require('koa-multer');

product.post('/', controller.insertOne);
product.get('/',controller.findAll);

module.exports = product;

