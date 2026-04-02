export type UserRole = "admin" | "student" | "teacher";

export interface UserData {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  middle_name: string;

  role: UserRole;
}
