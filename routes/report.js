var express = require("express");
var router = express.Router();
const { getLastWeekReport } = require("../controllers/reportController");

router.get("/last-week", getLastWeekReport);

module.exports = router;
