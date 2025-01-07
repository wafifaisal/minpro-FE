import PayButton from "@/components/midtrans/payBtn";
import CountDown from "@/components/order/CountDown";
import { formatCurrency, formatDate, formatTime } from "@/helpers/formatDate";
import { getOrderDetail } from "@/lib/order";
import { IOrder } from "@/types/order";
import Image from "next/image";
import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

export default async function OrderPage({
  params,
}: {
  params: { orderId: number };
}) {
  const order: IOrder = await getOrderDetail(+params.orderId);

  return (
    <main className="flex gap-16 h-min-screen tablet:flex-row flex-col sm:px-10 tablet:px-20 py-4 bg-gradient-to-tl  from-blue-500 via-black to-black text-white">
      <CountDown expiredAt={order.expiredAt} />
      <div className="tablet:w-[60%]">
        <h1 className="text-2xl font-semibold my-2">Order Details</h1>
        <div className="rounded-md border-white border p-3 tablet:mb-4">
          <div className="flex gap-4 py-4">
            <div className="w-44 min-h-full rounded-md overflow-hidden relative">
              <Image
                src={order.Order_Details[0].Ticket.Event.event_thumbnail}
                alt={order.Order_Details[0].Ticket.Event.event_name}
                fill
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold line-clamp-1">
                {order.Order_Details[0].Ticket.Event.event_name}
              </span>
              <span className="flex items-center gap-2">
                <SlCalender className="text-lightBlue" />
                {formatDate(order.Order_Details[0].Ticket.Event.event_date)}
              </span>
              <span className="flex items-center gap-2">
                <FaClock className="text-lightBlue" />
                {formatTime(
                  order.Order_Details[0].Ticket.Event.start_time
                )} - {formatTime(order.Order_Details[0].Ticket.Event.end_time)}
              </span>
              <span className="line-clamp-1 flex items-center gap-2">
                <FaLocationDot className="text-lightBlue" />
                {order.Order_Details[0].Ticket.Event.location},{" "}
                {order.Order_Details[0].Ticket.Event.venue}
              </span>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-t border-b border-white">
                <th className="py-2 text-start px-7">Ticket Type</th>
                <th className="text-end px-7">Price</th>
                <th className="text-end px-7">Amount</th>
              </tr>
            </thead>
            <tbody>
              {order.Order_Details.map((ticketOrder, idx) => {
                const totalForThisTicket =
                  ticketOrder.Ticket.price * ticketOrder.quantity;

                return (
                  <tr key={idx} className="">
                    <td className="text-start flex items-center gap-4 py-3 px-5">
                      <div className="py-3 px-10 border-dashed border border-blue-500 rounded-sm">
                        <span>{ticketOrder.Ticket.category}</span>
                      </div>
                      <div className="absolute border p-2 bg-black rounded-full border-dashed border-blue-500 -translate-x-[10px] border-l-0 border-y-0" />
                      <div className="relative border p-2 bg-black rounded-full border-dashed border-blue-500 right-6 border-r-0 border-y-0" />
                    </td>
                    <td className="text-end px-5">
                      {formatCurrency(ticketOrder.Ticket.price)}
                    </td>
                    <td className="text-end">
                      x{ticketOrder.quantity} ={" "}
                      {formatCurrency(totalForThisTicket)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col rounded-md shadow-xl py-6 px-4 tablet:w-[40%] gap-2">
        <h1 className="text-2xl font-semibold mb-2">Price Details</h1>
        <div className="flex justify-between items-center">
          <span>Total Ticket Price</span>{" "}
          <span>{formatCurrency(order.total_price)}</span>
        </div>

        {order.userPoint > 0 && (
          <div className="flex justify-between items-center">
            <span>Points</span>
            <span className="font-semibold text-red-500">
              - {formatCurrency(order.userPoint)}
            </span>
          </div>
        )}
        {order.userCoupon && (
          <div className="flex justify-between items-center">
            <span>Coupon</span>
            <span className="font-semibold text-red-500">
              - {formatCurrency((order.total_price - order.userPoint) / 10)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center font-semibold text-xl border-t border-b py-2">
          <span>Total Payment</span>
          <span>{formatCurrency(order.final_price)}</span>
        </div>
        <PayButton
          total_price={order.total_price}
          final_price={order.final_price}
          orderId={params.orderId}
          userPoint={order.userPoint}
        />
      </div>
    </main>
  );
}
