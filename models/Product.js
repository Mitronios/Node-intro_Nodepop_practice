import mongoose, { Schema } from 'mongoose';

//Define products schema
const productSchema = new Schema({
  name: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  price: Number,
  image: String,
  tags: [String],
});

productSchema.statics.list = (filter, limit, skip, sort, fields) => {
  const query = Product.find(filter);
  query.limit(limit);
  query.skip(skip);
  query.sort(sort);
  query.select(fields);
  return query.exec();
};

const Product = mongoose.model('Product', productSchema);

export default Product;
