// models/Property.js
import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Property title is required"],
    },
    description: {
      type: String,
      required: [true, "Property description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    type: {
      type: String,
      enum: ["Apartment", "House", "Villa", "Studio", "Office"],
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },

    image: {
      type: String, // Single image file path or URL
      required: [true, "Property image is required"],
    },

    video: {
      type: String, // Optional video file path or URL
      default: "",  // Empty by default if no video uploaded
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in dev
export default mongoose.models.Property || mongoose.model("Property", PropertySchema);
