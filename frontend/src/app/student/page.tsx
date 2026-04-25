import { redirect } from "next/navigation";

import { STUDENT_ROUTES } from "@/app/student/_config/routes";

const Page = () => {
  redirect(STUDENT_ROUTES.default);
  return null;
};

export default Page;
