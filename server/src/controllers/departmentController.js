const departmentService = require(
  "../services/departmentService"
);

const createDepartment = async (
  req,
  res
) => {

  console.log("BODY:", req.body);

  try {
    const department =
      await departmentService.createDepartment(
        req.body
      );

    res.status(201).json({
      success: true,
      department
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllDepartments = async (
  req,
  res
) => {
  try {
    const departments =
      await departmentService.getAllDepartments();

    res.status(200).json({
      success: true,
      count: departments.length,
      departments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createDepartment,
  getAllDepartments
};