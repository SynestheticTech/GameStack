import axios from "axios";

const RAWG_API_KEY = process.env.VITE_RAWG_API_KEY;

console.log("RAWG_API_KEY :>> ", RAWG_API_KEY);

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: RAWG_API_KEY,
  },
  withCredentials: false,
});
