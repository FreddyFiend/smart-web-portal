const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    semesters: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Department = mongoose.model("department", departmentSchema);
module.exports = Department;
