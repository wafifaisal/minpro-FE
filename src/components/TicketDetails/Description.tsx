"use client";
import { useState, useEffect, useRef } from "react";

export default function Description({ result }: { result: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (contentRef.current) {
      const isOverflowing =
        contentRef.current.scrollHeight > contentRef.current.offsetHeight;
      setIsOverflowing(isOverflowing);
    }
  }, [result]);

  return (
    <div className="py-16 flex flex-wrap px-10">
      <div className="max-w-full w-full text-start">
        <h2 className=" text-4xl font-semibold text-white mb-6">Description</h2>
        <div
          ref={contentRef}
          className={`relative text-white text-base sm:text-lg md:text-xl lg:text-2xl transition-all${
            isExpanded ? " max-h-full" : " max-h-[8rem] overflow-hidden"
          }`}
          style={{
            WebkitMaskImage: !isExpanded
              ? "linear-gradient(180deg, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)"
              : "none",
            maskImage: !isExpanded
              ? "linear-gradient(180deg, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)"
              : "none",
          }}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </div>

      {isOverflowing && (
        <button
          onClick={toggleExpand}
          className="mt-5 px-4 py-2 bg-white  text-black rounded-lg font-bold hover:bg-gray-300"
        >
          {isExpanded ? "- See Less" : "+ See More"}
        </button>
      )}
    </div>
  );
}
