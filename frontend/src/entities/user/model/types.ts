export type UserRole = "Admin" | "Student" | "Teacher";

export interface UserData {
  firstName: string;
  lastName: string;
  role: UserRole;
}
