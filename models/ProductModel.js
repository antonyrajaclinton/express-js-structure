import mongoose from 'mongoose';

const productModelSchema = new mongoose.Schema({
    productName: { type: String },  //columns
    productPrize: { type: String },
    productFileName: { type: String },
}, {
    versionKey: false,
    timestamps: true
});




class productModelClass {

    constructor() {
        this.model = mongoose.model('product-collection', productModelSchema);
    }

    async insert(objectDatas) {
        return await this.model.create(objectDatas);
    }
    async update(objectId, objectDatas) {
        return await this.model.updateOne({ '_id': objectId }, objectDatas);
    }
    async getProducts() {
        return await this.model.find();
    }
    async getProductById(sakthi) {
        return await this.model.findOne({ '_id': sakthi });
    }

}


export default new productModelClass();