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
    <main className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 min-h-screen">
      <div className="sm:mx-8 md:mx-16 lg:mx-32 xl:mx-40 py-10 space-y-10">
        {/* Event Header */}
        <div className="rounded-lg shadow-lg overflow-hidden bg-gray-800">
          <div className="relative w-full h-60 sm:h-72 md:h-96 group">
            <Image
              src={result.event_thumbnail}
              alt={result.event_name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-blue-400 hover:underline">
              {result.event_name}
            </h1>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-lg">
                <SlCalender className="text-blue-500" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <FaClock className="text-blue-500" />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <FaLocationDot className="text-blue-500" />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <div>
          <h1 className="text-3xl font-bold text-blue-400 mb-6">Comments</h1>
          {dataReviews.result.length ? (
            dataReviews.result.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4 hover:bg-gray-700 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
                    <Image
                      src={item.user.avatar}
                      alt={item.user.firstName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      {item.user.firstName} {item.user.lastName}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <StarDisplay rate={item.rating} />
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: item.comment }}
                  className="mt-3 text-gray-300 text-sm leading-relaxed"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-lg">
              No comments yet. Be the first to share your thoughts!
            </p>
          )}
        </div>

        {/* Review Form */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-blue-400 mb-4">
            Share Your Thoughts
          </h2>
          <FormReview id={params.id} />
        </div>
      </div>
    </main>
  );
}
