import { IEvent } from "@/types/event";
import { useEffect, useState } from "react";

const useRemainingTime = (event: IEvent) => {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const updateRemainingTime = () => {
      const eventDate = new Date(event.event_date);
      const eventStart = new Date(
        `${event.event_date.substring(0, 10)}T${event.start_time.substring(11)}`
      );
      const eventEnd = new Date(
        `${event.event_date.substring(0, 10)}T${event.end_time.substring(11)}`
      );
      const now = new Date();

      if (now < eventDate) {
        const diff = eventDate.getTime() - now.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        setRemainingTime(`Sale ends in ${days} days ${hours} hours`);
      } else if (now >= eventDate && now < eventStart) {
        const diff = eventStart.getTime() - now.getTime();
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setRemainingTime(`Event starts in ${hours}h ${minutes}m`);
      } else if (now >= eventStart && now < eventEnd) {
        setRemainingTime("Event is ongoing");
      } else {
        setRemainingTime("Event has ended");
      }
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [event.event_date, event.start_time, event.end_time]);

  return remainingTime;
};

export default useRemainingTime;
