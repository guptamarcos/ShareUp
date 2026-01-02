require("dotenv").config();
const mongoose = require("mongoose");

async function connectDb() {
  try {
    if (!process.env.DB_URL) {
      throw new Error("Database url is not defined in environment variables!!!!");
    }
    await mongoose.connect(process.env.DB_URL);
  } catch (err) {
    throw new Error(`Database connection is failed , ${err.message}`);
  }
}

module.exports = connectDb;
