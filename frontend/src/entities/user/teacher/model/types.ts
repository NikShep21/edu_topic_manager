import type { TeacherData } from "@/entities/user/base/model/types";

export type TeacherTableItem = Omit<TeacherData, "username" | "role">;
