const express = require("express");

const {
  createCategory,
  getAllCategories
} = require(
  "../controllers/categoryController"
);

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

const {
  authorize
} = require(
  "../middleware/roleMiddleware"
);

const router = express.Router();

router.get(
  "/",
  protect,
  getAllCategories
);

router.post(
  "/",
  protect,
  authorize("Admin"),
  createCategory
);

module.exports = router;