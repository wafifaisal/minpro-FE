"use client";

export default function PayButton({ token }: { token: string }) {
  const handleClick = async () => {
    window.snap.pay(token);
  };
  return (
    <button
      onClick={handleClick}
      className="py-2 bg-blue-400 text-white font-semibold rounded-md"
    >
      Bayar Tiket
    </button>
  );
}
