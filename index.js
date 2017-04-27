'use strict';
const koa = require('koa');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');

const app = new koa();


require('./model/products.js')
require('./model/router.js')
require('./model/mock.js')

app.use(bodyParser());

mongoose.connect("mongodb://localhost:27017/");


require('./routes')(app);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
