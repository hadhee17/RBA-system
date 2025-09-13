const Model = require("../model/dataSchema");

//create a post
exports.createPost = async (req, res, next) => {
  try {
    const newPost = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        newPost,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const getPost = await Model.find();
    res.status(200).json({
      status: "success",
      data: {
        getPost,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const updatePost = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        updatePost,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
