import axios from "axios";
export default axios.create({
  baseURL: "https://languageapi.andantv.com/api/",
  headers: {
    "Content-type": "application/json"
  }
});