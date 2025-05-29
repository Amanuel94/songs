import axios from "axios";
import { BASE_URL } from "constants/index";
// import useLocalStorage from "hooks/useLocalStorage";

const header = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const client = axios.create({
  baseURL: BASE_URL,
  headers: header,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      return Promise.resolve({
        status: response.status,
        data: response.data,
      });
    } else {
      return Promise.resolve({
        status: 500,
        message: "Network Error",
      });
    }
  }
);

// client.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = useLocalStorage("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export { client };
