import { formatDate, formatTime } from "@/helpers/formatDate";
import { IEvent } from "@/types/event";

export default function LocationAndTime({ result }: { result: IEvent }) {
  return (
    <div>
      <div className="my-5 relative group">
        <p className="relative z-10 text-lg sm:text-md md:text-xl whitespace-nowrap bg-gray-400 text-white bg-opacity-40 py-1 rounded-full border-double group-hover:border-solid border-4 transform transition duration-300 group-hover:md:translate-y-[-25%] group-hover:md:bg-opacity-100 cursor-default md:cursor-pointer">
          {result.location}
        </p>

        <p className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap my-3 text-sm sm:text-xs md:text-md text-white bg-gray-500 bg-opacity-50 px-5 py-1 rounded-full border-2 border-gray-400 block md:hidden">
          {result.venue}
        </p>

        <p className="absolute top-1/2 left-1/2 my-5 transform -translate-x-1/2  whitespace-nowrap z-0 text-xl  text-white bg-gray-500 bg-opacity-50 px-5 py-1 rounded-full border-2 border-gray-400  opacity-0 group-hover:translate-y-[5px] group-hover:opacity-100 transition duration-300 hidden md:block">
          {result.venue}
        </p>
      </div>

      <div className="flex items-center py-20 md:py-10">
        <p className="my-2 flex items-center flex-col text-md md:text-lg bg-gray-400 text-white bg-opacity-40 px-5 rounded-full border-2 mx-2">
          {formatDate(result.event_date)}
        </p>
        <p className="my-2 text-md md:text-lg bg-gray-400 text-white bg-opacity-40 px-5 rounded-full border-2 mx-2">
          {formatTime(result.start_time)}
        </p>
        <p className="font-bold text-xl">|</p>
        <p className="my-2 text-md md:text-lg bg-gray-400 text-white bg-opacity-40 px-5 rounded-full border-2 mx-2">
          {formatTime(result.end_time)}
        </p>
      </div>
    </div>
  );
}
