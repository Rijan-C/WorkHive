import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    title: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    skills: {
      type: [String],
      default: [],
    },

    profileImage: {
      type: String,
      trim: true,
      default: "",
    },

    profileImageName: {
      type: String,
      trim: true,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    socialLinks: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { timestamps: true },
);

export default mongoose.model("Profile", profileSchema);
