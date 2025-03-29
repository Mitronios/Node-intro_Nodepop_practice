import mongoose, { Schema } from "mongoose";

//Define products schema
const productSchema = new Schema({
  name: String,
  owner: { ref: "User", type: mongoose.Schema.Types.ObjectId },
  price: Number,
  image: String,
  tags: [String],
});

const Product = mongoose.model("Product", productSchema);

export default Product;
