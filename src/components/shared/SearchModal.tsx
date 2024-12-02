"use client";

import { useEffect } from "react";

interface SearchModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  className?: string; // Allow className as an optional prop
}

const SearchModal: React.FC<SearchModalProps> = ({
  isModalOpen,
  handleCloseModal,
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
}) => {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = ""; // Enable scroll
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50"
          onClick={handleCloseModal}
        >
          <div
            className="relative bg-white p-6 rounded-lg w-full sm:w-[400px] max-w-[90%] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Search</h2>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-[40px] px-4 text-sm text-[#999999] bg-transparent border rounded-full w-full"
                />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="h-[40px] px-4 text-sm text-[#999999] bg-transparent border rounded-full"
                >
                  <option value="event">Event</option>
                  <option value="city">City</option>
                  <option value="artist">Artist</option>
                  <option value="venue">Venue</option>
                </select>
              </div>

              <div>
                <input
                  type="date"
                  className="h-[40px] px-4 text-sm text-[#999999] bg-transparent border rounded-full"
                />
              </div>

              <div className="flex justify-center mt-4">
                <button
                  className="w-[60px] h-[40px] bg-[#2c9cf0] rounded-full flex justify-center items-center text-white text-sm"
                  onClick={handleCloseModal}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
