import React from "react";

const PropertyItems = ({  image, title, description, bedrooms, bathrooms, price, location }) => {
  return (
    <div className="bg-white w-72 rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition">
      <img
        src={Array.isArray(image) ? image[0] : image}
        // alt={title}
        className="w-full h-44 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mb-1">{location}</p>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        <div className="flex justify-between mt-3 text-sm text-gray-600">
          <span>🛏 {bedrooms} Beds</span>
          <span>🛁 {bathrooms} Baths</span>
        </div>
        <p className="text-red-500 font-bold text-lg mt-2">${price}</p>
      </div>
    </div>
  );
};

export default PropertyItems;
