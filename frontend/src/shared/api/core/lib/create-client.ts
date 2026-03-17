import { HttpClient } from "../http-client";

export const apiClient = new HttpClient("/api", {
  credentials: "include",
  headers: {
    Accept: "application/json",
  },
});
