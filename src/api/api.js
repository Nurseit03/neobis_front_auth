import axios from "axios";

const BASE_URL = "http://34.159.48.221";
const baseURL = "http://16.171.11.58/api/v1/account/";

export default axios.create({
    baseURL: baseURL,  
    headers: {
      "Content-Type": "application/json"
    }
  });
