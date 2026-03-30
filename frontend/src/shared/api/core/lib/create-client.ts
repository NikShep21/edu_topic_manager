import { HttpClient } from "../http-client";

export const fetchClient = new HttpClient("/api/", {
  credentials: "include",
  headers: {
    Accept: "application/json",
  },
});
