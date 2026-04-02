import { HttpClient } from "../httpClient";

export const fetchClient = new HttpClient("/api/", {
  credentials: "include",
  headers: {
    Accept: "application/json",
  },
});
