import { IEvent } from "@/types/event";

export default function Preview({ result }: { result: IEvent }) {
  // Function to convert YouTube link to embed format
  const getEmbedUrl = (url: string): string => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]{11})|youtu\.be\/([\w-]{11})/;
    const match = url.match(regex);
    const videoId = match?.[1] || match?.[2];
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&color=white`
      : "";
  };

  const embedUrl = getEmbedUrl(result.event_preview);

  return (
    <div className="py-20 md:py-40">
      <div className="max-w-full mx-auto px-5 ">
        <div className="grid grid-cols-1 items-center">
          {/* "Preview" text aligned to the left */}
          <h2 className="text-3xl md:text-4xl font-semibold text-white  py-5 ">
            Preview
          </h2>

          {/* Video centered in its column */}
          <div className="flex justify-center items-center ">
            {embedUrl ? (
              <iframe
                className="w-full max-w-[900px] aspect-video rounded-lg shadow-lg"
                src={embedUrl}
                title="Event Preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p className="text-white text-lg">No preview available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
