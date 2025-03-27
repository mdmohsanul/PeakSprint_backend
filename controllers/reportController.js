const Task = require("../models/task.model");
const express = require("express");
const mongoose = require("mongoose");

const getLastWeekReport = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentDocsWithCompleteStatus = await Task.find({
      updatedAt: { $gte: sevenDaysAgo },
      status: "Completed",
    })
      .populate({ path: "owners", select: "-password" })
      .populate({ path: "team", select: "-members" })
      .populate("project")
      .sort({ createdAt: -1 });
    res.status(200).json(recentDocsWithCompleteStatus);
  } catch (error) {
    res.status(500).json({ message: "Error fetching last week report data" });
  }
};

module.exports = { getLastWeekReport };
