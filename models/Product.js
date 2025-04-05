import mongoose, { Schema } from "mongoose";

//Define products schema
const productSchema = new Schema({
  name: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  price: Number,
  image: String,
  tags: [String],
});

const Product = mongoose.model("Product", productSchema);

export default Product;
