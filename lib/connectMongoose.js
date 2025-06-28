import mongoose from 'mongoose';
import dotenv from 'dotenv';

//Needed for private connection
dotenv.config();

export default async function connectMongoose() {
  const password = process.env.MONGODB_PASSWORD;
  const stringConnection = process.env.MONGODB_STRING_CONECTION;
  const uri = `mongodb://nodePop:${password}${stringConnection}`;
  await mongoose.connect(uri);
  return mongoose.connection;
}
