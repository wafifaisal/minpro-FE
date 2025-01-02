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
  params: { eventId: string; id: string };
}) {
  const result: IEvent = await getEventbyID(params.id);
  const dataReviews: { result: IReview[] } = await getReviews(params.eventId);
  const date = formatDate(result.event_date);
  const time = `${formatTime(result.start_time)} - ${formatTime(
    result.end_time
  )}`;
  const location = `${result.location}, ${result.venue}`;
  return (
    <main>
      <div className="sm:mx-20 md:mx-40 tablet:mx-60">
        <div className="flex flex-col gap-6 rounded-b-xl">
          <div className="relative overflow-hidden aspect-[16/9] min-h-[15rem] flex-1">
            <Image src={result.event_thumbnail} alt={result.event_name} fill />
          </div>
          <div className="shadow-2xl flex flex-col gap-2 rounded-b-xl">
            <div className="flex flex-col gap-2 px-6 py-4">
              <h1 className="text-xl font-semibold line-clamp-4">
                {result.event_name}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-lightBlue">
                  <SlCalender />
                </span>
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lightBlue">
                  <FaClock />
                </span>
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lightBlue">
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
                <div key={idx} className="flex flex-col my-2">
                  <div className="flex items-center gap-4">
                    <div className="relative w-[35px] h-[35px] rounded-full overflow-hidden">
                      <Image
                        src={item.user.avatar}
                        alt={item.user.firstName}
                        fill
                      />
                    </div>
                    <div className="flex flex-col">
                      <span>
                        {item.user.firstName} {item.user.lastName}
                      </span>
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                    <div className="flex">
                      <StarDisplay rate={item.rating} />
                    </div>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.comment }}
                    className="mt-2 indent-4"
                  />
                </div>
              );
            })}
        </div>
        <div className="shadow-xl rounded-md my-4 p-4">
          <h1 className="font-semibold text-2xl mb-4 text-center">
            Rate and drop your comment here
          </h1>
          <FormReview eventId={params.eventId} />
        </div>
      </div>
    </main>
  );
}
