"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import SearchModal from "./SearchModal";

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // For mobile menu
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("event"); // Default filter
  const [isScrolled, setIsScrolled] = useState<boolean>(false); // Track scroll position

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll event to toggle background color
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true); // Set scrolled state to true when scrolling down
      } else {
        setIsScrolled(false); // Set it back to false when at the top
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div
        className={`w-full ${
          isScrolled
            ? "bg-black bg-opacity-70 backdrop-blur-sm "
            : "bg-transparent backdrop-blur-none"
        } 
      fixed z-50 transition-all duration-300 ease-in-out`}
      >
        <div className="mx-10 flex justify-between items-center py-4">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center">
              <p className="text-2xl  text-[#1b3f95] font-extrabold ">HYPE</p>
              <span className="text-2xl text-white font-extrabold ">TIX</span>
            </div>
          </Link>

          {/* User Actions */}
          <div className="flex items-center ml-auto">
            {/* Search Button */}
            <div className=" md:flex mr-4">
              <button
                className="w-10 h-10 bg-[#f1f1f1] bg-opacity-0 hover:bg-opacity-30 rounded-full flex justify-center items-center"
                onClick={handleOpenModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
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
              <Link href="/login">Login</Link>
            </div>
            <div className="w-[130px] h-[40px] bg-[#2c9cf0] rounded-full flex justify-center items-center text-white text-sm font-medium mr-4">
              <Link href="/register">Register</Link>
            </div>

            {/* Hamburger Menu Button */}
            <button
              className="w-8 h-6 flex flex-col justify-between items-end"
              onClick={toggleMenu}
            >
              <div className="w-6 h-[2px] bg-[white]"></div>
              <div className="w-4 h-[2px] bg-[white]"></div>
              <div className="w-6 h-[2px] bg-[white]"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Burger Menu */}
      <BurgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* Overlay for Search Modal */}
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"
          onClick={handleCloseModal} // Close modal if the overlay is clicked
        ></div>
      )}

      {/* Search Modal */}
      {isModalOpen && (
        <SearchModal
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        />
      )}
    </div>
  );
};

export default Navbar;
