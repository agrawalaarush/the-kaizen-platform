const User = require("../models/User");

const getAllUsers = async () => {
  return await User.find({})
    .select("-passwordHash")
    .sort({
      createdAt: -1
    });
};

const updateUserRole = async (
  userId,
  role
) => {
  return await User.findByIdAndUpdate(
    userId,
    { role },
    { returnDocument: "after" }
  ).select("-passwordHash");
};

const updateUserDepartment = async (
  userId,
  department
) => {
  return await User.findByIdAndUpdate(
    userId,
    { department },
    { returnDocument: "after" }
  ).select("-passwordHash");
};
const updateUserStatus = async (
  userId,
  isActive
) => {
  return await User.findByIdAndUpdate(
    userId,
    { isActive },
    { returnDocument: "after" }
  ).select("-passwordHash");
};

module.exports = {
  getAllUsers,
  updateUserRole,
  updateUserDepartment,
  updateUserStatus,
};