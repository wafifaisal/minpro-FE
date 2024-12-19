import { IEvent } from "@/types/event";
import Image from "next/image";
import LocationAndTime from "./LocationAndTime";

export default function HeroSection({ result }: { result: IEvent }) {
  return (
    <div className="relative w-full h-[75vh] md:h-screen">
      <Image
        src={result.event_thumbnail}
        alt={result.event_name}
        width={1200}
        height={800}
        className="w-full object-fill h-full"
        priority
      />
      <div className="absolute left-1/2 transform -translate-x-1/2 z-30 -my-10 md:-my-24 hollow-text ">
        HYPETIX
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-center py-8">
        <h1 className="text-3xl md:text-5xl font-bold hollow-text py-5">
          {result.event_name}
        </h1>
        <LocationAndTime result={result} />
      </div>
    </div>
  );
}
