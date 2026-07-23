const express = require("express");

const {
  getAnalytics,
} = require(
  "../controllers/adminController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const {
  authorize,
} = require(
  "../middleware/roleMiddleware"
);

const router = express.Router();

router.get(
  "/analytics",
  protect,
  authorize("Admin"),
  getAnalytics
);

module.exports = router;