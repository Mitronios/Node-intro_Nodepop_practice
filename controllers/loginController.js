import User from "../models/User.js";

export function index(req, res, next) {
  res.locals.error = "";
  res.locals.email = "";
  res.render("login", { req: req });
}

export async function postLogin(req, res, next) {
  try {
    const { email, password } = req.body;

    //find user
    const user = await User.findOne({ email: email });
    if (!user || !(await user.comparePassword(password))) {
      res.locals.error = "Invalid Credentials";
      res.locals.email = email;
      res.render("login", { req: req });
      return;
    }
    req.session.userID = user.id;

    res.redirect("/");
  } catch (error) {
    next(error);
  }
}

export function logOut(req, res, next) {
  req.session.regenerate((err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect("/");
  });
}
