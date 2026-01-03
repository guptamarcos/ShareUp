const Post = require("../models/postSchema.js");
const User = require("../models/userSchema.js");

// INDEX ROUTE
// SHOW UP ALL THE POSTS OF THE APP
module.exports.indexRoute = async (req, res) => {
  const allPost = await Post.find({});
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
  const newPost = new Post({
    username: req.user.username,
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    isOwner: req.user._id,
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
  const currPost = await Post.findOne({ _id: id }).populate("allComments");
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
  const { title, content, imageUrl } = req.body;
  await Post.updateOne(
    { _id: id },
    { $set: { title: title, content: content, imageUrl: imageUrl } }
  );
  res.redirect("/api/posts");
};

// DELETE ROUTE
// DELETE THE SPECIFIC POST
module.exports.deleteRoute = async (req, res) => {
    const { id } = req.params;
    const currPost = await Post.findByIdAndDelete({ _id: id });
    const postOwner = await User.findById(currPost.isOwner);
    postOwner.allPost.pull({ _id: id });
    await postOwner.save();
    res.redirect("/api/posts");
}


