const mongoose = require("mongoose");

const Idea = mongoose.models.Idea ||
  require("../models/idea");
const getAnalytics = async (req, res) => {
  try {
    const totalIdeas =
      await Idea.countDocuments();

    const approvedIdeas =
      await Idea.countDocuments({
        status: "Approved",
      });

    const rejectedIdeas =
      await Idea.countDocuments({
        status: "Rejected",
      });

    const pendingIdeas =
      await Idea.countDocuments({
        status: "Pending Review",
      });

    const approvalRate =
      totalIdeas === 0
        ? 0
        : (
            (approvedIdeas / totalIdeas) *
            100
          ).toFixed(2);

    const ideasByCategory =
      await Idea.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
      ]);

    const ideasByDepartment =
      await Idea.aggregate([
        {
          $group: {
            _id: "$department",
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
      ]);

    res.status(200).json({
      success: true,
      stats: {
        totalIdeas,
        approvedIdeas,
        rejectedIdeas,
        pendingIdeas,
        approvalRate,
        ideasByCategory,
        ideasByDepartment,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAnalytics,
};