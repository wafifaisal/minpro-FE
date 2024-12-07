"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CardUIProps {
  title: string;
  imageUrl: string;
  hoverImageUrl: string;
  className?: string;
}

export function CardUI({ title, imageUrl, hoverImageUrl }: CardUIProps) {
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

  return (
    <div
      className="max-w-xs w-full group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "relative h-52 w-full rounded-xl shadow-lg overflow-hidden",
          "cursor-pointer flex flex-col justify-end p-4",
          "bg-cover bg-center border-2 border-transparent dark:border-neutral-800",
          "transition-transform duration-500 ease-in-out transform group-hover:scale-105"
        )}
        style={{
          backgroundImage: `url(${imageUrl})`, // Set the background to the image
        }}
      >
        {/* Background Change on Hover */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500 opacity-0",
            "group-hover:opacity-100 group-hover:bg-cover group-hover:bg-center"
          )}
        >
          {/* If it's a YouTube video and hovered, render the embedded iframe */}
          {isYouTube && videoId && isHovered ? (
            <iframe
              width="100%" // Ensure iframe is responsive
              height="100%" // Ensure iframe is responsive
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&showinfo=0&rel=0&fs=0&autohide=1&iv_load_policy=3`}
              style={{
                border: "none", // Remove border around iframe
                position: "absolute", // Position absolutely within the container
                top: "0", // Align video with the top
                left: "0", // Align video with the left
                width: "100%", // Ensure the video takes full width
                height: "100%", // Ensure the video takes full height
                objectFit: "fill", // Ensure the video covers the container fully
              }}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          ) : (
            // Otherwise, render an image or default hover content
            <div
              className={cn(
                "absolute inset-0 transition-all duration-500 opacity-0",
                "group-hover:opacity-100 group-hover:bg-cover group-hover:bg-center"
              )}
              style={{
                backgroundImage: `url(${hoverImageUrl})`, // Set the background to the hover image
              }}
            />
          )}
        </div>

        {/* Hover Text */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center opacity-0",
            "group-hover:opacity-100 transition-opacity duration-500"
          )}
        >
          <span className="text-white text-xl font-bold bg-gray-700 w-full h-full flex justify-center transition-opacity duration-500 items-center bg-opacity-50">
            View Event
          </span>
        </div>
      </div>

      {/* Text Section */}
      <div className="mt-4 text-start">
        <h1 className="font-bold text-lg text-gray-800 dark:text-gray-200">
          {title}
        </h1>
      </div>
    </div>
  );
}
