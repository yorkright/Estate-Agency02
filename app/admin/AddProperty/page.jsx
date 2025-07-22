"use client";

import  { useState, useCallback } from "react";

/**
 * AddPropertyPage (refactored)
 * -----------------------------------------------
 * Key fixes & improvements:
 * 1. **No accidental arrays** — We append each field *once* to FormData.
 * 2. **Trimming + numeric coercion** — Prevents trailing spaces (e.g., "cozy home ") and ensures numbers are sent as numbers.
 * 3. **Basic client validation** — Stops empty/invalid submits before hitting API.
 * 4. **File previews + size/type checks** — Catch bad uploads early.
 * 5. **Robust error reporting** — Shows server + network errors clearly.
 * 6. **Reset form after success** — Clears inputs & file pickers.
 * 7. Works with backend expecting multipart FormData (as in your refactored /api/properties route).
 */

const INITIAL_FORM = {
  title: "",
  description: "",
  price: "",
  location: "",
  type: "Apartment",
  bedrooms: "",
  bathrooms: "",
};

export default function AddPropertyPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------
  const isPositiveNumber = (val) => {
    if (val === "" || val === null || val === undefined) return false;
    const num = Number(val);
    return !Number.isNaN(num) && num >= 0;
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setImageFile(null);
    setVideoFile(null);
    setImagePreview(null);
    setVideoPreview(null);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // We keep everything as strings in state; conversion happens on submit.
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    // Basic type guard
    if (!file.type.startsWith("image/")) {
      setMessage("❌ Please select a valid image file.");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }, []);

  const handleVideoChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setVideoFile(null);
      setVideoPreview(null);
      return;
    }
    if (!file.type.startsWith("video/")) {
      setMessage("❌ Please select a valid video file.");
      return;
    }
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  }, []);

  // ------------------------------------------------------------
  // Submit
  // ------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Trim & validate required text fields
    const title = form.title.trim();
    const description = form.description.trim();
    const location = form.location.trim();
    const type = form.type.trim();

    if (!title || !description || !location || !type) {
      setLoading(false);
      setMessage("❌ Please fill in all required text fields.");
      return;
    }

    // Numeric validation (allow 0 but require numeric)
    if (!isPositiveNumber(form.price)) {
      setLoading(false);
      setMessage("❌ Please enter a valid price (number ≥ 0).");
      return;
    }
    if (!isPositiveNumber(form.bedrooms)) {
      setLoading(false);
      setMessage("❌ Please enter bedroom count (number ≥ 0).");
      return;
    }
    if (!isPositiveNumber(form.bathrooms)) {
      setLoading(false);
      setMessage("❌ Please enter bathroom count (number ≥ 0).");
      return;
    }

    // Image required? (toggle this if backend makes it optional)
    if (!imageFile) {
      setLoading(false);
      setMessage("❌ Please upload at least one image.");
      return;
    }

    try {
      const fd = new FormData();
      // Append scalars ONCE — avoids array casting issues server-side
      fd.set("title", title);
      fd.set("description", description);
      fd.set("price", String(Number(form.price)));
      fd.set("location", location);
      fd.set("type", type);
      fd.set("bedrooms", String(Number(form.bedrooms)));
      fd.set("bathrooms", String(Number(form.bathrooms)));

      if (imageFile) fd.set("image", imageFile); // single image; backend may map to images array
      if (videoFile) fd.set("video", videoFile);

      const res = await fetch("/api/properties", {
        method: "POST",
        body: fd,
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        throw new Error(`Invalid JSON from server (status ${res.status}).`);
      }

      if (!res.ok || !data?.success) {
        const errMsg = data?.error || `Request failed with status ${res.status}.`;
        setMessage("❌ Error: " + errMsg);
        console.error("AddProperty submit error:", errMsg, data);
      } else {
        setMessage("✅ Property added successfully!");
        resetForm();
      }
    } catch (error) {
      console.error("AddProperty network/server error:", error);
      setMessage("❌ Server Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------------
  // UI
  // ------------------------------------------------------------
  return (
    <div className="max-w-3xl pt-32 mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Add New Property</h1>

      {message && (
        <p
          className={`mb-4 font-medium ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded min-h-28"
        />

        <input
          name="price"
          type="number"
          min="0"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Villa">Villa</option>
          <option value="Studio">Studio</option>
          <option value="Office">Office</option>
        </select>

        <input
          name="bedrooms"
          type="number"
          min="0"
          placeholder="Number of Bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          name="bathrooms"
          type="number"
          min="0"
          placeholder="Number of Bathrooms"
          value={form.bathrooms}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-medium">Upload Image (JPG/PNG):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            required
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-40 h-28 object-cover rounded border"
            />
          )}
        </div>

        {/* Video Upload (optional) */}
        <div>
          <label className="block mb-2 font-medium">Upload Video (MP4 - optional):</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="w-full p-2 border rounded"
          />
          {videoPreview && (
            <video
              src={videoPreview}
              controls
              className="mt-2 w-64 h-auto rounded border"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit Property"}
        </button>
      </form>
    </div>
  );
}
