import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-10">
      <div className="container mx-auto px-4 sm:px-12">

        {/* Top Section */}
        <div className="md:flex md:justify-between md:items-center text-center md:text-left">
          
          {/* Brand & Tagline */}
          <h1 className="lg:text-4xl text-3xl lg:leading-normal font-semibold md:w-2/5 text-red-400">
            <span className="text-red-500">✅ Leemart –</span>  Your Trusted Shopping Destination
          </h1>

          {/* Newsletter & WhatsApp */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 md:mt-0">
            <input 
              type="text" 
              placeholder="Enter your phone number" 
              aria-label="Enter your phone number"
              className="text-gray-800 w-full sm:w-72 py-2.5 rounded px-2 focus:outline-none"
            />
            <a 
              href="https://wa.me/message/VI2PWOCECY47I1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-red-600 hover:bg-red-500 duration-300 px-5 py-2.5 font-semibold rounded-md text-white w-full sm:w-auto text-center"
            >
              Let's Talk on WhatsApp
            </a>
          </div>

        </div>

        {/* Social Media Links */}
        <div className="flex justify-center md:justify-start gap-6 mt-8">
          <a href="https://www.facebook.com/leemartInvestments" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 text-xl">
            <FaFacebookF />
          </a>
          <a href="https://x.com/LeemartInv" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 text-xl">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 text-xl">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 text-xl">
            <FaLinkedinIn />
          </a>
        </div>

        {/* Divider Line */}
        <hr className="border-gray-700 my-6" />

        {/* Bottom Section */}
        <div className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Leemart. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
