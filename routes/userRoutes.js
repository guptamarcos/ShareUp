const express = require("express");
const router = express.Router();
const routes = require("../controller/userController.js");
const passport = require("passport");
const { isAuthenticated, checkValidIdUser } = require("../utils/middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

router
  .route("/SignUp")
  .get(routes.getSignUpForm)
  .post(wrapAsync(routes.postSignUpData));

router
  .route("/LogIn")
  .get(routes.getLogInForm)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/api/users/SignUp",
      failureFlash: "Invalid Username or password",
    }),
    wrapAsync(routes.postLogInData)
  );

router.route("/Logout").get(isAuthenticated, routes.logOut);

router
  .route("/:id")
  .get(isAuthenticated, checkValidIdUser, wrapAsync(routes.deleteUser));

module.exports = router;