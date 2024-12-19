import axios from "@/helpers/axios";

export const getEvent = async (sorts: string = "asc") => {
  try {
    const { data } = await axios.get(`/events/?sorts=${sorts}`);
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
