import StarDisplay from "@/components/review/starDisplay";
import FormReview from "@/components/review/formReview";
import { formatDate, formatTime } from "@/helpers/formatDate";
import { getEventbyID } from "@/lib/event";
import { getReviews } from "@/lib/review";
import { IEvent } from "@/types/event";
import { IReview } from "@/types/review";
import Image from "next/image";
import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

export default async function ReviewPage({
  params,
}: {
  params: { id: string };
}) {
  const result: IEvent = await getEventbyID(params.id);
  const dataReviews: { result: IReview[] } = await getReviews(params.id);
  const date = formatDate(result.event_date);
  const time = `${formatTime(result.start_time)} - ${formatTime(
    result.end_time
  )}`;
  const location = `${result.location}, ${result.venue}`;
  return (
    <main className="bg-gray-900 text-gray-200 min-h-screen ">
      <div className="sm:mx-20 md:mx-40 tablet:mx-60">
        <div className="flex flex-col gap-6 rounded-b-xl">
          <div className="relative overflow-hidden aspect-[16/9] min-h-[15rem] flex-1">
            <Image
              src={result.event_thumbnail}
              alt={result.event_name}
              fill
              className="rounded-lg"
            />
          </div>
          <div className="bg-gray-800 shadow-2xl flex flex-col gap-2 rounded-b-xl">
            <div className="flex flex-col gap-2 px-6 py-4">
              <h1 className="text-xl font-semibold line-clamp-4">
                {result.event_name}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">
                  <SlCalender />
                </span>
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">
                  <FaClock />
                </span>
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">
                  <FaLocationDot />
                </span>
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="my-6">
          <h1 className="font-semibold text-4xl">Comment Section</h1>
          {dataReviews.result.length &&
            dataReviews.result.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="flex flex-col my-2 bg-gray-800 p-4 rounded-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-[35px] h-[35px] rounded-full overflow-hidden">
                      <Image
                        src={item.user.avatar}
                        alt={item.user.firstName}
                        fill
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {item.user.firstName} {item.user.lastName}
                      </span>
                      <span className="text-gray-400">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                    <div className="flex">
                      <StarDisplay rate={item.rating} />
                    </div>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.comment }}
                    className="mt-2 indent-4 text-gray-300"
                  />
                </div>
              );
            })}
        </div>
        <div className="bg-gray-800 shadow-xl rounded-md  p-4">
          <h1 className="font-semibold text-2xl mb-4 text-center">
            Rate and drop your comment here
          </h1>
          <FormReview id={params.id} />
        </div>
      </div>
    </main>
  );
}
