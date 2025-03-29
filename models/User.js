import mongoose, { Schema } from "mongoose";

//Define users schema
const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

export default User;
