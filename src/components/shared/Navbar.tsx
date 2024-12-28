"use client";

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
  const [avatarSize, setAvatarSize] = useState<number>(200);
  const [avatarPosition, setAvatarPosition] = useState<number>(60);
  const [avatarOpacity, setAvatarOpacity] = useState<number>(1);

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
        setAvatarSize(0);
      } else {
        setIsScrolled(false);
        setAvatarSize(200);
        setAvatarPosition(60);
      }
      const newOpacity = Math.max(1 - window.scrollY / 50, 0);
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
        <div className={`mx-10 flex items-center`}>
          {isEventPage && backgroundImage && isScrolled && (
            <div className="relative flex items-center">
              <Link href={"/events"}>
                <Image
                  src={backgroundImage}
                  alt="Navbar Background"
                  width={600}
                  height={600}
                  className="w-[80px] h-[80px] object-cover"
                />
              </Link>
            </div>
          )}
          {!isEventPage && (
            <Link href={"/events"}>
              <div className="relative flex items-center">
                <Link href={"/events"}>
                  <Image
                    src={
                      "https://res.cloudinary.com/dkyco4yqp/image/upload/v1735131879/HYPETIX-removebg-preview_qxyuj5.png"
                    }
                    alt="Navbar Background"
                    width={600}
                    height={600}
                    className="w-[80px] h-[80px] object-cover"
                  />
                </Link>
              </div>
            </Link>
          )}
          <div className="flex items-center ml-auto">
            <div className="md:flex mr-4">
              <button
                className="w-10 h-10 bg-[#f1f1f1] bg-opacity-0 hover:bg-opacity-30 flex justify-center rounded-full items-center"
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
            <Link href="/login/user">
              <div className="w-[80px] h-[40px] bg-[white] rounded-full hidden md:flex justify-center items-center text-black text-sm font-medium mr-4">
                Login
              </div>
            </Link>
            <Link href="/register/user">
              <div className="w-[80px] h-[40px] bg-white rounded-full hidden md:flex justify-center items-center text-black text-sm font-medium mr-4">
                Register
              </div>
            </Link>
            <div
              className="w-10 h-10 flex justify-center items-center bg-transparent"
              onClick={toggleMenu}
              style={{
                position: "relative",
              }}
            >
              <BurgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            </div>
          </div>
        </div>
      </div>
      {isEventPage && backgroundImage && (
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            top: `${avatarPosition}px`,
            transition: "top 0.3s ease-in-out, opacity 0.3s ease-in-out",
            opacity: avatarOpacity,
            zIndex: 20,
          }}
        >
          <Image
            src={backgroundImage}
            alt="Organizer Avatar"
            width={avatarSize}
            height={avatarSize}
            className="transition-all duration-300 opacity-0 md:opacity-100 object-cover transform"
          />
        </div>
      )}
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"
          onClick={handleCloseModal}
        ></div>
      )}
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
