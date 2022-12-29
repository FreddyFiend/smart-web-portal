const express = require("express");
const Subject = require("./subjectModel.js");
const authToken = require("../utils/authToken.js");

const subjectRouter = express.Router();

subjectRouter.get("/:id", async (req, res, next) => {
  const subjects = await Subject.find({ department: req.params.id });
  res.status(200).json({
    subjects,
  });
});

subjectRouter.post("/", authToken(["admin"]), async (req, res) => {
  const { title, code, semester, department } = req.body;

  const subject = new Subject({
    title,
    code,
    semester,
    department,
  });

  subject.save((doc, err) => {
    if (err) {
      return res.status(500).json({ msg: "Something went wrong" });
    }
    res.status(201).json({
      msg: "Subject successfully created!",
    });
  });
});

subjectRouter.delete("/:id", authToken(["admin"]), async (req, res) => {
  Subject.findByIdAndDelete(req.params.id, function (err, doc) {
    if (err) return res.status(500).json({ msg: "Something went wrong" });
    res.status(200).json({ msg: "Subject successfully deleted" });
  });
});

module.exports = subjectRouter;
