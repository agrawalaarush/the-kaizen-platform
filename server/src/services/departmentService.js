const Department = require("../models/department");

const createDepartment = async (
  departmentData
) => {
  return await Department.create(
    departmentData
  );
};

const getAllDepartments = async () => {
  return await Department.find({})
    .sort({ name: 1 });
};

module.exports = {
  createDepartment,
  getAllDepartments
};