import axios from "@/helpers/axios";

export const getTickets = async (id: string) => {
  try {
    const { data } = await axios.get(`/tickets/${id}`);
    return data.result;
  } catch (err) {
    console.log(err);
  }
};
