const Volunteer = require("../models/Volunteer");
const Idea = require("../models/idea");

const volunteerForIdea = async (
  ideaId,
  userId,
  role
) => {  const idea = await Idea.findById(ideaId);

  if (role === "Admin") {
  throw new Error(
    "Administrators cannot volunteer for ideas"
  );
}
  if (!idea) {
    throw new Error("Idea not found");
  }

  if (idea.status !== "Approved") {
    throw new Error("You can only volunteer for approved ideas");
  }

  const existingVolunteer = await Volunteer.findOne({
    user: userId,
    idea: ideaId,
  });

  if (existingVolunteer) {
    throw new Error("You have already volunteered for this idea");
  }

  const volunteer = await Volunteer.create({
    user: userId,
    idea: ideaId,
  });

  return volunteer;
};

const getIdeaVolunteers = async (ideaId) => {
  return Volunteer.find({ idea: ideaId })
    .populate("user", "name email");
};

const getMyVolunteering = async (userId) => {
  const volunteers = await Volunteer.find({
    user: userId,
  })
    .populate("idea")
    .populate("user", "name email department");

  // Remove orphan volunteer records whose idea no longer exists
  return volunteers.filter(
    (volunteer) => volunteer.idea !== null
  );
};

const updateVolunteerProgress = async (
  volunteerId,
  progress,
  userId
) => {
  const volunteer = await Volunteer.findById(volunteerId);

  if (!volunteer) {
    throw new Error("Volunteer record not found");
  }

  if (volunteer.user.toString() !== userId.toString()) {
    throw new Error(
      "You can only update your own volunteering records"
    );
  }

  volunteer.progress = progress;

  if (progress === 100) {
    volunteer.status = "Completed";
  }

  await volunteer.save();

  return volunteer;
};

module.exports = {
  volunteerForIdea,
  getMyVolunteering,
  updateVolunteerProgress,
  getIdeaVolunteers,
};