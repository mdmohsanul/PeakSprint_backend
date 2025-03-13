const Task = require("../models/task.model");
const express = require("express");
const Team = require("../models/team.model");
const Project = require("../models/project.model");
const mongoose = require("mongoose");

const addTaskHandler = async (req, res) => {
  try {
    const {
      name,
      project,
      team,
      owners,
      tags,
      timeToComplete,
      status,
      dueDate,
      priority,
    } = req.body;

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
    if (
      !name ||
      !owners ||
      !tags ||
      !timeToComplete ||
      !status ||
      !dueDate ||
      !priority
    ) {
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
      dueDate,
      priority,
    });

    await newTask.save();
    return res.status(200).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("owners")
      .populate("team")
      .populate("project")
      .populate({ path: "team", populate: "members" })
      .sort({ createdAt: -1 });
    if (!tasks) {
      return res.status(401).json({ message: "No Task found" });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTaskByProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const checkProjectId = await Project.findById(id);
    // check  the team and project  in db
    if (!checkProjectId) {
      return res.status(400).json({ message: " Project not found!" });
    }
    const tasks = await Task.find({ project: id })
      .populate("owners")
      .populate("team")
      .populate("project")
      .populate({ path: "team", populate: "members" })
      .sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addTaskHandler, getTasks, getTaskByProject };
