var Router = require("koa-router")();
var product = require('./api/products/index.js');

module.exports = function(app){
	Router.use('/products', product.routes());
	Router.use('/', async (ctx, next) => {ctx.body = "hello"})
	app.use(Router.routes());
}
