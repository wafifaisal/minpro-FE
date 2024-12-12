import { ITicket } from "@/types/event";
import TicketCard from "./TicketCard";

export default function TicketSection({ tickets }: { tickets: ITicket[] }) {
  return (
    <div className="py-16">
      <div className="max-w-full mx-auto text-start">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8 mx-10">
          Ticket Categories
        </h2>
        <div className="flex flex-wrap gap-4 justify-center mx-4 overflow-y-scroll max-h-48 overflow-x-hidden px-5 md:mx-6">
          {tickets.map((item, idx) => (
            <TicketCard key={idx} ticket={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
