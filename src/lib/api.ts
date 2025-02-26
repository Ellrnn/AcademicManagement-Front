import axios from "axios";

export const academicAPI = axios.create({
  baseURL: "https://academicmanagement-production.up.railway.app",
});
