import { STUDENT_ROUTES } from "@/app/student/_config/routes";
import { redirect } from "next/navigation";

const page = () => {
  redirect(STUDENT_ROUTES.default);
  return null;
};

export default page;
