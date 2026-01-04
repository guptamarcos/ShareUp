const express = require("express");
const router = express.Router({ mergeParams: true });
const Comment = require("../models/commentSchema.js");
const Post = require("../models/postSchema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isAuthenticated, checkValidIdPost , checkValidIdComment} = require("../utils/middleware.js");
const {commentValidate} = require("../utils/schemaValidator.js");
const ExpressError = require("../utils/ExpressError.js");


router.post(
  "/",
  isAuthenticated,
  checkValidIdPost,
  wrapAsync(async (req, res) => {
    const { error, value } = commentValidate.validate(req.body);
    if(error){
      throw new ExpressError(400,error.details[0].message);
    }
    const { id } = req.params;
    const comment = new Comment({
      owner: req.user._id,
      content: value.content,
    });
    await comment.save();
    const currPost = await Post.findById(id);
    currPost.allComments.push(comment._id);
    await currPost.save();
    res.redirect(`/api/posts/${id}`);
  })
);

router.delete(
  "/:commentId",
  isAuthenticated,
  checkValidIdPost,
  checkValidIdComment,
  wrapAsync(async (req, res) => {
    const { commentId, id } = req.params;
    await Comment.deleteOne({_id:commentId});
    const currPost = await Post.findById(id);
    currPost.allComments.pull(commentId);
    await currPost.save();
    res.redirect(`/api/posts/${id}`)
  })
);

module.exports = router;
