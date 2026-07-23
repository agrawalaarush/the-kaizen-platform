const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true
    },

    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    reviewedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null
},

reviewedAt: {
  type: Date,
  default: null
},

reviewComment: {
  type: String,
  default: ""
},

    status: {
      type: String,
      enum: [
        "Pending Review",
        "Approved",
        "Rejected",
        "In Progress",
        "Implemented"
      ],
      default: "Pending Review"
    },

    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Idea", ideaSchema);