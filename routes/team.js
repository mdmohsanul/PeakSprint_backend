var express = require("express");
var router = express.Router();
const {
  addTeamHandler,
  getTeamsHandler,
  addMember,
} = require("../controllers/teamController");

router.post("/", addTeamHandler);
router.get("/", getTeamsHandler);
router.post("/:id", addMember);
module.exports = router;
