import Navbar from "@/components/shared/Navbar";
import { formatDate } from "@/helpers/formatDate";
import { getEvents, getEventSlug } from "@/lib/event";
import { IEvent } from "@/types/event";
import Image from "next/image";

export const generateStaticParams = async () => {
  const events: IEvent[] = await getEvents();
  return events.map((item) => ({
    slug: item.slug,
  }));
};

export async function generateMetaData({
  params,
}: {
  params: { slug: string };
}) {
  const event: IEvent = await getEventSlug(params.slug);

  return {
    title: event.event_name,
    description: event.description,
    name: event.Organizer.name,
    location: event.location,
    thumbnail: event.event_thumbnail,
    preview: event.event_preview,
    avatar: event.Organizer.avatar,
    ticket: event.Ticket,
  };
}

export default async function EventsDetail({
  params,
}: {
  params: { slug: string };
}) {
  const event: IEvent = await getEventSlug(params.slug);

  return (
    <div className="relative bg-black text-white">
      {/* Navbar */}
      <Navbar backgroundImage={event.Organizer.avatar} isEventPage />

      {/* Hero Section */}
      <div className="relative w-full h-[75vh] md:h-screen">
        <Image
          src={event.event_thumbnail}
          alt={event.event_name}
          width={1200}
          height={800}
          className="w-full object-fill h-full"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-center px-4 md:px-6 py-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white py-5">
            {event.event_name}
          </h1>
          <div className="mt-2 relative group">
            {/* Event Location */}
            <p className="relative z-10 text-lg sm:text-md md:text-xl bg-gray-400 text-white bg-opacity-40 px-5 py-1 rounded-full border-double border-4 transform transition duration-300 group-hover:md:translate-x-[-20%] group-hover:md:bg-opacity-100  cursor-default md:cursor-pointer">
              {event.location}
            </p>

            {/* Event Venue */}
            <p className="absolute top-1/2 left-0 transform -translate-y-1/2 whitespace-nowrap z-0 text-sm sm:text-xs md:text-md border-l-0 text-white bg-gray-500 bg-opacity-50 pl-10 px-5 py-1 rounded-full border-2 border-gray-400 translate-x-0 opacity-0 group-hover:translate-x-[80%] group-hover:opacity-100 transition duration-300 hidden md:block">
              {event.venue}
            </p>
          </div>
          <div className="flex items-center py-3 ">
            <p className="mt-2 text-md md:text-lg bg-gray-400 text-white bg-opacity-40 px-5 rounded-full border-2 mx-2">
              {formatDate(event.start_time)}
            </p>
            <p className="font-bold text-xl">|</p>
            <p className="mt-2 text-md md:text-lg bg-gray-400 text-white bg-opacity-40 px-5 rounded-full border-2 mx-2">
              {formatDate(event.end_time)}
            </p>
          </div>
        </div>
      </div>

      {/* Ticket Section */}
      <div className="py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8">
            Ticket Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {event.Ticket.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition-all"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-white">
                  {item.category}
                </h3>
                <p className="text-lg text-gray-300 mt-2">{item.price}</p>
                <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
