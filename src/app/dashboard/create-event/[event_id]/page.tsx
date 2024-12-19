import CreateTicket from "@/components/createEvent/createTicket";
import { formatCurrency } from "@/helpers/formatDate";
import { formatDate } from "@/helpers/formatDate";
import { getTickets } from "@/lib/tickets";
import { ITicket } from "@/types/event";
import Link from "next/link";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

export default async function TicketPage({
  params,
}: {
  params: { id: string };
}) {
  const result: ITicket[] = await getTickets(params.id);
  return (
    <main>
      <div className="rounded-2xl sm:mx-10 p-10 tablet:mx-52 shadow-2xl md:my-20">
        <CreateTicket eventId={params.id} />
        <div className="mt-10 border-t border-black pt-4">
          <h1 className="text-2xl mb-6 font-[500]">
            TICKET ANDA AKAN MUNCUL DISINI
          </h1>
          <div className="flex flex-col gap-6">
            {result &&
              result.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex flex-col bg-sky-400/10 border border-lightBlue px-10 pt-4 gap-4 rounded-xl relative"
                  >
                    <div className="w-[40px] h-[40px] rounded-full bg-white absolute -right-5 bottom-9 border-l border-lightBlue"></div>
                    <div className="w-[40px] h-[40px] rounded-full bg-white absolute -left-5 bottom-9 border-r border-lightBlue"></div>
                    <span className="font-semibold text-xl">
                      {item.category}
                    </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          item.desc || "<em>No description available</em>",
                      }}
                    />
                    <div className="py-4 border-t border-black border-dashed flex items-center justify-between">
                      <span className="font-semibold">
                        {formatCurrency(item.price)}
                      </span>
                      <div className="flex items-center gap-4">
                        <button>
                          <FaPencilAlt className="text-lightBlue" />
                        </button>
                        <button>
                          <FaTrash className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="mt-10 border-t border-black pt-4">
          <Link
            className="py-2 px-3 bg-lightBlue text-white rounded-md"
            href={"/organizer/events"}
          >
            KEMBALI KE DASHBOARD
          </Link>
        </div>
      </div>
    </main>
  );
}
