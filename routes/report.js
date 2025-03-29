var express = require("express");
var router = express.Router();
const {
  getLastWeekReport,
  getClosedTasks,
  getPendingTasks,
} = require("../controllers/reportController");

router.get("/last-week", getLastWeekReport);
router.get("/closed-tasks", getClosedTasks);
router.get("/pending", getPendingTasks);

module.exports = router;
