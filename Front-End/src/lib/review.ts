import axios from "@/helpers/axios";

export const getReviews = async (id: string) => {
  try {
    const { data } = await axios.get(`/reviews/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};
