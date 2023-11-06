import mongoose from "mongoose";

var mongoURI = 'mongodb://127.0.0.1:27017/rappdb';
var mongoDB = mongoose.createConnection(mongoURI);

export const connectDB = async() => {
    try{
        await mongoose.connect(mongoURI);
        console.log('>>> DB connected.')
    }catch(error){
        console.log(error);
    }
};