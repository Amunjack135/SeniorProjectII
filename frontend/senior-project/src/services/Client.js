import axios from "axios"

const client = axios.create({
  baseURL: "https://iotaspheresystems.com/proxyhost/senior-project-2",
});

export default client;
