import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/components/TicketDetails/HeroSection";
import TicketSection from "@/components/TicketDetails/Ticket";
import { getEvents, getEventSlug } from "@/lib/event";
import { IEvent } from "@/types/event";

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
      <Navbar backgroundImage={event.Organizer.avatar} isEventPage />
      <HeroSection event={event} />
      <TicketSection tickets={event.Ticket} />
    </div>
  );
}
