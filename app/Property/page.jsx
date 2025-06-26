"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBath, FaBed } from "react-icons/fa";
import { LuRuler } from "react-icons/lu";
import PropertyItems from "../../components/PropertyItem"; // ✅ CORRECT IMPORT

const HomesForYou = () => {
  // const [menu, setmenu] = useState("All");
  const [properties, setProperties] = useState([]);

  const fetchproperty = async () => {
    try {
      const response = await axios.get("/api/properties");
      setProperties(response.data.properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchproperty();
  }, []); // ✅ added dependency array

  const mockData = [
    {
      id: 1,
      image: "/h1.jpg",
      title: "Skyper Pool Apartment",
      address: "1020 Bloomingdale Ave",
      price: "$280,000",
      status: "FOR SALE",
      beds: 4,
      baths: 2,
      sqft: 450,
    },
    {
      id: 2,
      image: "/h2.jpg",
      title: "North Dillard Street",
      address: "4330 Bell Shoals Rd",
      price: "$250/month",
      status: "FOR RENT",
      beds: 4,
      baths: 2,
      sqft: 400,
    },
    {
      id: 3,
      image: "/h4.jpg",
      title: "Eaton Garth Penthouse",
      address: "7722 18th Ave, Brooklyn",
      price: "$180,000",
      status: "FOR SALE",
      tag: "FEATURED",
      beds: 4,
      baths: 2,
      sqft: 450,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-blue-200 flex items-center justify-center py-12 pt-32 px-4">
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('https://media.istockphoto.com/id/1292569664/photo/3d-rendering-of-modern-house-in-luxurious-style-in-night.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="w-full max-w-5xl rounded-3xl shadow-2xl flex flex-col items-center justify-center p-10 md:p-20 border border-white/20 backdrop-blur-lg"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold font-serif text-white drop-shadow-2xl mb-6 text-center">
            Make Your Dream Home a Reality
          </h1>
          <h3 className="text-2xl md:text-3xl text-indigo-200 font-semibold font-sans mb-4 text-center">
            Explore Exclusive Property Listings
          </h3>
          <p className="text-lg md:text-xl font-serif max-w-2xl bg-white/80 text-gray-900 p-6 rounded-xl shadow-lg mb-4 text-center">
            Discover a curated selection of beautiful homes and investment
            opportunities. Whether you’re searching for a cozy family house, a
            modern apartment, or a luxurious villa, we help you find the perfect
            property to match your dreams and lifestyle.
          </p>
          <a
            href="#"
            className="mt-6 inline-block bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
          >
            Browse Properties
          </a>
        </div>
      </div>

      {/* Homes For You Section */}
      <div className="bg-[#f8fafc] py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800">Homes For You</h2>
          <p className="text-gray-500 mt-2">Based on your view history</p>
        </div>

        {/* Static Homes (mock) */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {mockData.map((home) => (
            <div
              key={home.id}
              className="bg-white rounded-xl shadow-md w-[300px] overflow-hidden border hover:shadow-lg transition"
            >
              <div className="relative">
                <img
                  src={home.image}
                  alt={home.title}
                  className="w-full h-52 object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {home.status}
                  </span>
                  {home.tag && (
                    <span className="bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-1 rounded">
                      {home.tag}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-md font-semibold text-gray-800">
                  {home.title}
                </h3>
                <p className="text-sm text-gray-500">{home.address}</p>
                <p className="text-red-500 font-bold text-lg mt-2">
                  {home.price}
                </p>
                <div className="flex justify-between mt-4 text-gray-600 text-sm">
                  <span className="flex items-center gap-1">
                    <FaBed /> {home.beds} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <FaBath /> {home.baths} Baths
                  </span>
                  <span className="flex items-center gap-1">
                    <LuRuler /> {home.sqft} sqft
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-6 my-10"></div>

        {/* Filtered from Database */}
        <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
          {properties.map((item, index) => (
            <PropertyItems
              key={index}
              id={item._id}
              image={item.images?.[0] || "/h4.jpg"}
              title={item.title}
              description={item.description}
              bedrooms={item.bedrooms}
              bathrooms={item.bathrooms}
              price={item.price}
              location={item.location}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomesForYou;
