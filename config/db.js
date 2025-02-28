const mongoose = require("mongoose");
require("dotenv").config();

const mongo_URI = process.env.MONGODB_URI;

const initializeDB = async () => {
  try {
    const connection = mongoose.connect(mongo_URI);
    if (connection) {
      console.log("MongoDB connected");
    }
  } catch (error) {
    console.log(`Initial MongoDB connection error: ${err}`);
  }
};

// If MongoDB fails to connect due to an incorrect URI, network issue, or server down, the error will be caught
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

module.exports = { initializeDB };
