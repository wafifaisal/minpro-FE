"use client";
import { ITicket } from "@/types/event";
import TicketCard from "./TicketCard";
import { useState } from "react";
import { formatCurrency } from "@/helpers/formatDate";

export default function TicketSection({ tickets }: { tickets: ITicket[] }) {
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isIncrementActive, setIsIncrementActive] = useState(false);

  const handleUpdateTotal = (delta: number, deltaPrice: number) => {
    const newTotalTickets = totalTickets + delta;

    // Batasi total tickets maksimal 5
    if (newTotalTickets <= 5 && newTotalTickets >= 0) {
      setTotalTickets(newTotalTickets);
      setTotalPrice(totalPrice + deltaPrice);

      // Aktifkan animasi saat increment
      if (delta > 0) {
        setIsIncrementActive(true);
        setTimeout(() => setIsIncrementActive(false), 300);
      }
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-full mx-auto text-start">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8 mx-10">
          Ticket Categories
        </h2>
        <div className="flex flex-wrap gap-4 justify-center mx-4 overflow-y-auto max-h-60 px-5 md:mx-6">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              totalTickets={totalTickets}
              onUpdateTotal={handleUpdateTotal}
              isIncrementActive={isIncrementActive}
            />
          ))}
        </div>
        <div
          className={`transition-opacity duration-300 ${
            totalTickets > 0 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="mt-8 p-4 bg-gradient-to-r mx-0 md:mx-60 from-green-500 to-purple-500 rounded-lg shadow-md text-center text-white text-xl font-bold transition-transform duration-300 hover:scale-105 cursor-pointer">
            Total Price: {formatCurrency(totalPrice)}
          </div>
          <p className="text-center mt-2 text-white text-lg">
            {totalTickets}/5 Tickets Selected
          </p>
        </div>
      </div>
    </div>
  );
}
