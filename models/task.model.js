const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  }, // refers to project model
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team", // refers to Team model
    required: true,
  },
  owners: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // refers to User model
      required: true,
    },
  ],
  tags: [{ type: String }], // Array of tags
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: ["Hign"],
  },
  timeToComplete: { type: Number, required: true }, // Number of days to complete the task
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed", "Blocked"], //enum for task status
    default: ["To Do"],
  },
  dueDate: { type: Date, default: Date.now },
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
