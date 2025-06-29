import mongoose from 'mongoose';
import dotenv from 'dotenv';

//Needed for private connection
dotenv.config();

export default async function connectMongoose() {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri);

  return mongoose.connection;
}
