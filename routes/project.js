var express = require("express");
var router = express.Router();
const {
  getProjectHandler,
  addProjectHandler,
} = require("../controllers/projectController");

router.post("/", addProjectHandler);
router.get("/", getProjectHandler);

module.exports = router;
