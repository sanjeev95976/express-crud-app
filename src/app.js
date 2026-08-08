const express = require("express");
const studentsRouter = require("./routes/students");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Student CRUD API - Jenkins CI test "
  });
});

app.use("/api/students", studentsRouter);


module.exports = app;