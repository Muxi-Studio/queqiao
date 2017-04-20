const ObjectId = require('mongodb').ObjectID;

const Model = require('./index.js');

class Products extends Model {
	constructor(db, collectionName) {
		super(db, collectionName);
		this.name = collectionName;
		this.db = db;
	}
	async findOneByName(name){
		let query = {
			product : name
		}
		const result = await this.db.collection(this.name).findOne(query)
		if (!result) {
			throw new Error('Db findOneByName error');
		}
		return result
	}
}

module.exports = Products;