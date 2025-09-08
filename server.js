const connectDB = require("./config/DB");
const express = require("express");

const route = require("./routes/dataRoute");
const app = express();
//connect Database

app.use(express.json());
connectDB();

app.use("/api", route);

//error handling middleware for unhandled routes
app.all("*all", (req, res, next) => {
  const err = new Error(`cant find route ${req.originalUrl}`);
  err.statusCode = 404;
  err.status = "fail";
  next(err);
});

//global error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || "Something went wrong!",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
