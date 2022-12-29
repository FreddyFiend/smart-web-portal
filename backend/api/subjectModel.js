const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    code: { type: String, required: false },
    semester: { type: Number, required: false },
    department: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);
const Subject = mongoose.model("subject", subjectSchema);
module.exports = Subject;
