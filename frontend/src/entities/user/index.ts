import type { StudentData, TeacherData, UserData, UserRole } from "./base/model/types";

export type { StudentData, TeacherData, UserData, UserRole };
export { getFullName } from "./base/lib/getFullName";
export { UserBadge } from "./current/ui/user-badge/UserBadge";

export type CurrentUserData = UserData | StudentData | TeacherData;
