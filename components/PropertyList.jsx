"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null); // renamed to avoid conflicts

  useEffect(() => {
    let cancelled = false; // avoid state updates after unmount

    async function fetchProperties() {
      try {
        const res = await fetch("/api/properties", { method: "GET" });

        if (!res.ok) {
          throw new Error(`Failed to fetch properties. HTTP ${res.status}`);
        }

        const data = await res.json();

        if (cancelled) return;

        if (data?.success && Array.isArray(data.properties)) {
          setProperties(data.properties);
        } else {
          setErrorMsg(data?.error || "Failed to fetch properties.");
        }
      } catch (err) {
        if (cancelled) return;
        setErrorMsg(
          "Network error: " + (err instanceof Error ? err.message : String(err))
        );
      } finally {
        if (cancelled) return;
        setLoading(false);
      }
    }

    fetchProperties();

    return () => {
      cancelled = true;
    };
  }, []);

  // Loading state
  if (loading) {
    return <p className="text-center mt-10">Loading properties...</p>;
  }

  // Error state
  if (errorMsg) {
    return <p className="text-red-500 text-center mt-10">{errorMsg}</p>;
  }

  // No properties found
  if (!properties || properties.length === 0) {
    return <p className="text-center mt-10">No properties available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-gray-50">
      {properties.map((p) => {
        const {
          _id,
          title = "Untitled Property",
          location = "Unknown location",
          price,
          bedrooms,
          bathrooms,
          image,
        } = p || {};

        // Fallback price formatting (handles string or undefined)
        const displayPrice =
          typeof price === "number"
            ? price.toLocaleString()
            : Number(price ?? 0).toLocaleString();

        return (
          <div
            key={_id}
            className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <img
              src={image || "/placeholder-property.jpg"}
              alt={title}
              className="h-48 w-full object-cover"
            />
            <div className="p-5 flex-1 flex flex-col">
              <h2 className="text-xl font-bold text-gray-800 mb-1">{title}</h2>
              <p className="text-gray-500 mb-2">{location}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-600 font-semibold text-lg">
                  ${displayPrice}
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                  {bedrooms ?? "?"} Beds • {bathrooms ?? "?"} Baths
                </span>
              </div>
              <Link
                href={`/properties/${_id}`}
                className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
