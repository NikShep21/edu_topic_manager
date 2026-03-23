import { redirect } from "next/navigation";
import { ROUTES } from "@/shared/routes/routes";

export default function HomePage() {
  redirect(ROUTES.login);
}
