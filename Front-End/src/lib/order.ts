import axios from "@/helpers/axios";

export async function getOrderDetail(orderId: number) {
  try {
    const { data } = await axios.get(`/order/${orderId}`);
    return data?.result;
  } catch (err) {
    console.log(err);
  }
}

export async function getSnapToken(orderId: number, gross_amount: number) {
  try {
    const { data } = await axios.post("/order/payment", {
      orderId: orderId,
      gross_amount: gross_amount,
    });
    return data.result;
  } catch (err) {
    console.log("Error fetching snap token:", err);
  }
}
