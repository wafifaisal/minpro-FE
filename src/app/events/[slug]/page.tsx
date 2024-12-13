import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/components/TicketDetails/HeroSection";
import TicketSection from "@/components/TicketDetails/Ticket";
import { getEvents, getEventSlug } from "@/lib/event";
import { IEvent, ITicket } from "@/types/event";

// Explicitly define the return type for generateStaticParams
export const generateStaticParams = async () => {
  const events: IEvent[] = await getEvents();
  return events.map((item) => ({
    slug: item.slug,
  }));
};

// Explicitly define the return type for metadata generation
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<{
  title: string;
  description: string;
  name: string;
  location: string;
  thumbnail: string;
  preview: string;
  avatar: string | undefined;
  ticket: ITicket[];
}> {
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

// Default exported component for the event page
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
