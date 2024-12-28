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

// Mengambil data event dari API
export const getEvent = async (sorts: string = "asc") => {
  try {
    const { data } = await axios.get(`/events/?sorts=${sorts}`);
    return data.events;
  } catch (err) {
    console.error("Error fetching events:", err);
    return null; // Kembalikan null jika terjadi error
  }
};

export default function Home() {
  const [events, setEvents] = useState<IEvent[]>([]);
  console.log(events);
  useEffect(() => {
    // Ambil data event saat halaman dimuat
    getEvent().then(setEvents);
  }, []);

  // Filter event berdasarkan kategori
  const getCardsByCategory = (category: string) => {
    return events.filter((event) => event.category === category);
  };

  const RenderCategorySlider = (category: string, title: string) => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    return (
      <div className="relative ">
        <h2 className="text-3xl font-bold mb-5">{title}</h2>
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
          onInit={(swiper) => {
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
          {getCardsByCategory(category).map((item) => (
            <SwiperSlide key={item.id}>
              <CardUI
                title={item.event_name}
                imageUrl={item.event_thumbnail}
                hoverImageUrl={item.event_preview}
                id={item.id}
                lokasi={item.location}
                tempat={item.venue}
                price={Math.min(...item.Ticket.map((ticket) => ticket.price))}
                organizer={item.Organizer}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Tombol Navigasi Kustom */}
        <button
          className={`custom-prev-${category} absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-black text-white rounded-full transition-opacity duration-300 flex items-center justify-center ${
            isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"
          } z-10`}
        >
          {/* Panah Kiri */}
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
          {/* Panah Kanan */}
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
      </div>
    );
  };

  return (
    <div className="bg-black">
      <Navbar />
      <HeroSlider result={events} />
      <div className="px-20 py-40 bg-black text-white">
        {RenderCategorySlider("Concert", "Concert")}
        {RenderCategorySlider("Sports", "Sports")}
        {RenderCategorySlider("Socials", "Socials")}
      </div>
    </div>
  );
}
