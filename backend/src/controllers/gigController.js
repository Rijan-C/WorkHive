import Gig from "../models/Gig.js";

export const createGig = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      packages,
      images,
      tags,
    } = req.body;

    const gig = await Gig.create({
      userId: req.user.id, // from auth middleware
      title,
      category,
      description,
      packages,
      images,
      tags,
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


export const getGigs = async (req, res) => {
  try {
    const gigs = await Gig.find()
      .populate("userId", "name rating completedProjects");

    res.json(gigs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
      .populate("userId", "name rating completedProjects skills");

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.json(gig);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};