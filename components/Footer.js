import React from 'react'

const Footer = () => {
  return (
    
    <>
      <footer className="bg-gray-900 text-white px-4">
        <div className="  container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Buy Your Dream</h3>
            <p className="mb-4">Find your perfect property with our trusted real estate platform.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white"><i className="fab fa-facebook"></i></a>
              <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-white"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Properties</a></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <p>123 Real Estate Street</p>
            <p>City, State 12345</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@buyyourdream.com</p>
          </div>
        </div>
        <div className="text-center border-t border-gray-600 py-4">
          <p>© 2023 Buy Your Dream Estate. All rights reserved.</p>
        </div>
      </footer>
            
     </>
    
    )
}

export default Footer