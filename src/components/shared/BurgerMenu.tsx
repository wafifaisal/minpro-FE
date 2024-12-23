"use client";

import Link from "next/link";

interface BurgerMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <>
      {isMenuOpen && (
        <div className="fixed inset-0 text-white flex justify-end items-center z-50">
          <div
            className="bg-black text-white p-6 w-[300px] h-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button onClick={toggleMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-6 h-6 text-[white]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-4 mx-5  ">
              <Link
                href={"/login"}
                className="flex justify-center md:hidden bg-blue-500 items-center "
              >
                Login
              </Link>
              <Link
                href="/"
                className="bg-gray-500 opacity-40 rounded-full text-white"
              >
                Home
              </Link>
              <Link
                href="/events"
                className="bg-gray-500 opacity-40 rounded-full"
              >
                Events
              </Link>
              <Link
                href="/dashboard"
                className="bg-gray-500 opacity-40 rounded-full text-white"
              >
                Dashboard
              </Link>
              <Link
                href="/about"
                className="bg-gray-500 opacity-40 rounded-full"
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
