'use client';

import { useEffect, useState, useCallback } from "react";

export default function CountDown({ expiredAt }: { expiredAt: string }) {
  // Memoizing the calculateTimeLeft function to avoid unnecessary re-renders
  const calculateTimeLeft = useCallback(() => {
    return Math.max(new Date(expiredAt).getTime() - new Date().getTime(), 0);
  }, [expiredAt]);

  const [timeLeft, setTimeLeft] = useState<number>(calculateTimeLeft());

  // Update timeLeft when expiredAt changes
  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
  }, [expiredAt, calculateTimeLeft]); // Add calculateTimeLeft as a dependency

  // Countdown logic (decrease every second)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const updatedTime = prevTimeLeft - 1000;
        if (updatedTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return updatedTime;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="font-semibold bg-red-500 text-center w-full sticky top-0 z-50">
      {timeLeft > 0 ? `${minutes}m ${seconds}s` : "Time's up!"}
    </div>
  );
}
