import Link from "next/link";
import React from "react";

const page = () => {
return (
    <div className="min-h-screen flex flex-col items-center pt-28 px-4">
        <div className="w-full  max-w-2xl bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-8">
                Admin Panel
            </h1>
            <div className="flex flex-col  md:flex-row gap-8">
                {/* Add Property Section */}
                <div className="flex-1 flex flex-col items-center border border-purple-200 rounded-lg p-6 shadow-sm bg-purple-50">
                    <h2 className="font-bold text-purple-600 text-xl mb-4">Add Property</h2>
                    <Link href='/admin/AddProperty' className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-200">
                        Add New Property
                    </Link>
                </div>
                {/* Property List Section */}
                <div className="flex-1 flex flex-col items-center border border-green-200 rounded-lg p-6 shadow-sm bg-green-50">
                    <h2 className="font-bold text-green-600 text-xl mb-4">Property List</h2>
                    <p className="text-green-700 font-semibold mb-4">
                        Total Properties - <span className="font-bold">12</span>
                    </p>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-200">
                        View Properties
                    </button>
                </div>
            </div>
        </div>
    </div>
);
};

export default page;
