"use client";
import { IEvent } from "@/types/event";
import Image from "next/image";
import LocationAndTime from "./LocationAndTime";
import { useEffect, useState } from "react";

export default function HeroSection({ result }: { result: IEvent }) {
  const [scrollY, setScrollY] = useState(0); // State to track scroll position

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Update scroll position
    };

    window.addEventListener("scroll", handleScroll); // Attach scroll event listener
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  // Calculate blur amount based on scroll position
  // Change the divisor to adjust how quickly the blur increases with scrolling
  const blurAmount = Math.min(scrollY / 30, 50); // Adjust 100 to make blur more/less sensitive

  return (
    <div className="relative w-full h-[75vh] md:h-screen ">
      {/* Image with blur effect */}
      <Image
        src={result.event_thumbnail}
        alt={result.event_name}
        fill
        className="object-fill "
        style={{
          filter: `blur(${blurAmount}px)`, // Apply blur based on scroll position
        }}
        quality={100}
        priority
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.2)] z-10 h-[110%]"
        style={{
          filter: `blur(${blurAmount}px)`, // Apply blur to gradient
        }}
      ></div>

      {/* Main content */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-30 -bottom-80 md:bottom-0 hollow-text">
        HYPETIX
      </div>

      <div className="absolute inset-0 items-start text-start z-20 px-5 md:px-10 py-[500px] md:py-72 w-full md:w-1/2 ">
        <h1 className="text-2xl md:text-4xl font-bold text-white">
          {result.event_name}
        </h1>

        <LocationAndTime result={result} isHeroPage={true} />
      </div>
    </div>
  );
}
