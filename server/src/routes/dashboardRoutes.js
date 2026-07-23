const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getAdminDashboardStats,
  getEmployeeDashboard,
  getReviewerDashboard,
} = require("../controllers/dashboardController");

router.get("/stats", protect, getAdminDashboardStats);

router.get("/employee", protect, getEmployeeDashboard);

router.get("/reviewer", protect, getReviewerDashboard);

module.exports = router;