const Team = require("../models/team.model");

const addTeamHandler = async (req, res) => {
  try {
    const { name, description } = req.body;
    const checkName = await Team.findOne({ name });
    console.log(checkName);
    if (checkName && checkName.name === name) {
      return res.status(401).json({ message: "Team name is already present" });
    }
    const newTeam = await Team.create({ name, description });
    return res.status(200).json(newTeam);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTeamsHandler = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addTeamHandler, getTeamsHandler };
