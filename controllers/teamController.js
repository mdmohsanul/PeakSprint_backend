const Team = require("../models/team.model");

const addTeamHandler = async (req, res) => {
  try {
    const { name, description, members } = req.body;
    const checkName = await Team.findOne({ name });
    console.log(checkName);
    if (checkName && checkName.name === name) {
      return res.status(401).json({ message: "Team name is already present" });
    }
    const newTeam = await Team.create({ name, description, members });
    return res.status(200).json(newTeam);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTeamsHandler = async (req, res) => {
  try {
    const teams = await Team.find().populate({
      path: "members",
      select: "-password",
    }); // Exclude password in populated member
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const addMember = async (req, res) => {
  try {
    const teamId = req.params.id;
    // It accepts an array of member ID
    const memberId = req.body;

    const newMember = await Team.findByIdAndUpdate(
      teamId,
      { $addToSet: { members: { $each: memberId.member } } },
      { new: true }
    );
    res.status(200).json(newMember);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addTeamHandler, getTeamsHandler, addMember };
