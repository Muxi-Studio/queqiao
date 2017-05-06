const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.insertOne = async (ctx,next) =>{
	const result = await Product.create(ctx.request.body);
	ctx.body = result
	next()
}

exports.findAll = async (ctx,next) =>{
	const result = await Product.find({},function(err, product){},{});
	if (!result) {
		throw new Error('Db findOneByName error');
	}
	ctx.body = result
	next()
}

