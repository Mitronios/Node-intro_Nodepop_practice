import Product from "../models/Product.js";

export function index(req, res, next) {
  res.render("add-product");
}

export async function postNewProduct(req, res, next) {
  try {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const owner = req.owner;
    //new instance of product
    const product = new Product({ name, owner, price, image });

    await product.save();

    res.redirect("/");
  } catch (error) {
    next(error);
  }
}
