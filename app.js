import path from "node:path";
import express from "express";
import createError from "http-errors";
import logger from "morgan";
import ejs from "ejs";
import connectMongoose from "./lib/connectMongoose.js";
import * as sessionManager from "./lib/sessionManager.js";
import homeRoutes from "./routes/home.js";
import loginRoutes from "./routes/login.js";
import productsRoutes from "./routes/products.js";
import { assignOwnerMiddleware } from "./middlewares/assignOwnerMiddleware.js";

//Mongoose connect
await connectMongoose();

//Create express app
const app = express();

//Configs
app.set("views", "views");
app.set("view engine", "html");
app.engine("html", ejs.__express);

//Locals
app.locals.appName = "Nodepop";

//Logger morgan
app.use(logger("dev"));

//Urlencoded
app.use(express.urlencoded({ extended: false }));

//Static
app.use(express.static(path.join(import.meta.dirname, "public")));

//Sessions
app.use(sessionManager.middleware);
app.use(sessionManager.useSessionsInViews);

//App routes
app.use("/", homeRoutes);
app.use("/login", loginRoutes);
app.use("/products", assignOwnerMiddleware, productsRoutes);

//Catch 404 and send error
app.use((req, res, next) => {
  next(createError(404));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  //General Validation
  if (err.array) {
    err.message =
      "Invalid request: " +
      err
        .array()
        .map((err) => `${err.location} ${err.type} ${err.path} ${err.msg}`)
        .join(", ");
    err.status = 422;
  }

  //set locals, including error info in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODEPOP_ENV === "development" ? err : {};

  res.render("error");
});

export default app;
