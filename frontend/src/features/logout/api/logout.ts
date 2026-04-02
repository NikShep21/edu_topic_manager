import { LOGOUT_PATH } from "@/features/logout/api/constants";
import { fetchClient } from "@/shared/api";

export async function logout() {
  await fetchClient.post(LOGOUT_PATH);
}
