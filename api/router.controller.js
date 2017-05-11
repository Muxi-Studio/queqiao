const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Router = mongoose.model('Router');
var Mock = require('mockjs');

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
	// var frm = fragments[2].slice(-1)
	// if(frm === '/') {
	// 	fragments[2] = fragments[2].slice(0,-1)
	// }
	var search = "/" + fragments[2]
	var result = await Router.findOne({url:search,productName:fragments[1]},function(err, product){},{});
	var mock_data = Mock.mock(result.mock)
	ctx.body = mock_data
	next()
}

exports.findRouteWithQuery = async(ctx,next) =>{
	// get route
	var fragments = ctx.originalUrl.match(/^\/api\/([a-z]+)\/([a-z0-9\/]+)\?(.*)$/)
	var search = "/" + fragments[2]
	var result = await Router.findOne({url:search,productName:fragments[1]},function(err, product){},{});
	
	// get data
	var mock_data = Mock.mock(result.mock)

	// get query
	var query = fragments[3]
	var query_num

	var arr = query.split("&")

	var query_obj = new Object()
	var meta_query_obj = new Object()
	arr.forEach((e)=>{
		let temp = e.split('=')
		if(query_num = Number(temp[1])){
			temp[1] = query_num
		}
		if(result.meta){
			if(Object.keys(result.meta).indexOf(temp[0]) == -1){
				query_obj[temp[0]] = temp[1]			
			}else{
				meta_query_obj[temp[0]] = temp[1]
			}
		}else{
			query_obj[temp[0]] = temp[1]
		}
	})
	var query_obj_keys = Object.keys(query_obj)

	// data map query
	if(Array.isArray(mock_data)){
		mock_data = mock_data.filter(queryFilter)
	}else{
		mock_data = queryFilter(mock_data)
	}

	// query filter
	function queryFilter(e){
		return query_obj_keys.every((key)=>{
			return e[key] == query_obj[key]
		})
	}

	ctx.body = mock_data
}

