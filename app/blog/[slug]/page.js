"use client";
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { lazy } from 'react';
// import Link from 'next/link';

const home = [
  {
    slug: "1",
    title: "Beautiful Family Home",
    imageUrl: "/property1.jpg",
    address: "Outer Ring Road Near Purvanchal Highway",
    city: "Kalipuri",
    state: "Himachal Pradesh",
    zip: "903411",
    country: "India",
    category: "Villa",
    price: "₹3.5 Cr",
    author: "Jitendar Rao",
    date: "April 12, 2025",
    description: "A lovely family home in a peaceful neighborhood.",
    excerpt: "Spacious, elegant, and modern.",
    h3: "Key Features",
    provider: <p className="mt-4 text-gray-500">Provided by Buy-YOUR-dream.com.</p>,
    link: "/contact",
    video: "/landing1.mp4",
  },
  {
    slug: "2",
    title: "Cozy Modern Home",
    imageUrl: "/property3.jpg",
    address: "Outer Ring Road Near Purvanchal Highway",
    city: "Lucknow",
    state: "Uttar Pradesh",
    zip: "203411",
    country: "USA",
    category: "Home",
    price: "₹1.1 Cr",
    author: "Rahul Tripathi",
    date: "April 10, 2025",
    description: "Modern interiors with spacious outdoor area.",
    excerpt: "Comfort meets convenience.",
    h3: "Why Choose This Home",
    provider: <p className="mt-4 text-gray-500">Provided by CozyLife Estates.</p>,
    link: "/contact",
    video: "/landing2.mp4",
  },
  {
    slug: "3",
    title: "Stylish Family Home",
    imageUrl: "/property2.jpg",
    address: "Sector 21, Dwarka",
    city: "New Delhi",
    state: "Delhi",
    zip: "110075",
    country: "India",
    category: "Home",
    price: "₹95 Lakhs",
    author: "Neha Kapoor",
    date: "April 8, 2025",
    description: "A modern home in the heart of Delhi, perfect for families.",
    excerpt: "Prime location with all amenities nearby.",
    h3: "Highlights",
    provider: <p className="mt-4 text-gray-500">Provided by UrbanNest Realty.</p>,
    link: "/contact",
    contact:'8765678655',
    video: "/landing3.mp4",
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
    category: "Villa",
    price: "₹4.2 Cr",
    author: "Rajiv Nair",
    date: "April 5, 2025",
    description: "An elegant beachfront villa with premium features and stunning views.",
    excerpt: "Your dream escape in Goa awaits.",
    h3: "What Makes It Special",
    provider: <p className="mt-4 text-gray-500">Provided by Seaside Homes.</p>,
    link: "/contact",
    contact:'8765678655',
    video: "/landing4.mp4",
  },
  {
    slug: "5",
    title: "Premium City House",
    imageUrl: "/property4.jpg",
    address: "Linking Road, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    zip: "400050",
    country: "India",
    category: "Flat",
    price: "₹1.8 Cr",
    author: "Aarti Mehta",
    date: "April 3, 2025",
    description: "A top-tier flat located in Mumbai’s prime zone with urban luxury.",
    excerpt: "City life at its best.",
    h3: "Ideal For",
    provider: <p className="mt-4 text-gray-500">Provided by Metro Living.</p>,
    link: "/contact",
    contact:'8765678655',
    video: "/landing5.mp4",
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
    category: "Home",
    price: "₹65 Lakhs",
    author: "Vikram Chauhan",
    date: "March 30, 2025",
    description: "An affordable option for families with great connectivity and community.",
    excerpt: "Perfect for first-time buyers.",
    h3: "Home Sweet Home",
    provider: <p className="mt-4 text-gray-500">Provided by PinkCity Properties.</p>,
    link: "/contact",
    contact:'8765678655',
    video: "/landing6.mp4",
  },
  {
    slug: "7",
    title: "Modern Residential Villa",
    imageUrl: "/h4.jpg",
    address: "Magarpatta City, Hadapsar",
    city: "Pune",
    state: "Maharashtra",
    zip: "411028",
    country: "India",
    category: "Flat",
    price: "₹1.8 Cr",
    author: "Sonal Gokhale",
    date: "March 28, 2025",
    description: "A contemporary flat in Pune’s tech hub with all modern facilities.",
    excerpt: "Live smart in the heart of Pune.",
    h3: "Great for Professionals",
    provider: <p className="mt-4 text-gray-500">Provided by LiveEasy Realtors.</p>,
    link: "/contact",
    contact:'8765678655',
    video: "/landing5.mp4",
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
    category: "Flat",
    price: "₹1.2 Cr",
    author: "Sonal Gokhale",
    date: "March 28, 2025",
    description: "A contemporary flat in Pune’s tech hub with all modern facilities.",
    excerpt: "Live smart in the heart of Pune.",
    h3: "Great for Professionals",
    provider: <p className="mt-4 text-gray-500">Provided by LiveEasy Realtors.</p>,
    link: "/contact",
    contact:'8765678655',
    // video: "/landing.mp4",
  }
];

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug;
  const post = home.find((p) => p.slug === slug);

  if (!post) {
    return <div className="text-center mt-10 text-red-500">Post not found!</div>;
  }

  return (
    <>
      <br /><br /><br />

      <div  className="min-h-screen py-10 px-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">

          {/* Featured Image */}
          <div className="relative w-full h-80 mt-6 mb-4 rounded-xl overflow-hidden">
            <Image
              src={post.imageUrl || "/fallback.jpg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>

          {/* Author and Date */}
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-semibold">{post.author}</span> • {post.date}
          </p>

          {/* Location */}
          <p className="mt-2 text-sm font-bold text-green-600">
            <span className="font-bold">{post.state}</span> • {post.city} • {post.zip} 
          </p>

          {/* Description */}
          <p className="mt-3 text-gray-700">{post.description}</p>
          <p className='text-red-600 font-bold '> {post.Price}</p>
          <h1 className="mt-3 text-gray-800 font-bold">{post.excerpt}</h1>

          {/* Video Section */}
          {post.video && (
            <div className="mt-6 w-full">
              <video
                className="w-full rounded-lg shadow-lg "
                src={post.video}
                controls
                autoPlay
                loop
                muted
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* Provider Info */}
          {post.provider}
          <h4 className='text-green-600 font-bold'> {post.contact} </h4>

          {/* Optional Link */}
          {/* {post.link && (
            <div className="mt-6">
              <Link href={post.link}>
                <button className="px-4 py-2 bg-blue-200 font-bold text-black rounded-lg hover:bg-green-300 transition">
                  Learn More
                </button>
              </Link>
            </div>
          )} */}

          {/* Back Button */}
          <button
            className="mt-6 ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600 transition"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}
