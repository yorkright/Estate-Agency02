"use client";
import { lazy, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// data
const home = [
  {
    slug: "1",
    title: "Beautiful Family Home",
    imageUrl: "/property1.jpg",
    address: "Outer ring road Near Purvanchal highway",
    city: "Lucknow",
    state: "Uttar Pradesh",
    zip: "203411",
    country: "INDIA",
    price:'3,50,00,000 cr',
    category: "Villa",
  },
  {
    slug: "2",
    title: "Cozy Modern Home",
    imageUrl: "/property3.jpg",
    address: "Outer ring road Near Purvanchal highway",
    city: "Lucknow",
    state: "Uttar Pradesh",
    zip: "203411",
    country: "USA",
    segment:"fully furnished",
    price:'2,50,00,000 cr',
    category: "Home",
  },
  {
    slug: "3",
    title: "Cozy Modern Home",
    imageUrl: "/property2.jpg",
    address: "Sector 21, Dwarka",
    city: "New Delhi",
    state: "Delhi",
    zip: "110075",
    country: "India",
    price: "₹95 Lakhs",
    segment:"fully furnished",
    category: "Home"
  },
  {
    slug: "4",
    title: "Luxury Sea-Facing Villa",
    imageUrl: "/property5.jpg",
    address: "Palolem Beach Road",
    city: "Canacona",
    state: "Goa",
    zip: "403702",
    country: "India",
    price: "₹4.2 Cr",
    category: "Villa"
  },
  {
    slug: "5",
    title: "Premium City Flat",
    imageUrl: "/property4.jpg",
    address: "Linking Road, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    zip: "400050",
    country: "India",
    price: "₹90 Lakhs",
    segment:"fully furnished",
    category: "Home"
  },
  {
    slug: "6",
    title: "Affordable Family Home",
    imageUrl: "/h3.jpg",
    address: "Ajmer Road, Vaishali Nagar",
    city: "Jaipur",
    state: "Rajasthan",
    zip: "302021",
    country: "India",
    price: "₹65 Lakhs",
    segment:"fully furnished",
    category: "Home"
  },
  {
    slug: "7",
    title: "Modern Residence",
    imageUrl: "/h4.jpg",
    address: "Magarpatta City, Hadapsar",
    city: "Pune",
    state: "Maharashtra",
    zip: "411028",
    country: "India",
    price: "₹1.2 Cr",
    segment:"fully furnished",
    category: "Villa"
  },

  {
    slug: "8",
    title: "Modern Residential Flat",
    imageUrl: "/flate.jpg",
    address: "Magarpatta City, Hadapsar",
    city: "Pune",
    state: "Maharashtra",
    zip: "411028",
    country: "India",
    price: "₹1.2 Cr",
    segment:"fully furnished",
    category: "Flate"
  }


];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? home
      : home.filter((post) => post.category === selectedCategory);

  return (
    <div onLoad={lazy} className="min-h-screen py-8 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
     <br /><br /><br /> <br /><br /><br />

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 justify-center flex-wrap">
          {["All", "Villa", "Home", "Flate"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-black font-light rounded-xl px-5 py-2 transition-colors ${
                selectedCategory === category
                  ? "bg-green-700 text-white"
                  : "bg-green-300 hover:bg-green-700 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts */}
        <div className="space-y-10">
          {filteredPosts.map((homes) => (
            <div
              key={homes.slug}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative w-full h-64">
                <Image
                  src={homes.imageUrl || "/fallback.jpg"}
                  alt={homes.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {homes.title}
                </h2>
                <div className="text-gray-700 space-y-1">
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {homes.address}
                  </p>
                  <p>
                    <span className="font-semibold">City:</span> {homes.city}
                  </p>
                  <p>
                    <span className="font-semibold">State:</span> {homes.state}
                  </p>
                  <p>
                    <span className="font-semibold">Zip Code:</span>{" "}
                    {homes.zip}
                  </p>
                  <p>
                    <span className="font-semibold">Country:</span>{" "}
                    {homes.country}
                  </p>
                  <p className="text-green-700">
                    <span className="font-bold ">Country:
                    {homes.price}  <br />
                    {homes.segment}
                    </span>
                  </p>
                </div>
                <Link
                  href={`/blog/${homes.slug}`}
                  className="text-blue-500 hover:underline mt-4 block"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}