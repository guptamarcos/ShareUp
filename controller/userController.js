const Post = require("../models/postSchema.js");
const User = require("../models/userSchema.js");
const ExpressError = require("../utils/ExpressError.js");
const { signupValidate} = require("../utils/schemaValidator.js");

module.exports.getSignUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.postSignUpData = async (req, res, next) => {
  const {error,value} = signupValidate.validate(req.body);
  if(error){
    throw new ExpressError(400,error.details[0].message);
  }
  const { username, email, password } = value;
  const newUser = new User({ username, email });
  const registeredUser = await User.register(newUser, password);
  req.login(registeredUser, (err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "User is Registered successfully!!");
    return res.redirect("/api/posts");
  });
};

module.exports.getLogInForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.postLogInData = async(req, res) => {
    req.flash("success", "User is LogIn successfully!!");
    res.redirect("/api/posts");
}

module.exports.logOut = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "User is LogOut successfully!!");
    res.redirect("/api/posts");
  });
};

module.exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser.allPost.length > 0) {
      const deletedPosts = await Post.deleteMany({
        _id: { $in: deletedUser.allPost },
      });
    }
    req.flash("success", "User is deleted successfully!!");
    res.redirect("/api/posts");
}

