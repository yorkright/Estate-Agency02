"use client";
import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaBath, FaBed } from "react-icons/fa";
// import { LuRuler } from "react-icons/lu";
// import PropertyItems from "../../components/PropertyItem"; // ✅ CORRECT IMPORT
import PropertiesList from "../../components/PropertyList";

const HomesForYou = () => {
  // const [menu, setmenu] = useState("All");
  // const [properties, setProperties] = useState([]);

 
  //   useEffect(() => {
  //   const fetchProperties = async () => {
  //     try {
  //       const res = await fetch("/api/properties");
  //       const data = await res.json();
  //       if (data.success) {
  //         setProperties(data.properties);
  //       } else {
  //         setError(data.error || "Failed to load properties.");
  //       }
  //     } catch (err) {
  //       setError("Network error: " + err.message);
  //     }
  //   };
  //   fetchProperties();
  // }, []);



  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-blue-200 flex items-center justify-center py-12 pt-32 px-4">
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('https://www.shutterstock.com/image-vector/real-estate-concept-house-icon-arrow-2479106969')", // Use a local image if available
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
            opportunities. Whether you're searching for a cozy family house, a
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

       {/* Filter Buttons */}
        <div className="flex justify-center gap-6 my-10">
          {["All", "FOR SALE", "FOR RENT", "FEATURED"].map((filter) => (
            <button
              key={filter}
              className="bg-white border border-gray-300 px-6 py-2 rounded-full font-semibold text-gray-700 hover:bg-indigo-100 transition"
              onClick={() => handleFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>


        <div className="">
          <PropertiesList/>
        </div>


        {/* Filtered from Database */}
       {/* <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
          {(Array.isArray(properties) ? properties : []).map((item, index) => (
            <PropertyItems
              key={item._id || index}
              id={item._id}
              image={item.image && item.image.length > 0 ? item.image[0] : "/h4.jpg"}
              title={item.title}
              description={item.description}
              bedrooms={item.bedrooms}
              bathrooms={item.bathrooms}
              price={item.price}
              location={item.location}
            />
          ))}
        </div> */}
      </div>
    </>
  );
};

export default HomesForYou;
