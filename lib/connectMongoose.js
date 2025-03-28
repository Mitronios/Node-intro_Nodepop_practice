import mongoose from "mongoose";

export default async function connectMongoose() {
  await mongoose.connect("mongodb://localhost/Nodepop");
  return mongoose.connection;
}
