import axios from "@/helpers/axios";
import { getSnapToken } from "@/lib/order";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  total_price: number;
  final_price: number;
  orderId: number;
}

export default function PayButton({
  total_price,
  final_price,
  orderId,
}: IProps) {
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = async () => {
    if (total_price) {
      try {
        SetIsLoading(true);
        const token = await getSnapToken(final_price, Number(orderId));
        window.snap.pay(token);
      } catch (err) {
        console.log(err);
      } finally {
        SetIsLoading(false);
      }
    }
  };

  const freeTransaction = async () => {
    const resBody = {
      status: "settlement",
      order_id: orderId,
    };
    try {
      const { data } = await axios.post("/order/midtrans-webhook", resBody);
      router.push("/");
      toast.success(data.message);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during login.";
      toast.error(errorMessage || "An error occurred", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="py-2 bg-gradient-to-l from-blue-500 to-black shadow-xl text-white font-semibold rounded-md"
    >
      {isLoading ? "Loading ..." : "Buy Ticket"}
      <button
        onClick={freeTransaction}
        className="py-2 bg-gradient-to-l from-blue-500 to-black shadow-xl text-white font-semibold rounded-md"
      >
        {isLoading ? "Loading ..." : "Get For Free"}
      </button>
    </button>
  );
}
