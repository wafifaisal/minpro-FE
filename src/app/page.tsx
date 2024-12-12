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
// Mengambil data event dari API
async function getEvents(): Promise<IEvent[]> {
  const response = await fetch("http://localhost:8000/api/events"); // Pastikan ini sesuai dengan endpoint API Anda
  const data = await response.json();
  return data.events; //response JSON berisi objek dengan property 'events'
}

export default function Home() {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    // Ambil data event saat halaman dimuat
    getEvents().then(setEvents);
  }, []);

  // Filter event berdasarkan kategori
  const getCardsByCategory = (category: string) => {
    return events.filter((event) => event.category === category);
  };

  const renderCategorySlider = (category: string, title: string) => {
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
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {getCardsByCategory(category).map((item, idx) => (
            <SwiperSlide key={item.id}>
              <CardUI
                title={item.event_name}
                imageUrl={item.event_thumbnail}
                hoverImageUrl={item.event_preview}
                slug={item.slug}
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
    <div>
      <Navbar />
      <HeroSlider />
      <div className="px-20 py-40 bg-black text-white">
        {renderCategorySlider("Concert", "Concert")}
        {renderCategorySlider("Sports", "Sports")}
        {renderCategorySlider("Socials", "Socials")}
      </div>
    </div>
  );
}
