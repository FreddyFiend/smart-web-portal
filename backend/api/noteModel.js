const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    noteType: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
    semester: { type: Number, required: true },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "subject",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "department",
    },
  },
  {
    timestamps: true,
  }
);
const Note = mongoose.model("note", noteSchema);
module.exports = Note;
