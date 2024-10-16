
import mongoose from  'mongoose';
import config from '../config/index.js';

const connectToDatabase = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${config.dbURL}`);
        console.log(`MongoDB Connected! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default  connectToDatabase;
