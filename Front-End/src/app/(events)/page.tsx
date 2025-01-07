"use client";

import { useEffect, useState } from "react";
import { CardUI } from "@/components/ui/CardUI";
import HeroSlider from "@/components/organizer/HeroSlider";
import Navbar from "@/components/shared/Navbar";
import { IEvent } from "@/types/event";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import axios from "@/helpers/axios";

// Utility function to fetch events
const getEvent = async () => {
  try {
    const { data } = await axios.get(`/events`);
    return data.events;
  } catch (err) {
    console.error("Error fetching events:", err);
    return []; // Return empty array if error occurs
  }
};

export default function Home() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isMounted, setIsMounted] = useState(false); // Check if component is mounted
  const [isBeginning, setIsBeginning] = useState(true); // Control the swiper's beginning state
  const [isEnd, setIsEnd] = useState(false); // Control the swiper's end state

  // Set mounted state to true after component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch events when the page loads
  useEffect(() => {
    getEvent().then((fetchedEvents) => {
      setEvents(fetchedEvents || []);
    });
  }, []);

  // Filter events by category
  const getCardsByCategory = (category: string) => {
    return events.filter((event) => event.category === category);
  };

  // Render category slider with filtered events
  const RenderCategorySlider = (category: string, title: string) => {
    const filteredEvents = getCardsByCategory(category);

    if (filteredEvents.length === 0) return null;

    return (
      <div className="relative">
        <h2 className="text-3xl font-bold mb-5">{title}</h2>

        {filteredEvents.length === 1 ? (
          <div className="flex justify-center">
            <CardUI
              title={filteredEvents[0].event_name}
              imageUrl={filteredEvents[0].event_thumbnail}
              hoverImageUrl={filteredEvents[0].event_preview || ""}
              id={filteredEvents[0].id}
              lokasi={filteredEvents[0].location}
              tempat={filteredEvents[0].venue}
              price={Math.min(
                ...filteredEvents[0].Ticket.map((ticket) => ticket.price)
              )}
              organizer={filteredEvents[0].Organizer}
              start_time={filteredEvents[0].start_time}
              end_time={filteredEvents[0].end_time}
              event_date={filteredEvents[0].event_date}
              isLoading={false}
            />
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: `.custom-next-${category}`,
              prevEl: `.custom-prev-${category}`,
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            slidesPerView={"auto"}
            spaceBetween={30}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {filteredEvents.map((item) => (
              <SwiperSlide key={item.id}>
                <CardUI
                  title={item.event_name}
                  imageUrl={item.event_thumbnail}
                  hoverImageUrl={item.event_preview || ""}
                  id={item.id}
                  lokasi={item.location}
                  tempat={item.venue}
                  price={Math.min(...item.Ticket.map((ticket) => ticket.price))}
                  organizer={item.Organizer}
                  start_time={item.start_time}
                  end_time={item.end_time}
                  event_date={item.event_date}
                  isLoading={false}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {filteredEvents.length > 1 && (
          <>
            <button
              className={`custom-prev-${category} absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-black text-white rounded-full transition-opacity duration-300 flex items-center justify-center z-50 ${
                isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"
              } z-10`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="0.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              className={`custom-next-${category} absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-black text-white rounded-full transition-opacity duration-300 flex items-center justify-center ${
                isEnd ? "opacity-50 cursor-pointer" : "opacity-100"
              } z-10`}
              disabled={isEnd}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="0.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    );
  };

  if (!isMounted) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="spinner-box">
          <div className="configure-border-1">
            <div className="configure-core"></div>
          </div>
          <div className="configure-border-2">
            <div className="configure-core"></div>
          </div>
        </div>
        <span className="hollow-text-spinner">HYPETIX</span>
      </div>
    );
  }

  return (
    <div className="bg-black h-screen">
      <Navbar />
      <HeroSlider result={events} />
      <div className="px-10 md:px-20 py-40 bg-black text-white">
        {RenderCategorySlider("Concert", "Concert")}
        {RenderCategorySlider("Sports", "Sports")}
        {RenderCategorySlider("Socials", "Socials")}
        {RenderCategorySlider("Theater", "Theater")}
        {RenderCategorySlider("Other", "Other")}
      </div>
    </div>
  );
}
