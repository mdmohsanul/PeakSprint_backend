var express = require("express");
var router = express.Router();
const {
  addTaskHandler,
  getTasks,
  getTaskByProject,
  getTaskById,
} = require("../controllers/taskControllers");

router.post("/", addTaskHandler);
router.get("/", getTasks);
router.get("/:id", getTaskByProject);
router.get("/task/:id", getTaskById);

module.exports = router;
