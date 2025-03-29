import Product from "../models/Product.js";

export async function index(req, res, next) {
  try {
    res.locals.users = await Product.find();
    res.render("home");
  } catch (error) {
    next(error);
  }
}

export function postWithBody(req, res, next) {
  const name = req.body.name;
  const owner = req.body.owner;
  const price = req.body.price;
  const image = req.body.image;
  console.log(req.body);
  res.send(ok);
}
