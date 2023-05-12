import axios from "axios";

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: RAWG_API_KEY,
  },
  withCredentials: false,
});
