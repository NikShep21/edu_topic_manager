import { ADMIN_ROUTES } from "@/app/admin/_config/routes";
import { redirect } from "next/navigation";

const page = () => {
  redirect(ADMIN_ROUTES.default);
  return null;
};

export default page;
