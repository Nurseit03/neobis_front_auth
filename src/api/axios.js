import axios from "axios";

const BASE_URL = "http://34.159.48.221/auth";
const API_URL = "http://localhost:3000/";

export default axios.create({
    withCredentials: true,
    baseURL: BASE_URL,  
    headers: {
      "Content-Type": "application/json"
    }
  });
