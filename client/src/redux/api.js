import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

export const signin = (formData) => API.post("/users/signin", formData);
