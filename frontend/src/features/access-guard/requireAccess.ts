import { requestUserServer } from "@/entities/user";
import { ROUTES } from "@/shared/routes/routes";
import { redirect } from "next/navigation";
import type { UserRole } from "@/entities/user";
type AccessKey = UserRole | "guest";

export async function requireAccess(access: AccessKey) {
  const user = await requestUserServer();

  if (access === "guest") {
    if (user) {
      redirect(ROUTES[user.role]);
    }
    return null;
  }

  if (!user) {
    redirect(ROUTES.login);
  }

  if (user.role !== access) {
    redirect(ROUTES.forbidden);
  }

  return user;
}
