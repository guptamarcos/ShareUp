const express = require("express");
const router = express.Router();
const { isAuthenticated, checkValidIdPost } = require("../utils/middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const routes = require("../controller/postController.js");
const { upload } = require("../app.js");

router
  .route("/")
  .get(wrapAsync(routes.indexRoute))
  .post(isAuthenticated,upload.single("imageUrl"), wrapAsync(routes.postRoute));

router.route("/new").get(isAuthenticated, routes.newRoute);

router
  .route("/:id/edit")
  .get(isAuthenticated, checkValidIdPost, wrapAsync(routes.updateRoute));

router
  .route("/:id")
  .get(isAuthenticated, checkValidIdPost, wrapAsync(routes.showRoute))
  .patch(isAuthenticated, upload.single("imageUrl"), checkValidIdPost, wrapAsync(routes.updatedRoute))
  .delete(isAuthenticated, checkValidIdPost, wrapAsync(routes.deleteRoute));

module.exports = router;
