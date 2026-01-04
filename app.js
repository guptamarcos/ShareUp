require("dotenv").config();

// DIFFERENT PACKAGES
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const { MongoStore } = require("connect-mongo");
const multer = require("multer");

// IMPORTING CONNECT DB FOR MAKE THE CONNECTION WITH THE DATABASE
const connectDb = require("./db/connect.js");

// USER DATA MODEL
const User = require("./models/userSchema.js");

// CONNECT THE DB
connectDb()
  .then(() => {
    console.log("Database Connection successful");

    // START AND CREATE SERVER
    app.listen(port, () => {
      console.log(`server is listening on the port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);

    // TERMINATE THE CURRENT NODE.JS PROCESS
    process.exit(1);
  });

const sessionOptions = {
  secret: process.env.SECRET_KEY || "ABC",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL, 
    collectionName: "sessions",
    crypto: {
      secret : process.env.SECRET_KEY || "ABCEDF",
    },
    touchAfter: 24*3600,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 3,
    httpOnly: true,
  },
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() ;
    cb(null, uniqueSuffix + '-' + file.originalname )
  }
})

const upload = multer({ storage })


// UTILITY MIDDLEWARES
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser(process.env.SECRET_KEY));
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


module.exports = {app,upload};