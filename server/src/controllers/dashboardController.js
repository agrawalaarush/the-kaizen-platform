const dashboardService = require("../services/dashboardService");

const getAdminDashboardStats = async (req, res, next) => {
  try {
    const stats =
      await dashboardService.getAdminDashboardStats();

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    next(error);
  }
};

const getEmployeeDashboard = async (req, res, next) => {
  try {
    const dashboard =
      await dashboardService.getEmployeeDashboard(
        req.user._id
      );

    res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error) {
    next(error);
  }
};

const getReviewerDashboard = async (req, res, next) => {
  try {
    const dashboard =
      await dashboardService.getReviewerDashboard(
        req.user._id
      );

    res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminDashboardStats,
  getEmployeeDashboard,
  getReviewerDashboard,
};