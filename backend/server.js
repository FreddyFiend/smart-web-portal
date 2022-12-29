const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const cors = require("cors");
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("Database is connected !");
});

const userRoutes = require("./api/userRoutes.js");
app.use("/user", userRoutes);

const departmentRoutes = require("./api/departmentRoutes.js");
app.use("/department", departmentRoutes);

const subjectRoutes = require("./api/subjectRoutes.js");
app.use("/subject", subjectRoutes);

const fileRoutes = require("./api/fileRoutes.js");
app.use("/file", fileRoutes);

//app.use(express.static("public"));

const hostname = "localhost";
//const port = 3000;

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
