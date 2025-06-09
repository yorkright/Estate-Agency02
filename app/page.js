/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Hero Section */}

      <main className="min-h-screen bg-gradient-to-br from-blue-500 to-white text-gray-900"> <br />br

        <section
          style={{
            backgroundImage:
              "url('https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/6048524064e040800db65285_Blog-hero_final%20(1).gif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="relative flex flex-col md:flex-row items-center justify-between bg-black/80 backdrop-blur-md px-6 md:px-20 py-20 md:py-32 text-white min-h-[90vh]"
        >
          <div className="absolute inset-0 bg-black/80 z-0"></div>
          <div className="relative max-w-xl z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Buy Your <span className="text-blue-200">Dream Home</span> Today
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Explore the best properties in your desired location with the most trusted real estate platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/Property"
                className="px-6 py-3 text-lg bg-blue-600 hover:bg-green-700 text-white rounded-xl text-center"
              >
                Find Home
              </Link>
              <Link
                href="/agents"
                className="px-6 py-3 text-lg border border-blue-400 text-blue-300 hover:bg-green-500/20 rounded-xl text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 px-6 md:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-gray-800">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 bg-blue-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl font-bold mb-2">Verified Properties</h3>
              <p className="text-gray-600">
                We list only verified and trustworthy properties for your peace of mind.
              </p>
            </div>
            <div className="p-8 bg-blue-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl font-bold mb-2">Expert Agents</h3>
              <p className="text-gray-600">
                Our experienced agents help you make the best buying decision.
              </p>
            </div>
            <div className="p-8 bg-blue-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl font-bold mb-2">Easy Financing</h3>
              <p className="text-gray-600">
                Get help with mortgage plans tailored to your needs and budget.
              </p>
            </div>
          </div>
        </section>
      </main>




      {/* About Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About Buy Your Dream</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            At <strong>Buy Your Dream</strong>, we help you find a place you’ll love to live. From affordable flats to luxury estates, our listings are curated with your needs in mind.
            Whether you're buying your first home or searching for a dream retirement location — we're here every step of the way.
          </p>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <Image
                src={`/property${item}.jpg`}
                width={500}
                height={300}
                alt={`Property ${item}`}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">Stylish Family Home</h3>
                <p className="text-gray-500">Bengaluru, India</p>
                <p className="text-blue-600 font-bold mt-2">₹1,20,00,000</p>
                <Link href="/Property"
                  className="inline-block mt-4 text-indigo-600 hover:underline">
                  View Details →

                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What Clients Say</h2>
          <blockquote className="italic text-gray-700 text-lg mb-4">
            "Found our dream house in just a week! The agents were incredibly helpful and professional."
          </blockquote>
          <p className="font-semibold text-gray-800">— Rajesh Mehta, Mumbai</p>
        </div>
      </section>



    </main>
  );
}
