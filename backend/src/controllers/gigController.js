import Gig from "../models/Gig.js";

export const createGig = async (req, res) => {
  try {
    const { title, category, description, packages, tags } = req.body;

    const parsedPackages = typeof packages === "string" ? JSON.parse(packages) : packages;
    const parsedTags = typeof tags === "string"
      ? tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : tags || [];

    const uploadedImages = Array.isArray(req.files)
      ? req.files.map((file) => `/uploads/gigs/${file.filename}`)
      : [];

    const gig = await Gig.create({
      userId: req.user._id, // from auth middleware
      title,
      category,
      description,
      packages: parsedPackages,
      images: uploadedImages,
      tags: parsedTags,
    });

    res.status(201).json({
      success: true,
      gig,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: gigs.length,
      gigs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find().populate(
      "userId",
      "name rating completedProjects",
    );

    res.status(200).json({
      success: true,
      count: gigs.length,
      gigs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate(
      "userId",
      "name rating completedProjects skills bio",
    );

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    res.status(200).json({
      success: true,
      gig,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateGig = async (req, res) => {
  try {
    let gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    // only owner can update
    if (gig.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    gig = await Gig.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({
      success: true,
      gig,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    if (gig.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await gig.deleteOne();

    res.status(200).json({
      success: true,
      message: "Gig deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
