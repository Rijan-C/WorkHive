import Profile from "../models/Profile.js";

const parseArrayField = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return String(value)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
};

const parseObjectField = (value) => {
  if (!value) return {};
  if (typeof value === "object") return value;

  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
};

export const createOrUpdateProfile = async (req, res) => {
  try {
    const {
      bio,
      skills,
      title,
      location,
      profileImage,
      profileImageName,
      socialLinks,
    } = req.body;

    let profile = await Profile.findOne({
      userId: req.user.id,
    });

    const uploadedImage = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/profiles/${req.file.filename}`
      : profileImage || profile?.profileImage || "";

    const profileData = {
      bio,
      skills: parseArrayField(skills),
      title,
      location,
      profileImage: uploadedImage,
      profileImageName: req.file?.originalname || profileImageName || profile?.profileImageName || "",
      socialLinks: parseObjectField(socialLinks),
    };

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { userId: req.user.id },
        profileData,
        { new: true }
      );

      return res.status(200).json(profile);
    }

    profile = await Profile.create({
      userId: req.user.id,
      ...profileData,
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      userId: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      userId: req.params.userId,
    }).populate("userId", "name email");

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
