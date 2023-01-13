const express = require("express");
const Department = require("./departmentModel.js");
const Subject = require("./subjectModel.js");
const authToken = require("../utils/authToken.js");

const departmentRouter = express.Router();

departmentRouter.get("/", async (req, res) => {
  const departments = await Department.find();
  res.status(200).json({
    departments,
  });
});

departmentRouter.post("/", authToken(["admin"]), async (req, res) => {
  const { title, type, semesters } = req.body;

  const department = new Department({
    title,
    type,
    semesters,
  });

  department.save((err, doc) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
    res.status(201).json({
      msg: "Department successfully created!",
    });
  });
});

departmentRouter.delete("/:id", authToken(["admin"]), async (req, res) => {
  await Subject.deleteMany({ department: req.params.id });
  Department.findByIdAndDelete(req.params.id, function (err, doc) {
    if (err) return res.status(500).json({ msg: "Something went wrong" });

    res.status(200).json({ msg: "Subject successfully deleted" });
  });
});

module.exports = departmentRouter;
