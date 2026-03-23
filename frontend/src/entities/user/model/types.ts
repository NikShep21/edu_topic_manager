export type UserRole = "admin" | "student" | "teacher";

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  middle_name: string;
  role: UserRole;
}
