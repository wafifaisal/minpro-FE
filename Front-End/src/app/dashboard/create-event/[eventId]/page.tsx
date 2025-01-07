import CreateTicket from "@/components/createEvent/createTicket";
import { formatCurrency } from "@/helpers/formatDate";
import { getEventbyID } from "@/lib/event";
import { getTickets } from "@/lib/tickets";
import { ITicket } from "@/types/event";
import Link from "next/link";

export default async function TicketPage({
  params,
}: {
  params: { eventId: string };
}) {
  const result: ITicket[] = await getTickets(params.eventId);
  const getType: { event_type: "Free" | "Paid" } = await getEventbyID(
    params.eventId
  );

  return (
    <main className="bg-gradient-to-t py-20 from-blue-800 via-black to-gray-900 min-h-screen flex flex-col items-center">
      <div className="rounded-2xl sm:mx-8 lg:mx-32 p-10 tablet:mx-52 shadow-2xl bg-neutral-900 mt-10 w-full max-w-5xl">
        <CreateTicket
          eventId={params.eventId}
          event_type={getType.event_type}
        />
        <div className="py-10 border-t border-gray-600 text-white ">
          <div className="flex flex-col gap-6">
            {result && result.length > 0 ? (
              result.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col bg-gray-800 hover:bg-gray-700 transition-all border border-lightBlue px-8 py-6 gap-4 rounded-xl relative shadow-md"
                >
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-neutral-700 text-white font-bold px-4 py-1 rounded-full text-sm whitespace-nowrap">
                    {item.category}
                  </div>
                  <span
                    className="text-lg font-medium text-gray-200"
                    dangerouslySetInnerHTML={{
                      __html: item.desc || "<em>No description available</em>",
                    }}
                  />
                  <div className="py-4 border-t border-gray-700 border-dashed flex items-center justify-between">
                    <span className="font-semibold text-lg text-white">
                      {item.price === 0 ? "Free" : formatCurrency(item.price)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No tickets available.</p>
            )}
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-4 text-center">
          <Link
            className="py-3 px-6 bg-lightBlue hover:bg-lightBlue/80 text-white font-semibold rounded-md transition-all"
            href={"/dashboard"}
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
