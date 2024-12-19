"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import { IOrganizer } from "@/types/event";
import { formatCurrency } from "@/helpers/formatDate";

interface CardUIProps {
  title: string;
  imageUrl: string;
  hoverImageUrl: string;
  id: string;
  lokasi: string;
  price: number;
  tempat: string;
  className?: string;
  organizer: IOrganizer;
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
}: CardUIProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Function to check if hoverImageUrl is a YouTube URL
  const isYouTube = hoverImageUrl.includes("youtube.com");

  // Extract the YouTube video ID from the URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=))([\w-]+)/
    );
    return match ? match[1] : null;
  };

  const videoId = isYouTube ? getYouTubeVideoId(hoverImageUrl) : null;
  console.log("Lokasi:", lokasi);
  console.log("Tempat:", tempat);
  console.log("Price:", price);
  return (
    <div
      className="max-w-xs w-full group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Link */}
      <Link href={`/events/${id}`}>
        <div
          className={cn(
            "relative h-64 w-full rounded-xl shadow-lg overflow-hidden",
            "cursor-pointer flex flex-col justify-end p-4 ",
            "bg-cover bg-center border-2 border-transparent dark:border-neutral-800",
            "transition-transform duration-500 ease-in-out transform group-hover:scale-105 rounded-lg"
          )}
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          <div
            className={cn(
              "absolute inset-0 transition-all duration-500 opacity-0 ",
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
                className="w-full h-full "
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

          {/* Hover Text */}
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
              Price: {formatCurrency(price)}
            </span>
          </div>
        </div>
      </Link>

      {/* Text Section */}
      <div className="mt-4 text-start">
        <h1 className="font-bold text-lg text-gray-800 dark:text-gray-200">
          {title}
        </h1>
        <span className="ml-2 text-sm">{organizer.name}</span>
      </div>
    </div>
  );
}
