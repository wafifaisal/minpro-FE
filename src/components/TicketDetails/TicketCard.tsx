"use client";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/helpers/formatDate";
import { IEvent, ITicket } from "@/types/event";
import useRemainingTime from "./useRemainingTime";
import { FaClock } from "react-icons/fa";

export default function TicketCard({
  ticket,
  event,
  totalTickets,
  onUpdateTotal,
  isIncrementActive,
}: {
  event: IEvent;
  ticket: ITicket;
  totalTickets: number;
  onUpdateTotal: (delta: number, deltaPrice: number) => void;
  isIncrementActive: boolean;
}) {
  const [count, setCount] = useState(0); // Start count at 0 for each ticket
  const [isModalOpen, setIsModalOpen] = useState(false);

  const remainingTime = useRemainingTime(event);

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

  const handleIncrement = () => {
    if (totalTickets < 5) {
      // Ensure total tickets don't exceed 5
      const delta = 1;
      const deltaPrice = ticket.price;
      setCount(count + 1); // Update local count for this ticket
      onUpdateTotal(delta, deltaPrice); // Update the total number of tickets in the parent
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      const delta = -1;
      const deltaPrice = -ticket.price;
      setCount(count - 1); // Update local count for this ticket
      onUpdateTotal(delta, deltaPrice); // Update the total number of tickets in the parent
    }
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative mx-5 md:w-[calc(50%-1rem)] w-full">
      {/* Ticket Card */}
      <div
        className="group bg-white shadow-lg rounded-lg rounded-r-none transition-all flex flex-col justify-between cursor-pointer relative"
        onClick={handleCardClick}
      >
        <div className="flex justify-center items-center flex-1"></div>
        <div className="flex justify-between items-center ">
          <div>
            <h3 className="text-2xl font-semibold text-black px-4 ">
              {ticket.category}
            </h3>
            <p className="text-lg text-black mt-1 px-4 ">
              {formatCurrency(ticket.price)}
            </p>
            <p className="text-sm text-gray-500 px-4 mt-1 pb-2">
              <span className="font-bold text-black">{ticket.seats ?? 0}</span>{" "}
              seats
              <span className="font-semibold text-blue-600"> available</span>
            </p>
          </div>
        </div>

        {/* More Info Button covering the entire card */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
          <button
            onClick={handleCardClick}
            className="bg-blue-800 text-white w-full h-full rounded-lg text-xl font-semibold bg-opacity-45"
          >
            More Info
          </button>
        </div>
      </div>

      <div className="absolute h-full top-1/2 right-[-2rem] translate-y-[-50%] flex items-center">
        {count > 0 && (
          <>
            <button
              onClick={handleDecrement}
              disabled={count <= 0}
              className={`text-sm sm:text-base md:text-xl my-1 text-white font-bold h-full bg-red-700 hover:bg-red-500 px-2 md:px-3 shadow-md transition-transform duration-300 transform ${
                isIncrementActive ? "translate-x-[25px]" : ""
              }`}
            >
              -
            </button>
            <span
              className={`text-lg font-semibold text-black px-1 md:px-2 transition-transform duration-300 transform ${
                isIncrementActive ? "translate-x-[25px]" : ""
              }`}
            >
              {count}
            </span>
          </>
        )}
        <button
          onClick={handleIncrement}
          disabled={count >= (ticket.seats ?? 0)}
          className="text-sm sm:text-base md:text-xl my-1 text-white font-bold h-full bg-blue-700 hover:bg-blue-500 px-3 shadow-md transition-transform duration-300 transform rounded-lg rounded-l-none "
        >
          +
        </button>
      </div>

      {/* Modal for ticket details */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 overflow-hidden"
          onClick={handleCloseModal}
        >
          <div
            className="flex backdrop-blur-xl w-full h-full items-center justify-center text-start"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-col relative w-full h-full p-8 overflow-auto py-28">
              <h2 className="text-2xl font-semibold">{ticket.category}</h2>
              <p className="mt-2 text-sm">{formatCurrency(ticket.price)}</p>
              <div className="py-2 md:py-5">
                <p className="mt-4 text-sm font-bold p-2 bg-white bg-opacity-20 backdrop-blur-xl rounded-lg inline-flex items-center">
                  <FaClock className="mr-2 text-white" /> {/* Clock Icon */}
                  <span className="text-white">{remainingTime}</span>{" "}
                  {/* Remaining Time */}
                </p>
              </div>
              <div className="flex items-start flex-col md:flex-row">
                <span className="py-2 md:py-5 text-lg font-bold">
                  Description
                </span>
                <p
                  className="py-2 md:py-5 text-sm mx-2 md:mx-10"
                  dangerouslySetInnerHTML={{
                    __html: ticket.desc || "No description available",
                  }}
                />
              </div>
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 text-2xl text-white font-bold"
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
