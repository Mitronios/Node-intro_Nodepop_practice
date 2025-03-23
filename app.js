import express from "express";
import createError from "http-errors";

const app = express();

app.use((req, res, next) => {
  console.log("Receiving request of type", req.method, "to", req.url);
  next();
});

app.get("/", (req, res, next) => {
  res.send("Hello");
});

//Catch 404 and send error
app.use((req, res, next) => {
  next(createError(404));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(`Something went wrong: ${err.message}`);
});

export default app;
