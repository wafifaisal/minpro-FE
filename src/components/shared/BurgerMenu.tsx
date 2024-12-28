"use client";

import Link from "next/link";

interface BurgerMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <>
      <button
        onClick={toggleMenu}
        className="p-2 hover:bg-gray-500 rounded-full text-white shadow-lg transition-transform duration-300 ease-in-out transform"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) ${
            isMenuOpen ? "rotate(90deg) scale(1.2)" : "rotate(0) scale(1)"
          }`,
        }}
      >
        {isMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        >
          <div
            className={`transform bg-black text-white p-6 w-[350px] h-full shadow-lg fixed right-0 top-0 transition-all duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4 mx-5 py-10">
              <Link
                href="/login"
                className="flex md:hidden justify-center items-center py-2 px-4 rounded-full font-semibold shadow-md bg-white text-black transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="flex md:hidden justify-center items-center py-2 px-4 rounded-full font-semibold shadow-md bg-white text-black transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Register
              </Link>
              <Link
                href="/events"
                className="flex justify-center items-center py-2 px-4 rounded-full font-semibold shadow-md bg-purple-500 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Events
              </Link>
              <Link
                href="/dashboard"
                className="flex justify-center items-center py-2 px-4 rounded-full font-semibold shadow-md bg-yellow-500 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Dashboard
              </Link>
              <Link
                href="/about"
                className="flex justify-center items-center py-2 px-4 rounded-full font-semibold shadow-md bg-red-500 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BurgerMenu;
