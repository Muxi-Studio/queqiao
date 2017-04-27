var Router = require("koa-router")();
var product = require('./api/products/index.js');
var routers = require('./api/router/index.js');

module.exports = function(app){
	Router.get('/', async (ctx, next) => {ctx.body = "hello"});
	Router.use('/products', product.routes());
	Router.use(routers.routes())
	app.use(Router.routes());
}
