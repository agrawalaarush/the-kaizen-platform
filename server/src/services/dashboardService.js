const Idea = require("../models/idea");
const Volunteer = require("../models/Volunteer");

const getAdminDashboardStats = async () => {
  const [
    totalIdeas,
    pendingIdeas,
    approvedIdeas,
    implementedIdeas,
    rejectedIdeas,
  ] = await Promise.all([
    Idea.countDocuments(),
    Idea.countDocuments({ status: "Pending Review" }),
    Idea.countDocuments({ status: "Approved" }),
    Idea.countDocuments({ status: "Implemented" }),
    Idea.countDocuments({ status: "Rejected" }),
  ]);

  return {
    totalIdeas,
    pendingIdeas,
    approvedIdeas,
    implementedIdeas,
    rejectedIdeas,
  };
};

const getEmployeeDashboard = async (userId) => {
  const [
    myIdeas,
    approvedIdeas,
    implementedIdeas,
    volunteeredIdeas,
    recentIdeas,
    recentVolunteering,
    allMyIdeas,
  ] = await Promise.all([
    Idea.countDocuments({ submittedBy: userId }),

    Idea.countDocuments({
      submittedBy: userId,
      status: "Approved",
    }),

    Idea.countDocuments({
      submittedBy: userId,
      status: "Implemented",
    }),

    Volunteer.countDocuments({
      user: userId,
    }),

    Idea.find({ submittedBy: userId })
      .sort({ createdAt: -1 })
      .limit(5),

    Volunteer.find({ user: userId })
      .populate("idea")
      .sort({ volunteeredAt: -1 })
      .limit(5),

    Idea.find({ submittedBy: userId }).sort({
      createdAt: 1,
    }),
  ]);

  // -----------------------------
  // Status Distribution
  // -----------------------------

  const statuses = [
    "Pending Review",
    "Approved",
    "Rejected",
    "In Progress",
    "Implemented",
  ];

  const statusCount = {};

  statuses.forEach((status) => {
    statusCount[status] = 0;
  });

  allMyIdeas.forEach((idea) => {
    statusCount[idea.status]++;
  });

  const statusDistribution = statuses
    .map((status) => ({
      name: status,
      value: statusCount[status],
    }))
    .filter((item) => item.value > 0);

  // -----------------------------
  // Daily Cumulative Trend
  // -----------------------------

  const submissionTrend = [];

  let submittedCount = 0;
  let approvedCount = 0;

  allMyIdeas.forEach((idea) => {
    submittedCount++;

    if (
      idea.status === "Approved" ||
      idea.status === "Implemented" ||
      idea.status === "In Progress"
    ) {
      approvedCount++;
    }

    submissionTrend.push({
      date: new Date(idea.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      }),
      submitted: submittedCount,
      approved: approvedCount,
    });
  });

  return {
    stats: {
      myIdeas,
      approvedIdeas,
      implementedIdeas,
      volunteeredIdeas,
    },

    statusDistribution,

    submissionTrend,

    recentIdeas,

    recentVolunteering,
  };
};

const getReviewerDashboard = async (userId) => {
  const [
    pendingIdeas,
    reviewedIdeas,
    approved,
    rejected,
  ] = await Promise.all([
    Idea.find({ status: "Pending Review" })
      .select(
        "title category department status createdAt submittedBy"
      )
      .populate(
        "submittedBy",
        "name department"
      )
      .sort({ createdAt: -1 }),

    Idea.find({
      reviewedBy: userId,
      status: {
        $in: ["Approved", "Rejected"],
      },
    })
      .select(
        "title category department status createdAt reviewedAt reviewComment submittedBy"
      )
      .populate(
        "submittedBy",
        "name department"
      )
      .sort({ reviewedAt: -1 }),

    Idea.countDocuments({
      reviewedBy: userId,
      status: "Approved",
    }),

    Idea.countDocuments({
      reviewedBy: userId,
      status: "Rejected",
    }),
  ]);

  // ---------------------------------
  // Pending Reviews
  // ---------------------------------

  const pendingReviews = pendingIdeas.length;

  // ---------------------------------
  // Average Review Time
  // ---------------------------------

  let averageReviewTime = 0;

  if (reviewedIdeas.length > 0) {
    let totalDays = 0;

    reviewedIdeas.forEach((idea) => {
      const diff =
        new Date(idea.reviewedAt) -
        new Date(idea.createdAt);

      totalDays += diff / (1000 * 60 * 60 * 24);
    });

    averageReviewTime =
      totalDays / reviewedIdeas.length;
  }

  averageReviewTime =
    Number(averageReviewTime.toFixed(1));

  // ---------------------------------
  // Pending Ideas By Category
  // ---------------------------------

  const categoryMap = {};

  pendingIdeas.forEach((idea) => {
    categoryMap[idea.category] =
      (categoryMap[idea.category] || 0) + 1;
  });

  const categoryDistribution =
    Object.entries(categoryMap).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

  // ---------------------------------
  // Daily Review Activity
  // ---------------------------------

  const activityMap = {};

  reviewedIdeas.forEach((idea) => {
    const date =
      new Date(
        idea.reviewedAt
      ).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });

    if (!activityMap[date]) {
      activityMap[date] = {
        date,
        approved: 0,
        rejected: 0,
      };
    }

    if (idea.status === "Approved") {
      activityMap[date].approved++;
    }

    if (idea.status === "Rejected") {
      activityMap[date].rejected++;
    }
  });

  const reviewActivity =
    Object.values(activityMap);

  return {
    stats: {
      pendingReviews,
      approved,
      rejected,
      averageReviewTime,
    },

    categoryDistribution,

    reviewActivity,

    pendingIdeas: pendingIdeas.slice(0, 5),

    recentReviews:
      reviewedIdeas.slice(0, 5),
  };
};

module.exports = {
  getAdminDashboardStats,
  getEmployeeDashboard,
  getReviewerDashboard,
};