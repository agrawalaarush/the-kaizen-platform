const userService = require("../services/userService");
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const allowedRoles = [
      "Employee",
      "Reviewer",
      "Admin"
    ];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role"
      });
    }
    // Prevent admin from removing their own admin role
    if (
      req.user._id.toString() === req.params.id &&
      role !== "Admin"
    ) {
      return res.status(400).json({
        success: false,
        message: "You cannot remove your own Admin role"
      });
    }
    const user = await userService.updateUserRole(
      req.params.id,
      role
    );

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateUserDepartment = async (
  req,
  res
) => {
  try {
    const { department } = req.body;

    const user =
      await userService.updateUserDepartment(
        req.params.id,
        department
      );

    res.status(200).json({
      success: true,
      message:
        "Department updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserStatus = async (
  req,
  res
) => {
  try {
    const { isActive } = req.body;

    if (
      req.user._id.toString() ===
        req.params.id &&
      isActive === false
    ) {
      return res.status(400).json({
        success: false,
        message:
          "You cannot deactivate your own account",
      });
    }

    const user =
      await userService.updateUserStatus(
        req.params.id,
        isActive
      );

    res.status(200).json({
      success: true,
      message:
        "User status updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  updateUserDepartment,
  updateUserStatus,
};