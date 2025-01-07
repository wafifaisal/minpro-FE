"use client";
import axios from "@/helpers/axios";
import { getSnapToken } from "@/lib/order";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  total_price: number;
  final_price: number;
  orderId: number;
  userPoint: number;
}

export default function PayButton({
  total_price,
  final_price,
  orderId,
}: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const token = await getSnapToken(
        final_price,
        Number(orderId),
        total_price
      );
      window.snap.pay(token);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const freeTransaction = async () => {
    const resBody = {
      transaction_status: "settlement",
      order_id: orderId,
    };

    try {
      const { data } = await axios.post("/order/midtrans-webhook", resBody);
      router.push(`/`);
      toast.success(data.message);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during payment";
      toast.error(errorMessage || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 my-4">
      {/* Conditional Button Rendering */}
      {total_price > 0 ? (
        <button
          onClick={handleClick}
          disabled={isLoading}
          className={`py-3 px-6 bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white rounded-lg shadow-lg text-lg font-semibold transition-transform transform ${
            isLoading
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105 hover:shadow-xl"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center space-x-2">
              <span className="spinner-border animate-spin w-5 h-5 border-t-2 border-l-2 rounded-full"></span>
              <span>Processing Payment...</span>
            </span>
          ) : (
            "Buy Ticket"
          )}
        </button>
      ) : (
        <button
          onClick={freeTransaction}
          disabled={isLoading}
          className={`py-3 px-6 bg-gradient-to-r from-green-600 via-green-500 to-lime-400 text-white rounded-lg shadow-lg text-lg font-semibold transition-transform transform ${
            isLoading
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105 hover:shadow-xl"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center space-x-2">
              <span className="spinner-border animate-spin w-5 h-5 border-t-2 border-l-2 rounded-full"></span>
              <span>Processing...</span>
            </span>
          ) : (
            "Get For Free"
          )}
        </button>
      )}

      {/* Informational Text */}
      <p className="text-gray-300 text-sm italic">
        {isLoading
          ? "Please wait while we process your request."
          : total_price > 0
          ? "Secure your ticket by making the payment."
          : "Enjoy your free ticket now!"}
      </p>
    </div>
  );
}
