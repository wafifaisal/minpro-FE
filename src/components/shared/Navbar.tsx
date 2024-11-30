// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import SearchModal from "./SearchModal";

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // For mobile menu
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("event"); // Default filter

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full bg-white shadow-md">
      <div className="mx-10 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center">
          {/* <img src="/path-to-logo.svg" alt="Logo" className="w-10 h-10" /> */}
          <span className="text-2xl font-semibold text-[#2f6af3] ">VT</span>
          <span className="text-2xl font-semibold text-[#04092c]">ix</span>
        </div>

        {/* User Actions */}
        <div className="flex items-center ml-auto">
          {/* Search Button */}
          <div className="hidden md:flex mr-4">
            <button
              className="w-10 h-10 bg-[#f1f1f1] rounded-full flex justify-center items-center"
              onClick={handleOpenModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-6 h-6 text-[#04092c]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 18a7 7 0 100-14 7 7 0 000 14zM21 21l-4.35-4.35"
                />
              </svg>
            </button>
          </div>

          {/* Login Button */}
          <div className="w-[130px] h-[40px] bg-[#2c9cf0] rounded-full flex justify-center items-center text-white text-sm font-medium mr-4">
            <Link href="/Login">Login</Link>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="w-8 h-6 flex flex-col justify-between items-end"
            onClick={toggleMenu}
          >
            <div className="w-6 h-[2px] bg-[#04092c]"></div>
            <div className="w-4 h-[2px] bg-[#04092c]"></div>
            <div className="w-6 h-[2px] bg-[#04092c]"></div>
          </button>
        </div>
      </div>

      {/* Burger Menu */}
      <BurgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* Search Modal */}
      <SearchModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
    </div>
  );
};

export default Navbar;
