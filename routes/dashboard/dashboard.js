const express = require("express");
const router = express.Router();

const dashboardController = require("../../controllers/dashboardController");

router.post("/totalBudget", dashboardController.budget);
router.post("/items", dashboardController.items);

module.exports = router;
