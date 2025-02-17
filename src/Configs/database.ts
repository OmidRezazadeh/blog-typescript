const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI,{family:4});
        console.log(`M connected: ${connection.connection.host}`);
    } catch (error) {
        console.log('Failed to connect to MongoDB',error);
    }
}


