import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUserShield, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#103B35] text-[#F8F8F8] shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold font-serif tracking-wide">
          <Link
            to="/"
            className="hover:text-[#A4C73C] transition-colors duration-300 text-[32px] sm:text-[40px]"
          >
            NGO Events
          </Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center text-lg text-[28px]">
          <Link
            to="/"
            className="hover:text-[#A4C73C] flex items-center gap-2 transition"
          >
            <FaHome /> Home
          </Link>
          <Link
            to="/admin"
            className="hover:text-[#A4C73C] flex items-center gap-2 transition"
          >
            <FaUserShield /> Admin Panel
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-4xl text-[#A4C73C]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#145046] text-[#F8F8F8] py-4 px-6 space-y-4 text-[28px]">
          <Link
            to="/"
            className="block hover:text-[#A4C73C]"
            onClick={() => setMenuOpen(false)}
          >
            <FaHome className="inline mr-2" /> Home
          </Link>
          <Link
            to="/admin"
            className="block hover:text-[#A4C73C]"
            onClick={() => setMenuOpen(false)}
          >
            <FaUserShield className="inline mr-2" /> Admin Panel
          </Link>
        </div>
      )}
    </nav>
  );
}
