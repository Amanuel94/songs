import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "constants/index";

const header = {
  "content-type": "application/json",
  accept: "application/json",
};

export class HttpClient {
  private client: AxiosInstance;

  constructor(token?: string) {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: header,
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        if (response) {
          return Promise.resolve({
            status: response.status,
            message: response.data?.message || "An error occurred",
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

    if (token) {
      this.setAuthToken(token);
    }
  }

  setAuthToken(token: string) {
    this.client.interceptors.request.use(
      (config) => {
        try {
          config.headers["Authorization"] = `Bearer ${token}`;
        } catch (error) {
          console.log(error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  get instance() {
    return this.client;
  }
}

const client = new HttpClient();
const instance = client.instance;
export { client, instance };
