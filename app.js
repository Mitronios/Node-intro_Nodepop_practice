import path from "node:path";
import express from "express";
import createError from "http-errors";
import logger from "morgan";
import homeRoutes from "./routes/home.js";

const app = express();

//Configs
app.set("views", "views");
app.set("view engine", "ejs");

//Locals
app.locals.appName = "Nodepop";

//Logger morgan
app.use(logger("dev"));

//Static
app.use(express.static(path.join(import.meta.dirname, "public")));

//App routes
app.use("/", homeRoutes);

//Catch 404 and send error
app.use((req, res, next) => {
  next(createError(404));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  //set locals, including error info in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODEPOP_ENV === "development" ? err : {};

  res.render("error");
});

export default app;
