"use client";
import { useState } from "react";
import { formatCurrency } from "@/helpers/formatDate";
import { IEvent, ITicket } from "@/types/event";

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

  // Calculate remaining time for ticket sales
  const getRemainingTime = () => {
    const currentDate = new Date();
    const startDate = new Date(event.start_time); // Start time of the event
    const endDate = new Date(event.end_time); // End time of the event

    const timeDiff = endDate.getTime() - currentDate.getTime(); // Time difference in milliseconds

    // If the event is already over, return 'Event started'
    if (timeDiff <= 0) return "Event started";

    // Calculate days, hours, and minutes
    const daysRemaining = Math.floor(timeDiff / (1000 * 3600 * 24)); // Days remaining
    const hoursRemaining = Math.floor(
      (timeDiff % (1000 * 3600 * 24)) / (1000 * 3600)
    ); // Hours remaining
    const minutesRemaining = Math.floor(
      (timeDiff % (1000 * 3600)) / (1000 * 60)
    ); // Minutes remaining

    if (daysRemaining > 0) {
      return `${daysRemaining} days`;
    } else if (hoursRemaining > 0) {
      return `${hoursRemaining} hours`;
    } else {
      return `${minutesRemaining} minutes`; // If less than an hour remaining
    }
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
          disabled={count >= 5}
          className="text-sm sm:text-base md:text-xl my-1 text-white font-bold h-full bg-blue-700 hover:bg-blue-500 px-3 shadow-md transition-transform duration-300 transform rounded-lg rounded-l-none "
        >
          +
        </button>
      </div>

      {/* Modal for ticket details */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="flex backdrop-blur-xl p-6 rounded-lg w-full h-full items-center justify-center text-start"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-col relative">
              <h2 className="text-3xl font-semibold">{ticket.category}</h2>
              <p className="mt-2">{formatCurrency(ticket.price)}</p>
              <div className="py-5">
                <p className="mt-4">
                  <strong>Remaining Time:</strong> {getRemainingTime()}
                </p>
              </div>
              <div className="flex items-start">
                <span className="py-5 text-xl font-bold -translate-x-80">
                  Description
                </span>

                <p
                  className="py-5 text-xl -translate-x-28"
                  dangerouslySetInnerHTML={{
                    __html: ticket.desc || "No description available",
                  }}
                />
              </div>
              <button
                onClick={handleCloseModal}
                className="fixed top-28 right-56 text-2xl text-white font-bold"
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
