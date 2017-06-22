const mongoose = require('mongoose');
var Router = require("koa-router")();


const product_controller = require('./api/products.controller.js');
const router_controller = require('./api/router.controller.js');


module.exports = function(app){
	Router.get('/', async (ctx, next) => {ctx.body = "hello"});

	Router.post('/products', product_controller.insertOne);
	Router.get('/products',product_controller.findAll);

//	Router.get(/^\/api\/([a-z]+)\/([a-z0-9\/]+)\?(.*)$/, router_controller.findRouteWithQuery)
	Router.get(/^\/api\/([a-z]+)\/([a-z0-9\/]+)$/, router_controller.findRoute)
	Router.post(/^\/api\/([a-z]+)\/([a-z0-9\/]+)$/, router_controller.findRoute)

	Router.post('/product/:productName', router_controller.insertOne);
	// Router.get('/routers', router_controller.findAll);
	Router.get('/product/:productName', router_controller.findProduct);

	app.use(Router.routes());
}
