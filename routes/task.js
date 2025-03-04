var express = require("express");
var router = express.Router();
const {
  addTaskHandler,
  getTasks,
  getTaskByProject,
} = require("../controllers/taskControllers");

router.post("/", addTaskHandler);
router.get("/", getTasks);
router.get("/:id", getTaskByProject);

module.exports = router;
