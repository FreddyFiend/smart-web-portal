const express = require("express");
const Note = require("./noteModel.js");
const authToken = require("../utils/authToken.js");

const noteRouter = express.Router();

noteRouter.get("/:id", async (req, res) => {
  const notes = await Note.find({ subject: req.params.id });
  res.status(200).json({
    notes,
  });
});

noteRouter.post("/", authToken(["teacher", "admin"]), async (req, res) => {
  const { title, text, subject } = req.body;

  const note = new Note({
    title,
    text,
    subject,
    user: req.user.username,
  });

  note.save((err, doc) => {
    if (err) {
      return res.status(500).json({ msg: "Something went wrong" });
    }
    res.status(201).json({
      msg: "Note successfully created!",
      note: doc,
    });
  });
});

noteRouter.delete("/:id", authToken(["admin", "teacher"]), async (req, res) => {
  Note.findByIdAndDelete(req.params.id, function (err, doc) {
    if (err) return res.status(500).json({ msg: "Something went wrong" });
    res.status(200).json({ msg: "Note successfully deleted" });
  });
});

module.exports = noteRouter;
