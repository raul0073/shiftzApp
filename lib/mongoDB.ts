import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) { throw new Error('No mongoDB URI found.') }



export default async function connectMongoDB() {
  const url = String(MONGODB_URI);

  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas', err);
  }
}

export const disconnectMongoDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB Atlas');
  } catch (err) {
    console.error('Error disconnecting from MongoDB Atlas', err);
  }
};