const Comment = require("../models/Comment");
const Idea = require("../models/idea");

const addComment = async (
  ideaId,
  userId,
  text
) => {
  const idea = await Idea.findById(ideaId);

  if (!idea) {
    throw new Error("Idea not found");
  }

  const comment = await Comment.create({
    idea: ideaId,
    user: userId,
    text,
  });

  return comment;
};

const getCommentsByIdea = async (
  ideaId
) => {
  const idea = await Idea.findById(ideaId);

  if (!idea) {
    throw new Error("Idea not found");
  }

  return Comment.find({
    idea: ideaId,
  })
    .populate("user", "name role")
    .sort({ createdAt: -1 });
};

module.exports = {
  addComment,
  getCommentsByIdea,
};