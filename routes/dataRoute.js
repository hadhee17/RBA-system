const express = require("express");
const dataController = require("../controller.js/dataController");
const userController = require("../controller.js/authController");
const router = express.Router();

router.post(
  "/addPosts",

  userController.restrictTo("user"),
  dataController.createPost
);

module.exports = router;
