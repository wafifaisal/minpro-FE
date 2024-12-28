"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IEvent } from "@/types/event";
import LocationAndTime from "../TicketDetails/LocationAndTime";
import { useEffect, useState } from "react";

export default function HeroSlider({ result }: { result: IEvent[] }) {
  const [scrollY, setScrollY] = useState(0); // State to track scroll position

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Update scroll position
    };

    window.addEventListener("scroll", handleScroll); // Attach scroll event listener
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  const blurAmount = Math.min(scrollY / 100, 2);

  const isBlurred = blurAmount > 1;

  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0} // No space to create seamless slides
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          nextEl: "swiper-button-next",
          prevEl: "swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-bullet-active",
        }}
        loop={true} // Enables infinite scrolling
      >
        {result.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={`/events/${item.id}`} className="cursor-pointer">
              <div
                className="relative h-screen flex items-center justify-center text-white text-center"
                style={{ filter: `blur(${blurAmount}px)` }} // Apply blur dynamically based on scroll
              >
                <Image
                  src={item.event_thumbnail}
                  alt={item.event_name}
                  fill
                  priority
                  className="object-fill"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10 "></div>
                <div
                  className={`relative z-10 translate-y-[200px] ${
                    isBlurred ? "pointer-events-none" : ""
                  }`} // Disable hover on LocationAndTime if blurred
                >
                  <div>
                    <LocationAndTime result={item} />
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
