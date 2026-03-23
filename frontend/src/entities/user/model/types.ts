export type UserRole = "Admin" | "Student" | "Teacher";

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  middle_name: string;
  role: UserRole;
}
