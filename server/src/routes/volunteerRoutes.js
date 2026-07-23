const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getMyVolunteering,
  updateVolunteerProgress,
} = require("../controllers/volunteerController");

router.get("/my-volunteering", protect, getMyVolunteering);

router.patch(
  "/:id/progress",
  protect,
  updateVolunteerProgress
);

module.exports = router;