const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const successRes = (res, statusCode, data) => {
  res.status(statusCode).json({
    status: "success",
    data: {
      data,
    },
  });
};

const jwtToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const createResponseToken = (user, statusCode, res) => {
  const token = jwtToken(user._id);
  res.status(statusCode).json({
    status: "Success",

    token,
    data: {
      user,
    },
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    let error = new Error("please provide email and password");

    error.statusCode = 404;
    error.status = "fail";
    next(error);
    return;
  }
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (!user || user.password !== req.body.password) {
    let error = new Error("Invalid email or password");

    error.statusCode = 404;
    error.status = "fail";
    next(error);
    return;
  }
  createResponseToken(user, 200, res);
};

exports.restrictTo = function (...role) {
  return async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      const error = new Error("You are not logged in to get access");
      error.statusCode = 401;
      error.status = "fail";
      next(error);
      return;
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    req.user = currentUser;
    if (!role.includes(req.user.role)) {
      let error = new Error(
        "You do not have permission to perform this action"
      );
      error.statusCode = 403;
      error.status = "fail";
      return next(error);
    }
    next();
  };
};
