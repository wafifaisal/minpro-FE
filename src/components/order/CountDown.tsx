"use client";
import { useEffect, useState } from "react";

export default function CountDown({ expiredAt }: { expiredAt: string }) {
  const calculateTimeLeft = () =>
    Math.max(new Date(expiredAt).getTime() - new Date().getTime());

  const [timeLeft, setTimeLeft] = useState<number>(calculateTimeLeft);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
  }, [expiredAt]);

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

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="font-semibold bg-red-500 text-center w-full sticky top-0 z-50">
      {timeLeft > 0 ? `${minutes}m ${seconds}s` : "Time's up!"}
    </div>
  );
}
