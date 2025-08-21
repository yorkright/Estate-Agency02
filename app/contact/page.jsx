"use client";
import { useState } from "react";

export default function RequirementPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    budget: "",
    location: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Submitting...");
    try {
      const res = await fetch("/api/requirement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Requirement submitted successfully. Our Agent will contact you within 24hrs ⏱");
        setForm({
          name: "",
          email: "",
          phone: "",
          propertyType: "",
          budget: "",
          location: "",
          message: "",
        });
      } else {
        setStatus("❌ " + data.error);
      }
    } catch (error) {
      setStatus("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 mt-20 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Submit Your Requirement
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Fields */}
        {[
          { label: "Full Name", type: "text", name: "name", required: true },
          { label: "Email Address", type: "email", name: "email", required: true },
          { label: "Phone Number", type: "tel", name: "phone" },
          { label: "Budget", type: "text", name: "budget" },
          { label: "Preferred Location", type: "text", name: "location" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              required={field.required}
              className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-4 py-2 shadow-sm transition"
            />
          </div>
        ))}

        {/* Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Type <span className="text-red-500">*</span>
          </label>
          <select
            name="propertyType"
            value={form.propertyType}
            onChange={handleChange}
            required
            className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-4 py-2 shadow-sm transition"
          >
            <option value="">Select Property Type</option>
            <option value="land">Land</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Details
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            placeholder="Describe your requirements..."
            className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-4 py-2 shadow-sm transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading && <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>}
          {loading ? "Submitting..." : "Submit Requirement"}
        </button>
      </form>

      {/* Status Message */}
      {status && (
        <div
          className={`mt-6 text-center px-4 py-3 rounded-md ${
            status.startsWith("✅")
              ? "bg-green-100 text-green-700 border border-green-300"
              : status.startsWith("❌")
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-yellow-100 text-yellow-700 border border-yellow-300"
          }`}
        >
          {status}
        </div>
      )}
    </div>
  );
}
