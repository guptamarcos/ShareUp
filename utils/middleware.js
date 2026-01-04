const mongoose = require("mongoose");
const Post = require("../models/postSchema.js");
const User = require("../models/userSchema.js");
const Comment = require("../models/commentSchema.js");
const ExpressError = require("./ExpressError.js");

const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged In!!");
    return res.redirect("/api/posts");
  } else {
    next();
  }
};

function checkValidObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(400, "Invalid objectId");
  }
  return true;
}

// CHECK VALID ID FOR POST
const checkValidIdPost = async (req, res, next) => {
  const { id } = req.params;
  if (checkValidObjectId(id)) {
    const currPost = await Post.findById(id);

    if (!currPost) {
      throw new ExpressError(404, "Post not found!!");
    }
    next();
  }
};

// CHECK VALID ID FOR USER

const checkValidIdUser = async (req, res, next) => {
  const { id } = req.params;
  if (checkValidObjectId(id)) {
    const currUser = await User.findById(id);
    if (!currUser) {
      throw new ExpressError(404, "User not exist!!");
    }
    next();
  }
};

// CHECK VALID COMMENT ID
const checkValidIdComment = async (req, res, next) => {
  const { commentId } = req.params;
  if (checkValidObjectId(id)) {
    const currComment = await Comment.findById(commentId);
    if (!currComment) {
      throw new ExpressError(404, "Comment not exist!!");
    }
    next();
  }
};

const checkIsOwner = async (req, res, next) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!req.user._id.equals(comment.isOwner)) {
    throw new ExpressError(404, "You can't delete the comment!!!");
  }
  next();
};

module.exports = {
  isAuthenticated,
  checkValidIdPost,
  checkValidIdUser,
  checkValidIdComment,
  checkIsOwner,
};  is this correct ?