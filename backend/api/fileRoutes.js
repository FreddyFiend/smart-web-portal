const multer = require("multer");
const path = require("path");
const express = require("express");
//const Note = require("./fileModel.js");
const authToken = require("../utils/authToken.js");

const fileRouter = express.Router();

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

fileRouter.post("/", upload.single("file"), (req, res) => {
  res.send(`/${req.file.path}`);
});

module.exports = fileRouter;
