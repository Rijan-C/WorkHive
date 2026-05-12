import Gig from "../models/Gig.js";

export const createGig = async (req, res) => {
  try {
    const gig = await Gig.create({
      userId: req.user.id, // from auth middleware
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      packages: req.body.packages,
      images: req.body.images,
      tags: req.body.tags,
    });

    res.status(201).json(gig);
  } catch (err) {
    res.status(500).json({ message: err.message });
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