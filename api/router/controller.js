const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Router = mongoose.model('Router');

exports.insertOne = async (ctx,next) =>{
	const product = await Product.findOne({kind:ctx.params.product})
	ctx.request.body.productId = product.id
	ctx.request.body.productName = ctx.params.product
	const result = await Router.create(ctx.request.body);
	ctx.body = result
	return result
}

exports.findAll = async (ctx,next) =>{
	const result = await Router.find({},function(err, product){},{});
	if (!result) {
		throw new Error('Db findAll error');
	}
	ctx.body = result
	return ctx.body;
}

exports.findProduct = async (ctx,next) =>{
	const result = await Router.find({productName:ctx.params.product},function(err, product){},{})
	if(!result) {
		throw new Error('Db findProduct error')
	}
	ctx.body = result
	return ctx.body
}
