import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // e.g. "Basic", "Standard", "Premium"
  },

  price: {
    type: Number,
    required: true,
  },

  deliveryTime: {
    type: Number, // in days
    required: true,
  },

  shortDescription: {
    type: String,
    required: true,
    maxlength: 120,
  }
  
});


const gigSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    packages: [packageSchema],

    images: {
      type: [String],
      default: [],
    },

    tags: {
      type: [String],
      default: [],
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalSales: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Gig", gigSchema);
