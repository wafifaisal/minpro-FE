"use client";

import { FaStar } from "react-icons/fa6";

export default function StarDisplay({ rate }: { rate: number }) {
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => {
        const pointRate = idx + 1;
        return (
          <FaStar
            key={idx} // Add a unique 'key' prop
            className={`text-3xl ${
              pointRate <= rate ? "text-yellow-300" : "text-slate-400"
            }`}
          />
        );
      })}
    </>
  );
}
