import Product from "../models/Product.js";
import User from "../models/User.js";

export async function index(req, res, next) {
  try {
    if (!req.session.userId) {
      return res.render("home", { products: [], userName: null });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.render("home", { products: [], userName: null });
    }

    const products = await Product.find({ owner: req.session.userId });
    res.render("home", { products: products, userName: user.name });
  } catch (error) {
    next(error);
  }
}
