const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let routerSchema = mongoose.Schema({
	productId:{
		type:String
	},
    productName:{
        type:String
    },
    url: {
        type:String
    },
    description: {
        type:String
    },
    method:{
        type:String
    },
    mock:{
        type:Object
    }
});

module.exports = mongoose.model('Router',routerSchema);
