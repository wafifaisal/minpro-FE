"use client";

import { useDebounce } from "@/hooks/debounce";
import { useEffect, useState } from "react";

interface SearchModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
  className?: string;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isModalOpen,
  handleCloseModal,
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  className,
}) => {
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (!debouncedQuery) return;

    const fetchResults = async () => {
      try {
        const response = await fetch(
          `/api/search?query=${debouncedQuery}&filter=${selectedFilter}`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [debouncedQuery, selectedFilter]);

  if (!isModalOpen) return null;

  return (
    <div className={`p-6 bg-white shadow-lg rounded-lg ${className}`}>
      <h2 className="text-lg font-bold mb-4">Search</h2>
      <input
        type="text"
        className="border rounded p-2 w-full"
        placeholder="Search here..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        className="border rounded p-2 mt-2 w-full"
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
      >
        <option value="event">Event</option>
        <option value="city">City</option>
        <option value="artist">Artist</option>
        <option value="venue">Venue</option>
      </select>
      <ul className="mt-4">
        {results.map((result: any) => (
          <li key={result.id} className="border-b py-2">
            {result.eventName || result.city || result.artist || result.venue}
          </li>
        ))}
      </ul>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleCloseModal}
      >
        Close
      </button>
    </div>
  );
};

export default SearchModal;
