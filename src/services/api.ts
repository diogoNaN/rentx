import axios from "axios";

const { API_URL } = process.env;
const { API_PORT } = process.env;

const baseURL = API_URL + ":" + API_PORT;

console.log(baseURL);

export const api = axios.create({
  baseURL,
});
