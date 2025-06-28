import User from '../models/User.js';

//Extract user id and assign it to rew.owner
//This function will be used to create initial data and assign owner by name
export async function assignOwnerMiddleware(req, res, next) {
  try {
    if (!req.session.userId) {
      res.locals.error = 'Unauthorized: User not authenticated';
      return next();
    }

    const user = await User.findById(req.session.userId);

    if (!user) {
      res.locals.error = 'Unauthorized: User not authenticated';
      return next();
    }

    req.owner = user._id; // Assign the _id from user to req.owner
    next();
  } catch (error) {
    next(error);
  }
}
