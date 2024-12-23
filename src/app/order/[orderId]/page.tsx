import PayButton from "@/components/midtrans/payBtn";
import { formatCurrency, formatDate, formatTime } from "@/helpers/formatDate";
import { getSnapToken, getOrderDetail } from "@/lib/order";
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
  const order: IOrder = await getOrderDetail(params.orderId);

  const token: string = await getSnapToken(order.final_price, params.orderId);
  return (
    <main className="flex gap-16 tablet:flex-row flex-col sm:px-10 tablet:px-20 py-4">
      <div className="tablet:w-[60%]">
        <h1 className="text-2xl font-semibold my-2">Detail Pemesanan</h1>
        <div className="rounded-md border p-3 tablet:mb-4">
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
                {order.Order_Details[0].Ticket.Event.location}
                {order.Order_Details[0].Ticket.Event.venue}
              </span>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-t border-b border-black/50">
                <th className="py-2 text-start">Jenis Tiket</th>
                <th className="text-end">Harga</th>
                <th className="text-end">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {order.Order_Details.map((ticketOrder, idx) => {
                const totalForThisTicket =
                  ticketOrder.Ticket.price * ticketOrder.quantity;

                return (
                  <tr key={idx}>
                    <td className="text-start flex items-center gap-2">
                      <span>
                        <Image
                          src={`https://assets.loket.com/web/assets/img/ic-ticket-widget.svg`}
                          alt="Icon"
                          width={40}
                          height={40}
                        />
                      </span>
                      <span>{ticketOrder.Ticket.category}</span>
                    </td>
                    <td className="text-end">
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
        {/* <h1 className="text-2xl font-semibold">Metode Pembayaran</h1> */}
        {/* <div id="snap-container"></div> */}
      </div>
      <div className="flex flex-col rounded-md shadow-xl py-6 px-4 tablet:w-[40%] gap-2">
        <h1 className="text-2xl font-semibold mb-2">Detail Harga</h1>
        <div className="flex justify-between items-center">
          <span>Total Harga Tiket</span>{" "}
          <span>{formatCurrency(order.total_price)}</span>
        </div>
        {/* <div><span>Biaya Tambahan</span></div>
        <div><span>Biaya Platform</span></div> */}
        <div className="flex justify-between items-center font-semibold text-xl border-t border-b py-2">
          <span>Total Bayar</span>
          <span>{formatCurrency(order.final_price)}</span>
        </div>
        {/* <button className="py-2 bg-lightBlue text-white font-semibold rounded-md">Bayar Tiket</button> */}
        <PayButton token={token} />
      </div>
    </main>
  );
}
