import { CardUI } from "@/components/ui/CardUI";
import HeroSlider from "@/components/HeroSlider";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  const cardsData = [
    {
      title: "Concert",
      description: "Enjoy live music and performances.",
      imageUrl:
        "https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      hoverImageUrl:
        "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif",
    },
    {
      title: "Sports",
      description: "Get into the action with live sports.",
      imageUrl:
        "https://images.unsplash.com/photo-1504626835342-6b01071d182e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwb3B1bGFyfHx8fGVufHx8fHx8MTY0OTUzNjU2OQ&ixlib=rb-1.2.1&q=80&w=1080",
      hoverImageUrl: "https://i.giphy.com/media/3o7abldj0b3rxrZUxW/giphy.gif",
    },
    {
      title: "Theater",
      description: "Experience drama and storytelling.",
      imageUrl:
        "https://images.unsplash.com/photo-1594938298609-05c4212cb750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwb3B1bGFyfHx8fGVufHx8fHx8MTY0OTUzNjU2OQ&ixlib=rb-1.2.1&q=80&w=1080",
      hoverImageUrl: "https://i.giphy.com/media/xUPGcGmDg9IKexTHS8/giphy.gif",
    },
    {
      title: "Socials",
      description: "Fun activities for all ages.",
      imageUrl:
        "https://images.unsplash.com/photo-1535543669007-c994ab7fdbb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwb3B1bGFyfHx8fGVufHx8fHx8MTY0OTUzNjU2OQ&ixlib=rb-1.2.1&q=80&w=1080",
      hoverImageUrl: "https://i.giphy.com/media/l0HlMWkGPP8WiIQaU/giphy.gif",
    },
  ];

  return (
    <div>
      <Navbar />
      <HeroSlider />
      <div className="text-2xl text-white font-bold px-20 py-40 bg-black">
        {cardsData.map((card, index) => (
          <div key={index}>
            <h2>{card.title}</h2>
            <CardUI
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              hoverImageUrl={card.hoverImageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
