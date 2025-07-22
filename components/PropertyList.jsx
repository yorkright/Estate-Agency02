"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");  // ✅ Properly defined error state

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/properties");
        if (!res.ok) throw new Error("Failed to fetch properties.");
        const data = await res.json();

        if (data.success) {
          setProperties(data.properties);  // ✅ Matches API response
        } else {
          setError(data.error || "Failed to fetch properties.");
        }
      } catch (err) {
        setError("Network error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Loading state
  if (loading) return <p className="text-center mt-10">Loading properties...</p>;

  // Error state
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  // No properties found
  if (properties.length === 0)
    return <p className="text-center mt-10">No properties available.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-gray-50">
      {properties.map((p) => (
        <div
          key={p._id}
          className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
        >
          <img
            src={p.image}
            alt={p.title}
            className="h-48 w-full object-cover"
          />
          <div className="p-5 flex-1 flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-1">{p.title}</h2>
            <p className="text-gray-500 mb-2">{p.location}</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-600 font-semibold text-lg">
                ${p.price.toLocaleString()}
              </span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                {p.bedrooms} Beds • {p.bathrooms} Baths
              </span>
            </div>
            <Link
              href={`/properties/${p._id}`}
              className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
