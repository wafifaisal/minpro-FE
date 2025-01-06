import axios from "@/helpers/axios";

export async function getOrderDetail(orderId: number) {
  try {
    const { data } = await axios.get(`/order/${orderId}`);
    return data?.result;
  } catch (err) {
    console.log(err);
  }
}

export async function getSnapToken(
  gross_amount: number,
  orderId: number,
  total_price: number
) {
  try {
    const { data } = await axios.post(
      "/order/payment",
      {
        gross_amount: gross_amount,
        orderId: orderId,
        total_price: total_price,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return data.result;
  } catch (err) {
    console.log("Error fetching snap token:", err);
  }
}

export async function getCoupon() {
  try {
    const { data } = await axios.get("/userp/coupon", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return data.result;
  } catch (err) {
    console.log(err);
  }
}

export async function getPoints() {
  try {
    const { data } = await axios.get("/userp/points", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return data.result || 0;
  } catch (err) {
    console.log(err);
  }
}
