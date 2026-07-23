const express = require("express");

const {
  getAllUsers,
  updateUserRole,
  updateUserDepartment,
  updateUserStatus,
} = require("../controllers/userController");

const {
  protect
} = require("../middleware/authMiddleware");

const {
  authorize
} = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/",
  protect,
  authorize("Admin"),
  getAllUsers
);

router.patch(
  "/:id/role",
  protect,
  authorize("Admin"),
  updateUserRole
);

router.patch(
  "/:id/department",
  protect,
  authorize("Admin"),
  updateUserDepartment
);

router.patch(
  "/:id/status",
  protect,
  authorize("Admin"),
  updateUserStatus
);

module.exports = router;