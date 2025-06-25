"use client";

import React, { useState } from "react";

const AddPropertyPage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    type: "Apartment", // default selection
    bedrooms: "",
    bathrooms: "",
    images: [""], // start with one empty image field
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm({ ...form, images: newImages });
  };

  const addImageField = () => {
    setForm({ ...form, images: [...form.images, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          bedrooms: Number(form.bedrooms),
          bathrooms: Number(form.bathrooms),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✅ Property added successfully!");
        setForm({
          title: "",
          description: "",
          price: "",
          location: "",
          type: "Apartment",
          bedrooms: "",
          bathrooms: "",
          images: [""],
        });
      } else {
        setMessage("❌ Error: " + data.error);
      }
    } catch (error) {
      setMessage("❌ Server Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="max-w-3xl pt-32  mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Add New Property</h1>

      {message && (
        <p className={`mb-4 font-medium ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
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
          className="w-full p-2 border rounded"
        />

        <input
          name="price"
          type="number"
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
          <option>Apartment</option>
          <option>House</option>
          <option>Villa</option>
          <option>Studio</option>
          <option>Office</option>
        </select>

        <input
          name="bedrooms"
          type="number"
          placeholder="Number of Bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          name="bathrooms"
          type="number"
          placeholder="Number of Bathrooms"
          value={form.bathrooms}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <div>
          <label className="block mb-2 font-medium">Image URLs:</label>
          {form.images.map((img, index) => (
            <input
              key={index}
              value={img}
              placeholder={`Image URL ${index + 1}`}
              onChange={(e) => handleImageChange(index, e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="text-blue-600 hover:underline text-sm"
          >
            + Add another image
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
        >
          {loading ? "Submitting..." : "Submit Property"}
        </button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
