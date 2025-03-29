import mongoose from "mongoose";
import dotenv from "dotenv";

//Needed for private connection
dotenv.config();

export default async function connectMongoose() {
  const password = process.env.MONGODB_PASSWORD;
  const uri = `mongodb://admin:${password}@localhost:27017/Nodepop?authSource=admin`;
  await mongoose.connect(uri);
  return mongoose.connection;
}
