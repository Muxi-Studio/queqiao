const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = mongoose.Schema({
    kind: {
 		type:String
    }
});

module.exports = mongoose.model('Product',productSchema);
