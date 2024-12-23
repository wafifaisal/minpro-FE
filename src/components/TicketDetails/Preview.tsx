import { IEvent } from "@/types/event";

export default function Preview({ result }: { result: IEvent }) {
  // Function to convert YouTube link to embed format
  const getEmbedUrl = (url: string): string => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]{11})|youtu\.be\/([\w-]{11})/;
    const match = url.match(regex);
    const videoId = match?.[1] || match?.[2];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  const embedUrl = getEmbedUrl(result.event_preview);

  return (
    <div className="py-40">
      <div className="max-w-full mx-auto text-start px-10">
        <div className="flex flex-col md:flex-row justify-start mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mr-8 py-3 md:py-5">
            Preview
          </h2>
          <div className="flex justify-center items-center px-0 lg:px-64">
            {embedUrl ? (
              <iframe
                className="w-full md:w-[560px] md:h-[315px] aspect-video"
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
