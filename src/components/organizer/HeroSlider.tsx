"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import { IEvent } from "@/types/event";
import LocationAndTime from "../TicketDetails/LocationAndTime";
import { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";

export default function HeroSlider({ result }: { result: IEvent[] }) {
  const [scrollY, setScrollY] = useState(0); // State to track scroll position

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Update scroll position
    };

    window.addEventListener("scroll", handleScroll); // Attach scroll event listener
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  // Apply a maximum blur value of 2
  const blurAmount = Math.min(scrollY / 100, 2);

  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay]} // Using only the necessary modules
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next", // Changed to use className for navigation
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
      >
        {result.map((item) => (
          <SwiperSlide key={item.id}>
            <Link
              href={`/events/${item.id}`}
              target="_blank"
              className="cursor-pointer"
            >
              <div
                className="relative h-[60vh] sm:h-[70vh] md:h-screen flex items-center justify-center w-full text-white text-center"
                style={{ filter: `blur(${blurAmount}px)` }} // Apply blur dynamically based on scroll
              >
                <Image
                  src={item.event_thumbnail}
                  alt={item.event_name}
                  fill
                  priority
                  quality={100}
                  className="object-fill w-full h-screen md:object-cover md:min-w-full md:min-h-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-[rgba(0,0,0,0.5)] z-10"></div>
                <div className="relative z-10 translate-y-[150px] sm:translate-y-[200px] text-xs md:text-lg">
                  <LocationAndTime result={item} />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
