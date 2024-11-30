import { CardUI } from "@/components/ui/CardUI";
import HeroSlider from "@/components/HeroSlider";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <div className="text-2xl text-white font-bold px-20 py-40 bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-black">
        <div>
          <h2>Concert</h2>
          <CardUI />
          <h2>Sports</h2>
          <h2>Theater</h2>
          <h2>Family</h2>
        </div>
      </div>
    </div>
  );
}
