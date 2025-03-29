import session from "express-session";
import MongoStore from "connect-mongo";

const INACTIVITY_EXPIRATION_2_DAYS = 1000 * 60 * 60 * 24 * 2; // 48 hours
const password = process.env.MONGODB_PASSWORD;
const secretSession = process.env.SESSION_SECRET;

//Middleware to handle sessions
export const middleware = session({
  name: "nodepop-session",
  secret: `${secretSession}`,

  //Creates an empty session for every user, logged or not
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: INACTIVITY_EXPIRATION_2_DAYS },
  store: MongoStore.create({
    mongoUrl: `mongodb://admin:${password}@localhost:27017/cursonode?authSource=admin`,
  }),
});

export function useSessionsInViews(req, res, next) {
  res.locals.session = req.session;
  next();
}
