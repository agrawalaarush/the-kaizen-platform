const express = require("express");

const router = express.Router();

const { protect } = require(
  "../middleware/authMiddleware"
);

const {
  addComment,
  getCommentsByIdea,
} = require(
  "../controllers/commentController"
);

router.post(
  "/:id/comments",
  protect,
  addComment
);

router.get(
  "/:id/comments",
  protect,
  getCommentsByIdea
);

module.exports = router;