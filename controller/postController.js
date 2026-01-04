const Post = require("../models/postSchema.js");
const User = require("../models/userSchema.js");
const { postValidate} = require("../utils/schemaValidator.js");
const ExpressError = require("../utils/ExpressError.js");

// INDEX ROUTE
// SHOW UP ALL THE POSTS OF THE APP
module.exports.indexRoute = async (req, res) => {
  const allPost = await Post.find({}).populate("owner");
  res.render("posts/home.ejs", { allPost });
};

// NEW ROUTE
// RENDER THE NEW PAGE TO ADD THE POST
module.exports.newRoute = (req, res) => {
  res.render("posts/new.ejs");
};

// ADD ROUTE
// ADD THE NEW POST
module.exports.postRoute = async (req, res) => {
  const {error,value} = postValidate.validate(req.body);
  if(error){
    throw new ExpressError(400,error.details[0].message);
  }
  const newPost = new Post({
    title: value.title,
    content: value.content,
    imageUrl: `/uploads/${req.file.filename}`,
    owner: req.user._id,
  });

  await newPost.save();
  const currUser = await User.findById(req.user._id);
  currUser.allPost.push(newPost._id);
  await currUser.save();
  res.redirect("/api/posts");
};

// SHOW ROUTE
// SEE THE DETAILS OF THE POST
module.exports.showRoute = async (req, res) => {
  const { id } = req.params;
  const currPost = await Post.findById(id)
    .populate("owner")
    .populate({
      path: "allComments",
      populate: {
        path: "owner",
        model: "User",
      },
    });
  console.log("content of currPost", " ", currPost);
  res.render("posts/show.ejs", { currPost });
};

// UPDATE ROUTE
// RENDER THE UPDATE FORM
module.exports.updateRoute = async (req, res) => {
  const { id } = req.params;
  let currPost = await Post.findOne({ _id: id });
  res.render("posts/edit.ejs", { currPost });
};

// POST THE UPDATED DATA
module.exports.updatedRoute = async (req, res) => {
  const { id } = req.params;
  const {error,value} = postValidate.validate(req.body);
  if(error){
    throw new ExpressError(400,error.details[0].message);
  }
  console.log(req.file);
  await Post.updateOne(
    { _id: id },
    { $set: { title:  value.title, content: value.content, imageUrl: `/uploads/${req.file.filename}` } }
  );
  res.redirect("/api/posts");
};

// DELETE ROUTE
// DELETE THE SPECIFIC POST
module.exports.deleteRoute = async (req, res) => {
  const { id } = req.params;
  const currPost = await Post.findByIdAndDelete({ _id: id });
  const postOwner = await User.findById(currPost.owner);
  postOwner.allPost.pull({ _id: id });
  await postOwner.save();
  res.redirect("/api/posts");
};
