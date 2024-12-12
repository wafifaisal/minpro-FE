"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Experience the Best Events",
      description: "Your gateway to unforgettable moments.",
      image: "/tes2.jpg",
    },
    {
      id: 2,
      title: "Discover New Adventures",
      description: "Find events tailored just for you.",
      image: "/tes3.jpg",
    },
    {
      id: 3,
      title: "Secure Your Spot Today",
      description: "Book tickets effortlessly with ValorPass.",
      image: "/tes4.jpg",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0} // No space to create seamless slides
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{
          clickable: true,
          bulletClass: "custom-bullet", // Custom class untuk bullet
          bulletActiveClass: "custom-bullet-active", // Custom class untuk bullet aktif
        }}
        loop={true} // Enables infinite scrolling
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-screen flex items-center justify-center text-white text-center">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10"></div>
              <div className="relative z-20">
                <h1 className="text-6xl font-bold mb-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
                  {slide.title}
                </h1>
                <p className="text-2xl mb-8">{slide.description}</p>
                <Link
                  href="/learn-more"
                  className="inline-block px-8 py-3 text-base font-bold bg-yellow-400 text-black rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-[0_8px_20px_rgba(255,204,0,0.6)] no-underline"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
