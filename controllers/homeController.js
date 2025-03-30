import Product from "../models/Product.js";
import User from "../models/User.js";

export async function index(req, res, next) {
  try {
    if (!req.session.userID) {
      res.render("home", { products: [], userName: null });
    } else {
      const products = await Product.find({ owner: req.session.userID });
      const user = await User.findById(req.session.userID);
      res.render("home", { products: products, userName: user.name });
    }
  } catch (error) {
    next(error);
  }
}
