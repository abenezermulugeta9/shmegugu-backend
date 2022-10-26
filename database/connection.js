const mongoose = require("mongoose");
const dotenv = require('dotenv')

dotenv.config(); 

module.exports.connectDB = (callback) => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
      console.log("Connected to database....");
      callback();
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
