"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IOrganizer } from "@/types/event";
import { formatCurrency, formatDate, formatTime } from "@/helpers/formatDate";
import Image from "next/image";

interface CardUIProps {
  title: string;
  imageUrl: string;
  hoverImageUrl?: string;
  id: string;
  lokasi: string;
  price: number;
  tempat: string;
  className?: string;
  start_time: string;
  end_time: string;
  event_date: string;
  organizer: IOrganizer;
  isLoading: boolean; // Keep this individual loading state
}

export function CardUI({
  title,
  imageUrl,
  id,
  hoverImageUrl,
  lokasi,
  price,
  organizer,
  tempat,
  start_time,
  end_time,
  event_date,
  isLoading,
}: CardUIProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // New state for visibility

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true); // Trigger animation once the component is loaded
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const isYouTube = hoverImageUrl?.includes("youtube.com") || false;
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=))([\w-]+)/
    );
    return match ? match[1] : null;
  };

  const videoId =
    isYouTube && hoverImageUrl ? getYouTubeVideoId(hoverImageUrl) : null;

  if (isLoading) {
    return (
      <div
        className={cn(
          "max-w-xs w-full min-w-[300px] group relative overflow-hidden",
          isVisible ? "animate-slideInFromRight" : ""
        )}
      >
        <Image
          src="https://res.cloudinary.com/dkyco4yqp/image/upload/v1735131879/HYPETIX-removebg-preview_qxyuj5.png"
          alt="Loading Image"
          width={256}
          height={256}
          className="h-64 w-full rounded-xl object-cover bg-neutral-900"
        />
        <div className="mt-4 text-start">
          <div className="h-6 bg-gray-600 rounded-md w-3/4 mb-2" />
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-600 rounded-full" />
            <div className="flex flex-col w-full">
              <div className="h-4 bg-gray-600 rounded-md w-1/2 mb-1" />
              <div className="h-4 bg-gray-600 rounded-md w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "max-w-xs min-w-[300px] w-full group relative overflow-hidden",
        isVisible ? "animate-slideInFromRight" : "" // Apply animation class based on visibility
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/events/${id}`} target="_blank" prefetch>
        <div
          className={cn(
            "relative h-64 w-full rounded-xl shadow-lg overflow-hidden ",
            "cursor-pointer flex flex-col justify-end p-4",
            "bg-center bg-cover border-2 border-transparent dark:border-neutral-800",
            "transition-transform duration-500 ease-in-out transform group-hover:scale-105 rounded-lg"
          )}
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          <div
            className={cn(
              "absolute inset-0 transition-all duration-500 opacity-0",
              "group-hover:opacity-100 group-hover:bg-cover group-hover:bg-center hover-effect"
            )}
          >
            {isYouTube && videoId && isHovered ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&showinfo=0&rel=0&fs=0&autohide=1&iv_load_policy=3`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              ></iframe>
            ) : (
              <div
                className={cn(
                  "absolute inset-0 transition-all duration-500 opacity-0",
                  "group-hover:opacity-100 group-hover:bg-cover group-hover:bg-center"
                )}
                style={{
                  backgroundImage: `url(${hoverImageUrl})`,
                }}
              />
            )}
          </div>

          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center opacity-0 bg-gray-700 bg-opacity-50",
              "group-hover:opacity-100 transition-opacity duration-500"
            )}
          >
            {/* View Event */}
            <span className="text-white text-xl font-bold  w-full h-1/4 flex justify-center items-center">
              View Event
            </span>
            {/* Location */}
            <span className="text-white text-sm mt-2 font-medium px-4 py-1 rounded-md">
              Location: {lokasi}
            </span>
            {/* Venue */}
            <span className="text-white text-sm mt-2 font-medium  px-4 py-1 rounded-md">
              Venue: {tempat}
            </span>
            {/* Price */}
            <span className="text-white text-sm mt-2 font-medium px-4 py-1 rounded-md">
              Price: {price === 0 ? "Free" : formatCurrency(price)}
            </span>
          </div>
        </div>
      </Link>

      {/* Text Section */}
      <div className="mt-4 text-start">
        <h1 className="font-bold text-lg text-gray-200">{title}</h1>
        <div className="flex gap-2 py-2">
          <Image
            src={organizer?.avatar}
            alt="Organizer Avatar"
            width={40}
            height={40}
            loading="lazy"
            className="w-10 h-10 object-cover rounded-full bg-neutral-900 p-1"
          />
          <div className="ml-2 text-sm text-gray-200 flex flex-col">
            {organizer?.organizer_name}
            <p className="text-sm text-gray-400">
              {formatDate(event_date)}, {formatTime(start_time)} -{" "}
              {formatTime(end_time)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
