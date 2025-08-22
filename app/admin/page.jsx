import Link from "next/link";
import React from "react";

const page = () => {
return (
    <div className="min-h-screen flex flex-col items-center pt-28 px-4 bg-gradient-to-r from-gray-100 to-gray-300">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-10">
                Admin Panel
            </h1>
            <div className="flex flex-col md:flex-row gap-10">
                {/* Add Property Section */}
                <div className="flex-1 flex flex-col items-center border border-purple-300 rounded-xl p-8 shadow-md bg-purple-100 hover:shadow-lg transition-shadow duration-300">
                    <h2 className="font-bold text-purple-700 text-2xl mb-6">Add Property</h2>
                    <Link href='/admin/AddProperty' className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
                        Add New Property
                    </Link>
                </div>
                {/* Property List Section */}
                <div className="flex-1 flex flex-col items-center border border-green-300 rounded-xl p-8 shadow-md bg-green-100 hover:shadow-lg transition-shadow duration-300">
                    <h2 className="font-bold text-green-700 text-2xl mb-6">Property List</h2>
                    <p className="text-green-800 font-semibold mb-6">
                        Total Properties - <span className="font-bold">12</span>
                    </p>
                    <button className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
                        View Properties
                    </button>
                </div>
            </div>
        </div>
    </div>
);
};

export default page;
