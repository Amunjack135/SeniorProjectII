import axios from "axios"
import https from "https";

const client = axios.create({
  baseURL: "https://136.113.13.184",
});

export default client;
