const Task = require("../models/task.model");
const express = require("express");
const Team = require("../models/team.model");
const Project = require("../models/project.model");
const mongoose = require("mongoose");

const addTaskHandler = async (req, res) => {
  try {
    const { name, project, team, owners, tags, timeToComplete, status } =
      req.body;

    // check if projectId and teamId is a valid ObjectId
    if (
      !mongoose.Types.ObjectId.isValid(project) ||
      !mongoose.Types.ObjectId.isValid(team)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid ID format for Project or Team" });
    }
    const checkTeamId = await Team.findById(team);
    const checkProjectId = await Project.findById(project);

    // check  the team and project  in db
    if (!checkTeamId || !checkProjectId) {
      return res.status(400).json({ message: "Team or Project not found!" });
    }
    if (!name || !owners || !tags || !timeToComplete || !status) {
      return res.status(401).json({ message: "Missing required field" });
    }

    const newTask = new Task({
      name,
      project,
      team,
      owners,
      tags,
      timeToComplete,
      status,
    });

    await newTask.save();
    return res.status(200).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addTaskHandler };
