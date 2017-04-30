const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Router = mongoose.model('Router');

exports.insertOne = async (ctx,next) =>{
	const router = await Router.findOne({url:ctx.request.body.url})
	if(router) {
		throw new Error('Router already exists')
	}
	const product = await Product.findOne({kind:ctx.params.product})
	ctx.request.body.productId = product.id
	ctx.request.body.productName = ctx.params.product
	const result = await Router.create(ctx.request.body);
	ctx.body = result
	next()
}

exports.findAll = async (ctx,next) =>{
	const result = await Router.find({},function(err, product){},{});
	if (!result) {
		throw new Error('Db findAll error');
	}
	ctx.body = result
	next()
}

exports.findProduct = async (ctx,next) =>{
	console.log("Product")
	const result = await Router.find({productName:ctx.params.product},function(err, product){},{})
	if(!result) {
		throw new Error('Db findProduct error')
	}
	ctx.body = result
	next()
}

exports.findRoute = async (ctx, next) => {		
	var fragments = ctx.originalUrl.match(/^\/api\/([a-z]+)\/([a-z0-9\/]+)$/)
	var search = "/" + fragments[2]
	var result = await Router.find({url:search,productName:fragments[1]},function(err, product){},{});
	ctx.body = result
	next()
}