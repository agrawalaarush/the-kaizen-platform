const commentService = require(
  "../services/commentService"
);

const addComment = async (
  req,
  res,
  next
) => {
  try {
    const comment =
      await commentService.addComment(
        req.params.id,
        req.user.id,
        req.body.text
      );

    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    next(error);
  }
};

const getCommentsByIdea = async (
  req,
  res,
  next
) => {
  try {
    const comments =
      await commentService.getCommentsByIdea(
        req.params.id
      );

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addComment,
  getCommentsByIdea,
};