const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/student_db");
    await mongoose.connect("mongodb://host.docker.internal:27017/student_db_test");

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;