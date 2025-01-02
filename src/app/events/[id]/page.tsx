import Navbar from "@/components/shared/Navbar";
import Share from "@/components/shared/share";
import Description from "@/components/TicketDetails/Description";
import HeroSection from "@/components/TicketDetails/HeroSection";
import Preview from "@/components/TicketDetails/Preview";
import TicketSection from "@/components/TicketDetails/Ticket";
import { getEvent, getEventbyID } from "@/lib/event";
import { IEvent, ITicket } from "@/types/event";

// Generate static params for each event
export const generateStaticParams = async () => {
  const events: IEvent[] = await getEvent();
  console.log(Array.isArray(events)); // This should log `true` if it's an array
  console.log(events); // Log the actual data to inspect its structure
  return events.map((item) => ({
    id: item.id,
  }));
};

// Generate metadata for event details page
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<{
  title: string;
  description: string;
  name: string;
  location: string;
  thumbnail: string;
  preview?: string;
  avatar: string | undefined;
  ticket: ITicket[];
}> {
  const result: IEvent = await getEventbyID(params.id);

  return {
    title: result.event_name,
    description: result.description,
    name: result.Organizer.organizer_name,
    location: result.location,
    thumbnail: result.event_thumbnail,
    preview: result.event_preview,
    avatar: result.Organizer.avatar,
    ticket: result.Ticket,
  };
}

// Default exported component for the event page
export default async function EventsDetail({
  params,
}: {
  params: { id: string };
}) {
  // Fetch the event data
  const result: IEvent = await getEventbyID(params.id);

  // Pass the event data to the child components
  return (
    <div className="relative bg-black text-white">
      <Navbar
        eventId={result.id}
        backgroundImage={result.Organizer.avatar}
        isEventPage
      />
      <HeroSection result={result} />
      <div className="pt-80 md:pt-0">
        <TicketSection tickets={result.Ticket} event={result} />{" "}
        <Description result={result.description} />
        <Preview result={result} />
      </div>
    </div>
  );
}
