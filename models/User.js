import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

//Define users schema
const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

//Hashing password
userSchema.statics.hashPassword = (clearPassword) => {
  return bcrypt.hash(clearPassword, 10);
};

const User = mongoose.model("User", userSchema);

export default User;
