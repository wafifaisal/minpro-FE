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
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-end items-center z-50">
          <div
            className="bg-white p-6 w-[300px] h-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button onClick={toggleMenu}>
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <Link href="/" onClick={toggleMenu}>
                Home
              </Link>
              <Link href="/events" onClick={toggleMenu}>
                Events
              </Link>
              <Link href="/venues" onClick={toggleMenu}>
                Venues
              </Link>
              <Link href="/about" onClick={toggleMenu}>
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
