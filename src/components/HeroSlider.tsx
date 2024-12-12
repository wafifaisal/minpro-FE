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
    <div className="hero-slider">
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
            <div className="slide">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
                quality={100}
              />
              <div className="gradient-overlay"></div>
              <div className="slide-content">
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-description">{slide.description}</p>
                <Link href="/learn-more" className="cta-button">
                  Learn More
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx>{`
        .hero-slider {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .slide {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
        }
        .gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, black 0%, rgba(0, 0, 0, 0) 20%),
            linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0) 20%);
          z-index: 1;
        }
        .slide-content {
          position: relative;
          z-index: 2;
        }
        .slide-title {
          font-size: 4rem;
          font-weight: bold;
          margin-bottom: 1rem;
          text-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
        }
        .slide-description {
          font-size: 1.5rem;
          margin-bottom: 2rem;
        }
        .cta-button {
          display: inline-block;
          padding: 0.75rem 2rem;
          font-size: 1rem;
          font-weight: bold;
          background-color: #ffcc00;
          color: #000;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none;
        }
        .cta-button:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 20px rgba(255, 204, 0, 0.6);
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
