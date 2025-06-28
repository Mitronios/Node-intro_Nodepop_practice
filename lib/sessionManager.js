import session from "express-session";
import MongoStore from "connect-mongo";

//Set session max time
const INACTIVITY_EXPIRATION_2_DAYS = 1000 * 60 * 60 * 24 * 2; // 48 hours

//Set password to allow connection to Mongo
const password = process.env.MONGODB_PASSWORD;
const stringConnection = process.env.MONGODB_STRING_CONECTION;

//Set secret to be used in the session
const secretSession = process.env.SESSION_SECRET;

//Middleware to handle sessions
export const middleware = session({
	name: "nodepop-session",
	secret: `${secretSession}`,

	//Creates an empty session for every user, logged or not
	saveUninitialized: false,
	resave: false,
	cookie: { maxAge: INACTIVITY_EXPIRATION_2_DAYS },
	store: MongoStore.create({
		mongoUrl: `mongodb://nodePop:${password}${stringConnection}`,
	}),
});

//Allow to use the session in views
export function useSessionsInViews(req, res, next) {
	res.locals.session = req.session;
	next();
}

//If not logged then redirect the user to login
export function guard(req, res, next) {
	if (!req.session.userId) {
		res.redirect(`/login?redir=${encodeURIComponent(req.originalUrl)}`);
		return;
	}
	next();
}
