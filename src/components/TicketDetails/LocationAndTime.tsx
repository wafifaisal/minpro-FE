import { formatDate, formatTime } from "@/helpers/formatDate";
import { IEvent } from "@/types/event";

export default function LocationAndTime({
  result,
  isHeroPage,
}: {
  result: IEvent;
  isHeroPage?: boolean; // Optional prop to control layout
}) {
  return (
    <div className="flex-wrap">
      <div
        className={`flex items-center pt-5 md:pt-2 ${
          isHeroPage ? "flex-col md:flex-row" : "flex-col"
        } gap-4`}
      >
        <div className="relative group flex items-center">
          <p className="relative z-10 text-md md:text-lg bg-black whitespace-normal md:whitespace-nowrap text-gray-400 font-medium bg-opacity-40 backdrop-blur-md py-1 px-5 rounded-full transform transition duration-300">
            {result.location}, {result.venue}
          </p>
        </div>

        <div
          className={`flex items-center ${
            isHeroPage ? "" : "flex-row"
          } gap-2 md:gap-4`}
        >
          <p className="my-2 text-md md:text-lg bg-black whitespace-normal md:whitespace-nowrap text-gray-400 font-medium bg-opacity-40 backdrop-blur-md px-5 rounded-full">
            {formatDate(result.event_date)}
          </p>

          <p className="text-md md:text-lg bg-black text-gray-400 font-medium bg-opacity-40 backdrop-blur-md border-gray-800 px-5 rounded-full">
            {formatTime(result.start_time)}
          </p>
          <p className="font-extralight -translate-y-1 text-xl">|</p>
          <p className="text-md md:text-lg bg-black text-gray-400 font-medium bg-opacity-40 backdrop-blur-md px-5 rounded-full border-gray-800">
            {formatTime(result.end_time)}
          </p>
        </div>
      </div>
    </div>
  );
}
