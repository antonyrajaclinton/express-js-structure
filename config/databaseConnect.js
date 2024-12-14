import mongoose from "mongoose";




function mongooseConnect() {
    try {
        mongoose.connect(process.env.MONGODB_URI + '/' + process.env.MONGODB_DB_NAME)
            .then(() => console.log('Mongodb Connected!'));
    } catch (error) {
        console.log(error);
    }

}

export default mongooseConnect