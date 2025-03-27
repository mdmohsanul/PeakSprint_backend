var express = require("express");
var router = express.Router();
const {
  getLastWeekReport,
  getClosedTasks,
} = require("../controllers/reportController");

router.get("/last-week", getLastWeekReport);
router.get("/closed-tasks", getClosedTasks);
module.exports = router;
