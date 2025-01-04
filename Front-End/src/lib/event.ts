import axios from "@/helpers/axios";

export const getEvent = async () => {
  try {
    const { data } = await axios.get(`/events`);
    return data.events;
  } catch (err) {
    console.log(err);
  }
};

export const getEventbyID = async (id: string) => {
  try {
    const { data } = await axios.get(`/events/${id}`);
    return data.result;
  } catch (err) {
    console.log(err);
  }
};
