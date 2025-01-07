import axios from "axios";

const BASEURL = "https://hypetix-back.vercel.app/api";

export default axios.create({
  baseURL: BASEURL,
});
