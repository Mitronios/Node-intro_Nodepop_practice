import User from "../models/User.js";

export async function assignOwnerMiddleware(req, res, next) {
  try {
    if (!req.session.userId) {
      res.locals.error = "Unauthorized: User not authenticated";
    }

    const user = await User.findById(req.session.userId);

    if (!user) {
      res.locals.error = "Unauthorized: User not authenticated";
    }

    req.owner = user._id; // Asigna el _id del usuario a req.owner
    next();
  } catch (error) {
    next(error);
  }
}
