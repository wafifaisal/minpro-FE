import { IEvent } from "@/types/event";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { CardUI } from "../ui/CardUI";
import { FaRegWindowClose } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

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
  className,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [value, setValue] = useState<string>(searchParams.get("keyword") || "");
  const [text] = useDebounce(value, 500);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:8000/api/events?search=${text}`
      );
      const result = await res.json();
      setEvents(result.events || []);
      const eventSuggestions = result.events
        ? result.events.map((event: IEvent) => event.event_name)
        : [];
      setSuggestions(eventSuggestions);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (text) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("keyword", text);
      router.push(`${pathname}?${params.toString()}`);
      getData();
    } else {
      setSuggestions([]);
      setEvents([]);
      router.push(`${pathname}`);
    }
  }, [text, searchParams, pathname, router]);

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    setSuggestions([]); // Close suggestions when clicked
  };

  // Hide suggestions if the current value matches any suggestion
  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(text.toLowerCase()) &&
      suggestion.toLowerCase() !== text.toLowerCase()
  );

  const highlightMatch = (text: string, match: string) => {
    const parts = text.split(new RegExp(`(${match})`, "gi"));
    return parts.map((part, idx) =>
      part.toLowerCase() === match.toLowerCase() ? (
        <strong key={idx} className="font-bold">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    if (isModalOpen) {
      // Disable scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Enable scroll when modal is closed
      document.body.style.overflow = "auto";
    }

    // Cleanup: Restore scrolling on unmount or modal close
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);
  return (
    <div
      className={`fixed inset-0 z-50 ${className} text-white z-50 w-full bg-black bg-opacity-50 h-full py-10 px-6 sm:px-10 lg:px-32 transition-all duration-300 ease-in-out`}
    >
      <div className="rounded-xl"></div>
      <div className="flex justify-between p-4 border-b border-white">
        <FaMagnifyingGlass className="w-10 h-10 " />
        <button
          className="text-gray-400 hover:text-gray-200 focus:outline-none text-3xl"
          onClick={handleCloseModal}
          aria-label="Close modal"
        >
          <FaRegWindowClose />
        </button>
      </div>

      {/* Search Input */}
      <div className="p-4 cursor-pointer">
        <input
          type="search"
          className="w-full p-3 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      {/* Suggestions List */}
      {filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 bg-neutral-800 text-white border border-gray-700 rounded-lg shadow-md w-full sm:w-[80%] lg:w-[60%]">
          {filteredSuggestions.map((suggestion, idx) => (
            <li
              key={idx}
              className="py-2 cursor-pointer hover:bg-gray-700 flex"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <FaMagnifyingGlass className="mx-6" />
              {highlightMatch(suggestion, text)}
            </li>
          ))}
        </ul>
      )}

      {/* Results */}
      <div className="p-4 overflow-y-auto max-h-96 ">
        {isLoading ? (
          <div className="text-center mt-4">Loading...</div>
        ) : events.length === 0 ? (
          <div className="text-center mt-4">No results found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((item, idx) => (
              <div
                key={idx}
                className="transition-transform transform hover:scale-105 p-4 rounded-lg"
              >
                <CardUI
                  title={item.event_name}
                  imageUrl={item.event_thumbnail}
                  hoverImageUrl={item.event_preview}
                  slug={item.slug}
                  lokasi={item.location}
                  tempat={item.venue}
                  price={Math.min(...item.Ticket.map((ticket) => ticket.price))} // Harga termurah
                  organizer={item.Organizer}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
