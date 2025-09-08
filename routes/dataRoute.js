const express = require("express");
const dataController = require("../controller.js/dataController");
const router = express.Router();

router.patch("/updatePosts/:id", dataController.updatePost);
router.delete("/deletePosts/:id", dataController.deletePost);
router.post("/addPosts", dataController.createPost);
router.get("/getPosts", dataController.getPost);

module.exports = router;
