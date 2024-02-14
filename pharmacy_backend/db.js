import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const mongoUrl = process.env.MONGO_URL;

const connectDb = async (req, res) => {
    try {
        const connection = await mongoose.connect(mongoUrl);
        if(connection) {
            console.log('mongodb is connected successfully')
        }
    } catch (error) {
        console.log(error)
        
    }
}

export default connectDb;