var express = require("express");
var router = express.Router();
const { addTaskHandler } = require("../controllers/taskControllers");

router.post("/", addTaskHandler);

module.exports = router;
