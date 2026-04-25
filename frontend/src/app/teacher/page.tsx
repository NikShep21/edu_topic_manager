import { TEACHER_ROUTES } from "@/app/teacher/_config/routes";
import { redirect } from "next/navigation";

const Page = () => {
  redirect(TEACHER_ROUTES.default);
  return null;
};

export default Page;
