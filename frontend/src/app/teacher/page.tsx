import { TEACHER_ROUTES } from "@/app/teacher/_config/routers";
import { redirect } from "next/navigation";

const page = () => {
  redirect(TEACHER_ROUTES.default);
  return null;
};

export default page;
