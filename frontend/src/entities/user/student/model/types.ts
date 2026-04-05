import type { StudentData } from "@/entities/user/base/model/types";

export type StudentTableItem = Omit<StudentData, "role" | "username">;
