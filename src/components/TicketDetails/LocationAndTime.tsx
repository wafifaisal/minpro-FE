import { formatDate } from "@/helpers/formatDate";
import { IEvent } from "@/types/event";

export default function LocationAndTime({ event }: { event: IEvent }) {
  return (
    <div>
      <div className="my-2 relative group">
        <p className="relative z-10 text-lg sm:text-md md:text-xl whitespace-nowrap bg-gray-400 text-white bg-opacity-40 py-1 rounded-full border-double group-hover:border-solid border-4 transform transition duration-300 group-hover:md:translate-x-[-20%] group-hover:md:bg-opacity-100  cursor-default md:cursor-pointer">
          {event.location}
        </p>

        <p className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap my-3 text-sm sm:text-xs md:text-md text-white bg-gray-500 bg-opacity-50 px-5 py-1 rounded-full border-2 border-gray-400 block md:hidden">
          {event.venue}
        </p>

        <p className="absolute top-1/2 left-0 transform -translate-y-1/2 whitespace-nowrap z-0 text-sm sm:text-xs md:text-md border-l-0 text-white bg-gray-500 bg-opacity-50 pl-10 px-5 py-1 rounded-full border-2 border-gray-400 translate-x-0 opacity-0 group-hover:translate-x-[280px] group-hover:opacity-100 transition duration-300 hidden md:block">
          {event.venue}
        </p>
      </div>
      <div className="flex items-center py-10 md:py-5">
        <p className="my-2 text-md md:text-lg bg-gray-400 text-white bg-opacity-40 px-5 rounded-full border-2 mx-2">
          {formatDate(event.start_time)}
        </p>
        <p className="font-bold text-xl">|</p>
        <p className="my-2 text-md md:text-lg bg-gray-400 text-white bg-opacity-40 px-5 rounded-full border-2 mx-2">
          {formatDate(event.end_time)}
        </p>
      </div>
    </div>
  );
}
