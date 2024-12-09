import Navbar from "@/components/shared/Navbar";
import { getEvents, getEventSlug } from "@/lib/event";
import { IEvent } from "@/types/event";
import Image from "next/image";

export const generateStaticParams = async () => {
  const event: IEvent[] = await getEvents();

  return event.map((item) => ({
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
    organizer: event.organizer,
    location: event.location,
    OpenGraph: {
      thumbnail: [`https:${event.event_thumbnail}`],
      preview: [`https:${event.event_preview}`],
    },
    category: event.category,
    ticket: event.ticket,
  };
}

export default async function EventsDetail({
  params,
}: {
  params: { slug: string };
}) {
  const events: IEvent = await getEventSlug(params.slug);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar backgroundImage={events.event_thumbnail} isEventPage />
      <div className="relative">
        <Image
          src={events.event_thumbnail}
          alt={events.event_name}
          width={1200}
          height={600}
          className="w-full object-fill h-screen "
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">{events.event_name}</h1>
        </div>
      </div>
    </div>
  );
}
