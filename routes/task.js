var express = require("express");
var router = express.Router();
const { addTaskHandler, getTasks } = require("../controllers/taskControllers");

router.post("/", addTaskHandler);
router.get("/", getTasks);

module.exports = router;
