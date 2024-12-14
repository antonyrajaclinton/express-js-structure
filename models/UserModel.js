import mongoose from 'mongoose';

const userModelSchema = new mongoose.Schema({
    userName: { type: String },  //columns
    password: { type: String },
    mobileNo: { type: String },
    emailId: { type: String },
    role: { type: String }
}, {
    versionKey: false,
    timestamps: true
});




class userModelClass {

    constructor() {
        this.model = mongoose.model('user-collection', userModelSchema);   //user-collection ->collection name
    }

    async insert(objectDatas) {
        return await this.model.create(objectDatas);
    }
    async findById(objectId) {
        return await this.model.findOne({ _id: objectId });
    }
    async findByQueries(queries) {
        return await this.model.findOne(queries);
    }
    async findsByQueries(queries, sortBy = 'desc') {
        return await this.model.find(queries).sort({ _id: (sortBy == 'desc') ? -1 : 1 })
    }
    async updateRowById(objectId, objectDatas) {
        return await this.model.updateOne({ _id: objectId }, objectDatas);
    }
    async deleteRowById(objectId) {
        return await this.model.deleteOne({ _id: objectId });
    }
}


export default new userModelClass();