import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

//Define users schema
const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

//Hashing password, model method
userSchema.statics.hashPassword = (clearPassword) => {
  return bcrypt.hash(clearPassword, 10);
};

//Instances method
userSchema.methods.comparePassword = function (clearPassword) {
  return bcrypt.compare(clearPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
