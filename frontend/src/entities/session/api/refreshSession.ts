import { REFRESH_SESSION_PATH } from "./constants";
import { fetchClient } from "@/shared/api";

interface RefreshSessionResponse {
  success: boolean;
  message: string;
}

export async function refreshSession() {
  return fetchClient.post<RefreshSessionResponse>(REFRESH_SESSION_PATH);
}
