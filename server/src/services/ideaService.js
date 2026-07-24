const Idea = require("../models/idea");
const Volunteer = require("../models/Volunteer");
const Comment = require("../models/Comment");

const createIdea = async (ideaData) => {
  return await Idea.create(ideaData);
};

const getMyIdeas = async (userId) => {
  return await Idea.find({
    submittedBy: userId,
  }).sort({
    createdAt: -1,
  });
};

const getPublicIdeas = async () => {
  return await Idea.find({
    status: {
      $in: [
        "Approved",
        "In Progress",
        "Implemented",
      ],
    },
  })
    .populate(
      "submittedBy",
      "name department"
    )
    .sort({
      createdAt: -1,
    });
};

const getIdeaById = async (ideaId) => {
  return await Idea.findById(ideaId)
    .populate(
      "submittedBy",
      "_id name email department"
    )
    .populate(
      "reviewedBy",
      "name email"
    );
};

const getPendingIdeas = async () => {
  return await Idea.find({
    status: "Pending Review",
  })
    .populate(
      "submittedBy",
      "_id name email department"
    )
    .sort({
      createdAt: -1,
    });
};

const getReviewedIdeas = async (reviewerId) => {
  return await Idea.find({
    reviewedBy: reviewerId,
  })
    .populate(
      "submittedBy",
      "name department"
    )
    .sort({
      reviewedAt: -1,
    });
};

const updateIdeaStatus = async (
  ideaId,
  status,
  reviewerId,
  reviewComment
) => {
  if (!reviewComment?.trim()) {
    throw new Error(
      "Review comment is required"
    );
  }

  const idea = await Idea.findById(ideaId);

  if (!idea) {
    throw new Error("Idea not found");
  }

  idea.status = status;
  idea.reviewedBy = reviewerId;
  idea.reviewedAt = new Date();
  idea.reviewComment = reviewComment.trim();

  await idea.save();

  return await Idea.findById(ideaId)
    .populate(
      "submittedBy",
      "name department"
    )
    .populate(
      "reviewedBy",
      "name email"
    );
};

const deleteIdea = async (ideaId, user) => {
  const idea = await Idea.findById(ideaId);

  if (!idea) {
    throw new Error("Idea not found");
  }

  // Only Admin, Reviewer, or the owner can delete
  if (
    user.role !== "Admin" &&
    user.role !== "Reviewer" &&
    idea.submittedBy.toString() !== user._id.toString()
  ) {
    throw new Error(
      "You are not authorized to delete this idea"
    );
  }

  // Delete all comments related to the idea
  await Comment.deleteMany({
    idea: ideaId,
  });

  // Delete all volunteer records related to the idea
  await Volunteer.deleteMany({
    idea: ideaId,
  });

  // Delete the idea
  await Idea.findByIdAndDelete(ideaId);
};

module.exports = {
  createIdea,
  getMyIdeas,
  getPublicIdeas,
  getIdeaById,
  getPendingIdeas,
  updateIdeaStatus,
  getReviewedIdeas,
  deleteIdea,
};