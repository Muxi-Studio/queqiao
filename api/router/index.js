'use strict';

const routers = require("koa-router")();
const controller = require('./controller.js');
const multer = require('koa-multer');

routers.post('/:product', controller.insertOne);
routers.get('/productAll',controller.findAll);
routers.get('/:product',controller.findProduct);

// routers.get('/:product/...',controller.findRoute)
// routers.put('/:product/...',controller.findRoute)
// routers.delete('/:product/...',controller.findRoute)

module.exports = routers;