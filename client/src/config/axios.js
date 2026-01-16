import axios from 'axios';

// import.meta.env.VITE_BACKEND_URL

const api = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,  // send cookies with request
});

export default api;