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
    req.session.userId = user._id;

    res.redirect("/");
  } catch (error) {
    next(error);
  }
}

export function logOut(req, res, next) {
  console.log("Logout route called");
  console.log("Session before regenerate:", req.session);
  req.session.regenerate((err) => {
    if (err) {
      console.error("Session regeneration error:", err);
      next(err);
      return;
    }
    console.log("Session regenerated");
    console.log("Session after regenerate:", req.session);
    console.log("Redirecting to /");
    res.redirect("/");
  });
}
