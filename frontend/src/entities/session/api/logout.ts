import { LOGOUT_PATH } from "@/entities/session/api/constants";
import { fetchClient } from "@/shared/api";

export async function logout() {
  await fetchClient.post(LOGOUT_PATH);
}
