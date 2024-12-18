"use client";
import { useState } from "react";
import { formatCurrency } from "@/helpers/formatDate";
import { ITicket } from "@/types/event";

export default function TicketCard({
  ticket,
  totalTickets,
  onUpdateTotal,
  isIncrementActive,
}: {
  ticket: ITicket;
  totalTickets: number;
  onUpdateTotal: (delta: number, deltaPrice: number) => void;
  isIncrementActive: boolean;
}) {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    if (count < 5 && totalTickets < 5) {
      setCount((prev) => {
        const newCount = prev + 1;
        onUpdateTotal(1, ticket.price); // Tambahkan ke totalTickets
        return newCount;
      });
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prev) => {
        const newCount = prev - 1;
        onUpdateTotal(-1, -ticket.price); // Kurangi dari totalTickets
        return newCount;
      });
    }
  };

  return (
    <div className="relative mx-5 md:w-[calc(50%-1rem)] w-full">
      <div className="group bg-white shadow-lg rounded-lg rounded-r-none hover:bg-gray-500 transition-all flex flex-col justify-between">
        <div className="flex justify-center items-center flex-1"></div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold text-black px-4 group-hover:text-white">
              {ticket.category}
            </h3>
            <p className="text-lg text-black mt-1 px-4 group-hover:text-gray-300">
              {formatCurrency(ticket.price)}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute h-full top-1/2 right-[-2rem] translate-y-[-50%] flex items-center">
        {count > 0 && (
          <>
            <button
              onClick={handleDecrement}
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
          className="text-sm sm:text-base md:text-xl my-1 text-white font-bold h-full bg-green-700 hover:bg-green-500 px-3  shadow-md transition-transform duration-300 transform rounded-lg rounded-l-none active:scale-105"
        >
          +
        </button>
      </div>
    </div>
  );
}
