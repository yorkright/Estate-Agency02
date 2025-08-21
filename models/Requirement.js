// lib/models/Requirement.js
import mongoose from "mongoose";

const RequirementSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    propertyType: { type: String, required: true },
    budget: { type: String },
    location: { type: String },
    message: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "requirements" }
);

export default mongoose.models.Requirement ||
  mongoose.model("Requirement", RequirementSchema);
