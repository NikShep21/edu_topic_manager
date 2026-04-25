import { redirect } from "next/navigation";

import { ADMIN_ROUTES } from "@/app/admin/_config/routes";

const Page = () => {
  redirect(ADMIN_ROUTES.default);
  return null;
};

export default Page;
