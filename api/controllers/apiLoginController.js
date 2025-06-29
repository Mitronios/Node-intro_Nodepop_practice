import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../../models/User.js';

export const loginJWT = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    const validPassword = await user.comparePassword(password);

    if (!user || !validPassword) {
      next(createError(401, 'Invalid Credentials'));
      return;
    }

    jwt.sign(
      { user_id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '2d',
      },
      (error, tokenJWT) => {
        if (error) {
          return next(error);
        }
        res.json({ tokenJWT });
      },
    );
  } catch (error) {
    next(error);
  }
};
