const express = require("express");
const userController = require("../controller.js/userController");

const route = express.Router();

route.post("/signup", userController.signup);
route.get("/login", userController.login);
module.exports = route;
