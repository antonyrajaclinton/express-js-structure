import mongoose from "mongoose";




function mongooseConnect() {

    try {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => console.log('MongoDB Connected!'));
    } catch (error) {
        console.log(error);

    }

}

export { mongooseConnect }