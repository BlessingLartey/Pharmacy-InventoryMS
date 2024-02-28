import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const mongoUri = process.env.MONGO_URI;

const connectDb = async (req, res) => {
    try {
        const connection = await mongoose.connect(mongoUri);
        
        if(connection) {
            console.log('MongoDB  connected successfully')
        }
        return connection;
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw error

        
    }
}

export default connectDb;