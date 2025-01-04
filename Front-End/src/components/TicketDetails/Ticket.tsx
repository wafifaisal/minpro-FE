'use client';

import { ITicket, IEvent } from '@/types/event';
import TicketCard from './TicketCard';
import { useState, useEffect } from 'react';
import { formatCurrency } from '@/helpers/formatDate';
import axios, { AxiosError } from 'axios'; // Import AxiosError from axios directly
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function TicketSection({
  tickets,
  event,
}: {
  tickets: ITicket[];
  event: IEvent;
}) {
  const router = useRouter();

  // State Management
  const [totalTickets, setTotalTickets] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [ticketCart, setTicketCart] = useState<
    { Ticket: ITicket; quantity: number }[]
  >([]);
  const [isIncrementActive, setIsIncrementActive] = useState<boolean>(false);

  const handleOrderTicket = async () => {
    try {
      setIsLoading(true);

      // API call to place order
      const { data } = await axios.post('/order', {
        total_price: totalPrice,
        final_price: totalPrice,
        ticketCart,
      });

      toast.success(data.message);
      router.push(`/order/${data.orderId}`);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // Accessing response data safely when it's an AxiosError
        toast.error(error.response?.data?.error || 'An error occurred');
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTotal = (
    delta: number,
    deltaPrice: number,
    ticket: ITicket
  ) => {
    const newTotalTickets = totalTickets + delta;

    // Ensure the total number of tickets doesn't exceed 5
    if (newTotalTickets < 0 || newTotalTickets > 5) {
      toast.warn('You can select between 0 and 5 tickets in total.');
      return;
    }

    // Update the total number of tickets and price
    setTotalTickets(newTotalTickets);
    setTotalPrice((prevPrice) => prevPrice + deltaPrice);

    // Update ticket cart
    setTicketCart((prevCart) => {
      const existingTicket = prevCart.find(
        (item) => item.Ticket.id === ticket.id
      );

      if (existingTicket) {
        // If the quantity after delta goes to 0 or below, remove the ticket from cart
        if (existingTicket.quantity + delta <= 0) {
          return prevCart.filter((item) => item.Ticket.id !== ticket.id);
        }

        // Otherwise, update the quantity of the ticket in the cart
        return prevCart.map((item) =>
          item.Ticket.id === ticket.id
            ? { ...item, quantity: item.quantity + delta }
            : item
        );
      } else if (delta > 0) {
        // If it's a new ticket being added to the cart
        return [...prevCart, { Ticket: ticket, quantity: delta }];
      }
      return prevCart;
    });

    setIsIncrementActive(delta > 0);
  };

  useEffect(() => {
    if (isIncrementActive) {
      const timer = setTimeout(() => setIsIncrementActive(false), 300);
      return () => clearTimeout(timer); // Cleanup
    }
  }, [isIncrementActive]);

  return (
    <div className="py-16">
      <div className="max-w-full mx-auto text-start">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8 mx-10">
          Ticket Categories
        </h2>

        {/* Ticket Cards */}
        <div className="flex flex-wrap gap-4 justify-center mx-4 overflow-y-auto max-h-60 px-3">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              event={event}
              totalTickets={totalTickets}
              onUpdateTotal={(delta, deltaPrice) =>
                handleUpdateTotal(delta, deltaPrice, ticket)
              }
              isIncrementActive={isIncrementActive}
            />
          ))}
        </div>

        {/* Order Button */}
        {totalTickets > 0 && (
          <div className="transition-opacity duration-300 opacity-100 flex justify-center flex-col">
            <button
              disabled={isLoading}
              onClick={handleOrderTicket}
              className={`mt-8 p-4 bg-gradient-to-r mx-0 md:mx-60 from-blue-800 to-black rounded-lg shadow-md text-center text-white text-xl font-bold transition-transform duration-300 ${
                isLoading ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'
              }`}
            >
              {isLoading
                ? 'Processing...'
                : `Buy with Total Price: ${
                    totalPrice === 0 ? 'Free' : formatCurrency(totalPrice)
                  }`}
            </button>
            <p className="text-center mt-2 text-white text-lg">
              {totalTickets}/5 Tickets Selected
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
