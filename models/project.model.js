const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Project names must be unique
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed", "On Hold"],
    default: "To Do",
  },
  description: { type: String }, // Optional field for project details
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", projectSchema);
