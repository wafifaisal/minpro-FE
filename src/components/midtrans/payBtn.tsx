"use client";

export default function PayButton({ token }: { token: string }) {
  const handleClick = async () => {
    window.snap.pay(token);
  };
  return (
    <button
      onClick={handleClick}
      className="py-2 bg-gradient-to-l from-blue-500 to-black shadow-xl text-white font-semibold rounded-md"
    >
      Buy Ticket
    </button>
  );
}
