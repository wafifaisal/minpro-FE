"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSession } from "../../context/useSession";

interface BurgerMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isMenuOpen, toggleMenu }) => {
  const { isAuth, userId } = useSession();
  const [userName, setUserName] = useState<string>("");

  const fetchUser = useCallback(async () => {
    try {
      if (!userId) return;

      const response = await fetch(`/api/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUserName(`${user.result.firstName} ${user.result.lastName}`);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  }, [userId]);

  useEffect(() => {
    if (isAuth && userId) {
      fetchUser();
    }
  }, [isAuth, userId, fetchUser]);

  return (
    <>
      {/* Button to toggle the menu */}
      <button
        onClick={toggleMenu}
        className="fixed z-50 p-2 hover:bg-gray-500 rounded-full text-white shadow-lg transition-transform duration-300 ease-in-out transform top-[15px] right-[25px] md:top-[27px] md:right-[25px]"
        style={{
          transform: isMenuOpen
            ? "rotate(90deg) scale(1.2)"
            : "rotate(0) scale(1)",
        }}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        role="button"
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

      {/* Modal and Sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 h-screen transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMenu}
      >
        <div
          className={`fixed right-0 top-0 w-full md:w-[350px] bg-black h-screen text-white shadow-lg p-6 transition-transform duration-500 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-4 mx-5 py-20">
            {!isAuth ? (
              <div>
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
              </div>
            ) : (
              <Link
                href="/profile/user"
                className="flex justify-center items-center py-2 px-4 rounded-full font-semibold shadow-md bg-purple-500 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                {userName || "Profile"} {/* Menampilkan nama pengguna */}
              </Link>
            )}
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
              href="/admin"
              className="flex justify-center items-center py-2 px-4 rounded-full font-semibold shadow-md bg-yellow-500 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Sell on Hypetix
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;
