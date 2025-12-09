import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import textLogo from "../../assets/textlogo.png";
import { FaInstagram, FaLinkedinIn, FaSquareFacebook, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();
  const brand = "#E59959";

  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="w-full mx-auto px-4 md:px-20 py-3 flex justify-between items-start">
            <div className="w-1/2 text-sm">
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="StudyMate Logo" className="h-8" />
                    <img src={textLogo} alt="StudyMate" className="h-6" />
                </Link>
                <p className="text-sm mt-4">
                    StudyMate is a web application designed to help students find their perfect study partner. It provides a platform for students to connect with each other, share notes and resources, and collaborate on projects.
                </p>
            </div>
            <div className="w-1/2 text-sm text-right">
                <div className="flex items-center justify-end gap-6 text-2xl text-white">
                    <a href="https://www.facebook.com/"><FaSquareFacebook /></a>
                    <a href="https://twitter.com/"><FaXTwitter /></a>
                    <a href="https://www.linkedin.com/"><FaLinkedinIn /></a>
                    <a href="https://www.instagram.com/"><FaInstagram /></a>
                </div>
            </div>
        </div>
        <div className="text-center text-gray-400 text-md mt-4">
            &copy; {year} StudyMate. All rights reserved.
        </div>
    </footer>
  );
}

export default Footer;