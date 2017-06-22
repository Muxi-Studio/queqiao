'use strict';
const koa = require('koa');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');

const app = new koa();


require('./model/products.js')
require('./model/router.js')
require('./model/mock.js')

app.use(bodyParser());

// Error Handling
app.use(async (ctx, next) => {
  	try {
    	await next();
  	} catch (err) {
	    ctx.status = err.status || 500;
	    ctx.body = err.message;
	    ctx.app.emit('error', err, ctx);
  	}
});

mongoose.connect("mongodb://localhost:27017/");


require('./routes')(app);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
