const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Router = mongoose.model('Router');
var Mock = require('mockjs');
var reg = new RegExp(/\:([a-z]+)/g);

exports.insertOne = async (ctx,next) =>{
	const router = await Router.findOne({url:ctx.request.body.url})
	if(router) {
		// throw new Error('Router already exists')
		ctx.throw('Router already exists', 401);
		// next(createError(500, 'Router already exists'));
	}
	const product = await Product.findOne({productName:ctx.params.productName})
	ctx.request.body.productId = product.id
	ctx.request.body.productName = ctx.params.productName
	let urlStr = ctx.request.body.url

	if(reg.test(urlStr)){
		urlStr = urlStr.replace(reg,"([a-z0-9]+)")
	}

	ctx.request.body.regex = urlStr + '$'
	const result = await Router.create(ctx.request.body);
	ctx.body = result
	next()
}

// exports.findAll = async (ctx,next) =>{
// 	const result = await Router.find({},function(err, product){},{});
// 	if (!result) {
// 		throw new Error('Db findAll error');
// 	}
// 	ctx.body = result
// 	next()
// }

exports.findProduct = async (ctx,next) =>{
	console.log("Product")
	const result = await Router.find({productName:ctx.params.productName},function(err, product){},{})
	if(result.length == 0) {
		// throw new Error('Db findProduct error')
		ctx.throw(`${ctx.params.productName} does not exist in Product list`, 404);
	}
	ctx.body = result
	next()
}

exports.findRoute = async (ctx, next) => {
	var fragments = ctx.originalUrl.match(/^\/api\/([a-z]+)\/([a-z0-9\/]+)$/)
	
	var checkRoute = (result,search)=>{
		let matchRoute = (e)=>{
			let regex = new RegExp(e.regex)
			return regex.test(search)
		}

		if(result.length == 0){
			ctx.throw('No Product matched', 404);
		}
		let route = result.find(matchRoute)
		if(!route){
			ctx.throw('No Router matched', 404);
		}else if(!route.mock){
			ctx.throw('No mock data', 404);
		}
		return route
	}

	if(fragments){	
		var search = "/" + fragments[2]	
		var result = await Router.find({productName:fragments[1]},function(err, product){},{});

		let foundRoute = checkRoute(result,search)

		var mock_data = Mock.mock(foundRoute.mock)
		ctx.body = mock_data
	}else if(fragments = ctx.originalUrl.match(/^\/api\/([a-z]+)\/([a-z0-9\/]+)\?(.*)$/)){
		var search = "/" + fragments[2]
		var result = await Router.find({productName:fragments[1]},function(err, product){},{});

		let foundRoute = checkRoute(result,search)

		var mock_data = Mock.mock(foundRoute.mock)

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
			if(foundRoute.meta){
				if(Object.keys(foundRoute.meta).indexOf(temp[0]) != -1){
					meta_query_obj[temp[0]] = temp[1]								
				}else{
					query_obj[temp[0]] = temp[1]
				}
			}else{
				query_obj[temp[0]] = temp[1]
			}
		})


		var query_obj_keys = Object.keys(query_obj)
		var meta_query_obj_keys = Object.keys(meta_query_obj)


		// query filter
		var queryFilter = (e)=>{
			return query_obj_keys.every((key)=>{
				return e[key] == query_obj[key]
			})
		}

		// data map query
		if(Array.isArray(mock_data)){
			mock_data = mock_data.filter(queryFilter)
			if(meta_query_obj_keys.indexOf('count')!=-1){
				var count = meta_query_obj['count']
				if(count <= mock_data.length){
					mock_data = mock_data.slice(0,count)
				}
			}
		}else if(!queryFilter(mock_data)){
			mock_data = null;
		}




		if(!mock_data || mock_data.length == 0){
			ctx.throw('No mock data matched', 404);
		}

		ctx.body = mock_data
	}
	next()
}


