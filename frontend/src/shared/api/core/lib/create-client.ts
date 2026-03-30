import { BACKEND_URL } from "@/shared/api/core/lib/url";
import { HttpClient } from "../http-client";

export const fetchClient = new HttpClient(BACKEND_URL, {
  credentials: "include",
  headers: {
    Accept: "application/json",
  },
});
