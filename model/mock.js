const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mockSchema = mongoose.Schema({
    mock:{
        type:Object
    }
});

module.exports = mongoose.model('Mock',mockSchema);