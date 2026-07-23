const ideaService = require("../services/ideaService");

const createIdea = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      department,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !department
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const idea =
      await ideaService.createIdea({
        title,
        description,
        category,
        department,
        submittedBy: req.user._id,
      });

    res.status(201).json({
      success: true,
      message:
        "Idea submitted successfully",
      idea,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyIdeas = async (req, res) => {
  try {
    const ideas =
      await ideaService.getMyIdeas(
        req.user._id
      );

    res.status(200).json({
      success: true,
      count: ideas.length,
      ideas,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPublicIdeas = async (
  req,
  res
) => {
  try {
    const ideas =
      await ideaService.getPublicIdeas();

    res.status(200).json({
      success: true,
      count: ideas.length,
      ideas,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getIdeaById = async (
  req,
  res
) => {
  try {
    const idea =
      await ideaService.getIdeaById(
        req.params.id
      );

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    res.status(200).json({
      success: true,
      idea,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPendingIdeas = async (
  req,
  res
) => {
  try {
    const ideas =
      await ideaService.getPendingIdeas();

    res.status(200).json({
      success: true,
      count: ideas.length,
      ideas,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const approveIdea = async (
  req,
  res
) => {
  try {
    const { reviewComment } =
      req.body;

    const idea =
      await ideaService.updateIdeaStatus(
        req.params.id,
        "Approved",
        req.user._id,
        reviewComment
      );

    res.status(200).json({
      success: true,
      message:
        "Idea approved successfully",
      idea,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const rejectIdea = async (
  req,
  res
) => {
  try {
    const { reviewComment } =
      req.body;

    const idea =
      await ideaService.updateIdeaStatus(
        req.params.id,
        "Rejected",
        req.user._id,
        reviewComment
      );

    res.status(200).json({
      success: true,
      message:
        "Idea rejected successfully",
      idea,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getReviewedIdeas = async (
  req,
  res
) => {
  try {
    const ideas =
      await ideaService.getReviewedIdeas(
        req.user._id
      );

    res.status(200).json({
      success: true,
      count: ideas.length,
      ideas,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteIdea = async (req, res) => {
  try {
    await ideaService.deleteIdea(
      req.params.id,
      req.user
    );

    res.status(200).json({
      success: true,
      message: "Idea deleted successfully",
    });
  } catch (error) {
    console.error(error);

    if (
      error.message === "Idea not found"
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message ===
      "You are not authorized to delete this idea"
    ) {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createIdea,
  getMyIdeas,
  getPublicIdeas,
  getIdeaById,
  getPendingIdeas,
  approveIdea,
  rejectIdea,
  getReviewedIdeas,
  deleteIdea,
};