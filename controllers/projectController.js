const Project = require("../models/project.model");

const addProjectHandler = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    const projectName = await Project.findOne({ name });

    if (projectName && projectName.name === name) {
      return res.status(400).json({ message: "Project name is taken" });
    }
    const newProject = await Project.create({ name, description, status });
    return res.status(200).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const getProjectHandler = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    if (!projects) {
      res.status(400).json({ message: "No project found" });
    }
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getProjectHandler, addProjectHandler };
