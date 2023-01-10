const multer = require("multer");
const path = require("path");

const express = require("express");
const Note = require("./noteModel.js");
const authToken = require("../utils/authToken.js");

const noteRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /ppt|pptx|pdf/; // Choose Types you want...
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!"); // custom this message to fit your needs
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

noteRouter.post(
  "/file",
  upload.single("file"),
  authToken(["teacher", "admin"]),
  async (req, res) => {
    try {
      const { subject, department, semester } = req.body;
      const note = new Note({
        title: req.file.originalname,
        text: req.file.filename,
        noteType: "file",
        subject,
        semester,
        department,
        user: req.user._id,
      });
      note.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "Something went wrong" });
        }
        res.status(201).json({
          msg: `File successfully uploaded!`,
        });
      });
    } catch (er) {
      console.log(er);
    }
  }
);

noteRouter.get("/", async (req, res) => {
  console.log(req.query);
  const notes = await Note.find({
    noteType: req.query.type,
    department: req.query.department,
    semester: req.query.semester,
  })
    .populate("user")
    .populate("subject");
  console.log(notes);
  res.status(200).json({
    notes,
  });
});

noteRouter.get("/download/:filesrc", (req, res) => {
  const filePath = `uploads/${req.params.filesrc}`;

  res.download(filePath, "js.pdf");
});

noteRouter.post("/", authToken(["teacher", "admin"]), async (req, res) => {
  try {
    const { title, text, subject, noteType, department, semester } = req.body;

    const note = new Note({
      title,
      text,
      noteType,
      subject,
      department,
      semester,
      user: req.user._id,
    });

    note.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Something went wrong" });
      }
      res.status(201).json({
        msg: `${noteType} successfully created!`,
      });
    });
  } catch (er) {
    console.log(er);
  }
});

noteRouter.delete("/:id", authToken(["admin", "teacher"]), async (req, res) => {
  Note.findByIdAndDelete(req.params.id, function (err, doc) {
    if (err) return res.status(500).json({ msg: "Something went wrong" });
    res.status(200).json({ msg: "Note successfully deleted" });
  });
});

module.exports = noteRouter;
