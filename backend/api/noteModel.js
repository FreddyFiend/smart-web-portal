const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);
const Note = mongoose.model("note", noteSchema);
module.exports = Note;
