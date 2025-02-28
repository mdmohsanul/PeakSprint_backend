var express = require("express");
var router = express.Router();
const {
  addTeamHandler,
  getTeamsHandler,
} = require("../controllers/teamController");

router.post("/", addTeamHandler);
router.get("/", getTeamsHandler);

module.exports = router;
