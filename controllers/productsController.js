import Product from '../models/Product.js';

export function index(req, res, next) {
  const error = req.query.error;
  res.render('add-product', { error });
}

//Create new product
export async function postNewProduct(req, res, next) {
  try {
    const { name, price } = req.body;
    const image = req.file?.filename;
    const owner = req.owner;

    if (!name || !price || !image || !owner) {
      return res.redirect('/products/add?error=missing-fields');
    }

    //new instance of product
    const product = new Product({ name, owner, price, image });

    await product.save();

    res.redirect('/');
  } catch (error) {
    next(error);
  }
}

//Delete product
export async function deleteProduct(req, res, next) {
  try {
    const userId = req.session.userId;
    const productId = req.params.productId;
    console.log('Deleting product', productId, 'for user', userId);

    if (!userId) throw new Error('User not logged in');
    if (!productId) throw new Error('Missing product id');

    const result = await Product.deleteOne({ _id: productId, owner: userId });
    console.log('Delete result:', result);

    res.redirect('/');
  } catch (error) {
    console.error('Delete error:', error);
    next(error);
  }
}
