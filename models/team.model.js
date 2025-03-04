const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project name is required"],
    unique: true,
  }, // Team names must be unique
  description: { type: String }, // Optional description for the team
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
