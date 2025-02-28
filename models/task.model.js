const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  }, // refers to project model
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team", // refers to Team model
    required: true,
  },
  owners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // refers to User model
      required: true,
    },
  ],
  tags: [{ type: String }], // Array of tags
  timeToComplete: { type: Number, required: true }, // Number of days to complete the task
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed", "Blocked"], //enum for task status
    default: ["To Do"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Automatically update the `updatedAt` field whenever the document is updated
taskSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
