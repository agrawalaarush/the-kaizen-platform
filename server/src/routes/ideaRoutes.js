const express = require("express");

const {
  authorize,
} = require("../middleware/roleMiddleware");

const {
  createIdea,
  getMyIdeas,
  getPublicIdeas,
  getIdeaById,
  getPendingIdeas,
  approveIdea,
  rejectIdea,
  getReviewedIdeas,
  deleteIdea,
} = require("../controllers/ideaController");

const {
  volunteerForIdea,
  getIdeaVolunteers,
} = require("../controllers/volunteerController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   Idea Creation
========================= */
router.post(
  "/",
  protect,
  createIdea
);

/* =========================
   Public Ideas
========================= */
router.get(
  "/",
  protect,
  getPublicIdeas
);

/* =========================
   Employee Routes
========================= */
router.get(
  "/my-ideas",
  protect,
  getMyIdeas
);

/* =========================
   Reviewer/Admin Routes
========================= */
router.get(
  "/reviewed",
  protect,
  authorize("Reviewer", "Admin"),
  getReviewedIdeas
);

router.get(
  "/pending",
  protect,
  authorize("Reviewer", "Admin"),
  getPendingIdeas
);

/* =========================
   Single Idea Details
   MUST come after specific
   routes like /my-ideas,
   /reviewed, /pending
========================= */
router.get(
  "/:id",
  protect,
  getIdeaById
);

/* =========================
   Volunteering
========================= */
router.post(
  "/:id/volunteer",
  protect,
  volunteerForIdea
);

router.get(
  "/:id/volunteers",
  protect,
  getIdeaVolunteers
);

/* =========================
   Review Actions
========================= */
router.patch(
  "/:id/approve",
  protect,
  authorize("Reviewer", "Admin"),
  approveIdea
);

router.patch(
  "/:id/reject",
  protect,
  authorize("Reviewer", "Admin"),
  rejectIdea
);

/* =========================
   Delete Idea
========================= */

router.delete(
  "/:id",
  protect,
  deleteIdea
);

module.exports = router;