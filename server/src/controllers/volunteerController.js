const volunteerService = require("../services/volunteerService");

const volunteerForIdea = async (req, res, next) => {
  try {
    const volunteer =
  await volunteerService.volunteerForIdea(
    req.params.id,
    req.user.id,
    req.user.role
  );

    res.status(201).json({
      success: true,
      volunteer,
    });
  } catch (error) {
    next(error);
  }
};

const getMyVolunteering = async (req, res, next) => {
  try {
    const volunteering = await volunteerService.getMyVolunteering(
      req.user.id
    );

    res.status(200).json({
      success: true,
      volunteering,
    });
  } catch (error) {
    next(error);
  }
};

const updateVolunteerProgress = async (
  req,
  res,
  next
) => {
  try {
    const volunteer =
      await volunteerService.updateVolunteerProgress(
        req.params.id,
        req.body.progress,
        req.user.id
      );

    res.status(200).json({
      success: true,
      volunteer,
    });
  } catch (error) {
    next(error);
  }
};

const getIdeaVolunteers = async (
  req,
  res,
  next
) => {
  try {
    const volunteers =
      await volunteerService.getIdeaVolunteers(
        req.params.id
      );

    res.status(200).json({
      success: true,
      volunteers,
      count: volunteers.length,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  volunteerForIdea,
  getMyVolunteering,
  updateVolunteerProgress,
  getIdeaVolunteers,
};