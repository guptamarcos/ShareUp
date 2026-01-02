const express = require("express");
const router = express.Router();
const Post = require("../models/postSchema.js");
const User = require("../models/userSchema.js");
const passport = require("passport");
const {isAuthenticated,checkValidIdUser} = require("../utils/middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/SignUp", (req, res) => {
  res.render("users/signup.ejs");
});

router.post("/SignUp", wrapAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email });
  const registeredUser = await User.register(newUser, password);
  req.login(registeredUser, (err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "User is Registered successfully!!");
    return res.redirect("/api/posts");
  });
}));

router.get("/LogIn", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/LogIn",
  passport.authenticate("local", {
    failureRedirect: "/api/users/SignUp",
    failureFlash: "Invalid Username or password",
  }),
  wrapAsync((req, res) => {
    req.flash("success", "User is LogIn successfully!!");
    res.redirect("/api/posts");
  }
));

router.get(
  "/Logout",
  isAuthenticated,
  (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "User is LogOut successfully!!");
      res.redirect("/api/posts");
    });
  }
);

router.get(
  "/:id",
  isAuthenticated,
  checkValidIdUser,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if(deletedUser.allPost.length>0){
      const deletedPosts = await Post.deleteMany({_id: {$in:deletedUser.allPost}});
    }
    req.flash("success", "User is deleted successfully!!");
    res.redirect("/api/posts");
  }
));

module.exports = router;
