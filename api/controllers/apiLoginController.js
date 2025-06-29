import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../../models/User.js';

export const loginJWT = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return next(createError(401, 'Invalid Credentials'));
    }

    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
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
        return;
      },
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Method that allows the creation of a user to generate a token and test the API
 *
 */
export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return next(createError(400, 'Email already in use'));
    }

    // Verificamos que el método está disponible
    if (!User.hashPassword) {
      return next(createError(500, 'Hash function not found on model'));
    }

    const hashedPassword = await User.hashPassword(password);

    const user = new User({ email, password: hashedPassword });
    const savedUser = await user.save();

    res.status(201).json({ _id: savedUser._id, email: savedUser.email });
  } catch (error) {
    next(error);
  }
};
