"use client"; // This ensures that the component is rendered on the client side

import { useState, useEffect } from "react";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import SearchModal from "./SearchModal";
import Image from "next/image";

interface NavbarProps {
  backgroundImage?: string;
  isEventPage?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ backgroundImage, isEventPage }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("event");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [avatarSize, setAvatarSize] = useState<number>(200); // Initial avatar size
  const [avatarPosition, setAvatarPosition] = useState<number>(90); // Initial position outside navbar
  const [avatarOpacity, setAvatarOpacity] = useState<number>(1); // Initial opacity

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
        setAvatarSize(0); // Shrink avatar size when scrolled
      } else {
        setIsScrolled(false);
        setAvatarSize(200); // Reset avatar size
        setAvatarPosition(90); // Keep avatar outside navbar
      }
      const newOpacity = Math.max(1 - scrollY / 200, 0); // Opacity decreases as you scroll, minimum 0
      setAvatarOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div
        className={`w-full fixed z-40 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-black bg-opacity-70 backdrop-blur-sm"
            : isEventPage
            ? "bg-transparent"
            : "bg-transparent backdrop-blur-none"
        }`}
      >
        <div className={`mx-10 flex items-center py-4`}>
          {isEventPage && backgroundImage && isScrolled && (
            <div className="relative transition-all ease-in-out duration-300 w-[100px] h-[100px] flex items-center ">
              <Link href={"/"}>
                <Image
                  src={backgroundImage}
                  alt="Navbar Background"
                  width={600}
                  height={600}
                />
              </Link>
            </div>
          )}
          {/* Logo */}
          {!isEventPage && (
            <Link href={"/"}>
              <div className="flex items-center">
                <p className="text-2xl text-[#1b3f95] font-extrabold">HYPE</p>
                <span className="text-2xl text-white font-extrabold">TIX</span>
              </div>
            </Link>
          )}
          {/* User Actions */}
          <div className="flex items-center ml-auto">
            {/* Search Button */}
            <div className="md:flex mr-4">
              <button
                className="w-10 h-10 bg-[#f1f1f1] bg-opacity-0 hover:bg-opacity-30 flex justify-center items-center"
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
            <Link href="/login/user">
              <div className="w-[80px] h-[40px] bg-[white] rounded-full hidden md:flex justify-center items-center text-black text-sm font-medium mr-4 ">
                Login
              </div>
            </Link>

            <Link href="/register/user">
              <div className="w-[80px] h-[40px] bg-white rounded-full hidden md:flex justify-center items-center text-black text-sm font-medium mr-4">
                Register
              </div>
            </Link>

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
      {isEventPage && backgroundImage && (
        <div
          className="absolute mx-10 flex items-center justify-between"
          style={{
            top: `${avatarPosition}px`, // Control avatar position
            transition: "top 0.3s ease-in-out",
            opacity: avatarOpacity, // Control opacity based on scroll
            zIndex: 20,
          }}
        >
          <Image
            src={backgroundImage}
            alt="Organizer Avatar"
            width={avatarSize}
            height={avatarSize}
            className="transition-all duration-300 opacity-0 md:opacity-100 "
          />
        </div>
      )}

      {/* Burger Menu */}
      <button onClick={toggleMenu} className="absolute">
        <BurgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </button>
      {/* Overlay for Search Modal */}
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"
          onClick={handleCloseModal}
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
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
        />
      )}
    </div>
  );
};

export default Navbar;
