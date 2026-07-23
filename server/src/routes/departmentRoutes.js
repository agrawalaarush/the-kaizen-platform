const express = require("express");

const {
  createDepartment,
  getAllDepartments
} = require(
  "../controllers/departmentController"
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
  getAllDepartments
);

router.post(
  "/",
  protect,
  authorize("Admin"),
  createDepartment
);

module.exports = router;