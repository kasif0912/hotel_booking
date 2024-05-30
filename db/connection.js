const mongoose = require("mongoose");

const mongoDBUrl = process.env.DATABASE;

const connectDB = () => {
  return mongoose
    .connect(mongoDBUrl)
    .then(() => console.log("Database connnected successfully"))
    .catch(() => console.log("error with connecting database"));
};

module.exports = { connectDB }; 
