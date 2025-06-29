import jwt from 'jsonwebtoken';
import createError from 'http-errors';

export const guard = (req, res, next) => {
  const tokenJWT = req.get('Authorization') || req.body.jwt || req.query.jwt;

  if (!tokenJWT) {
    next(createError(401, 'Token is required, none was provided.'));
    return;
  }
  jwt.verify(tokenJWT, process.env.JWT_SECRET, (error, payload) => {
    if (error) {
      next(createError(401, 'Invalid token'));
      return;
    }
    req.apiUserId = payload.user_id;
    next();
  });
};
