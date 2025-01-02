import axios from "@/helpers/axios";

export const getReviews = async (eventId: string) => {
  try {
    const { data } = await axios.get(`/reviews/${eventId}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};
