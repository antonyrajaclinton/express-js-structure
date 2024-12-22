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
  
}


export default new productModelClass();