// "use client";
// import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// const Page = ({ params: paramsPromise }) => {
//   const params = React.use(paramsPromise); // ✅ unwrap params
//   const [data, setData] = useState(null);

//   const fetchBlogData = async () => {
//     const response = await axios.get("/api/properties", {
//       params: {
//         id: params.id,
//       },
//     });
//     setData(response.data);
//   };

//   useEffect(() => {
//     fetchBlogData();
//   }, []);

//   return data ? (
//     <>
//       <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28 relative">
//         <div className="absolute top-0 left-0 m-4">
//         </div>
//         <div className="absolute top-0 right-0 m-4">
//           <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-4 border border-black shadow-[-7px_7px_0px_#000000]">
//             Get Started
//           </button>
//         </div>
//         <div className="text-center my-24">
//           <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
//             {data.title}
//           </h1>

//           {/* <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">{data.author}</p> */}
//         </div>
//       </div>

//       <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
//         <Image
//           className="border-4 border-white "
//           src={data.image}
//           priority={true}
//           width={1280}
//           height={720}
//           alt="Blog Image"
//         />
//         <div className="flex justify-between items-centermt-4">
//           <p>{data.title}</p>
//         </div>
//         <div className="flex justify-between items-centermt-4">
//           <p>{data.description}</p>
//         </div>
//         <div className="flex justify-between items-centermt-4">
//           <p>{data.price}</p>
//         </div>{" "}
//         <div className="flex justify-between items-centermt-4">
//           <p>{data.location}</p>
//         </div>
//         <div className="my-24">
//           <p className="text-black font-semibold my-4">
//             Share this article on social media
//           </p>
//           <div className="flex">
    
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   ) : (
//     <></>
//   );
// };

// export default Page;
