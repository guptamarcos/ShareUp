// IMPORTING THE APP
const app = require("./app.js");

// ROUTING OBJECTS
const postRoutes = require("./routes/postRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const commentRoutes = require("./routes/commentRoutes.js");

// CREATING LOCAL VARIABLES
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  return next();
});

// MIDDLEWARE OF DIFFERENT ROUTES
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts/:id/comment",commentRoutes);

// MIDDLEWARE FOR PAGE NOT FOUND
app.use((req, res) => {
  res.send("Page not found!!!");
});

// ERROR HANDLING MIDDLEWARE
app.use((err,req,res,next)=>{
  const { status = 500, message="Something went Wrong!!!" } = err;
  req.flash("error", message);
  const backUrl = req.get("referer") || "/api/posts";
  res.redirect(backUrl);
});
