export type UserRole = "admin" | "student" | "teacher";

export interface UserData {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  role: UserRole;
}

export interface AdminData extends UserData {
  role: "admin";
}

export interface StudentData extends UserData {
  group: {
    name: string;
    id: number;
  };
  course: number;

  role: "student";
}

export interface TeacherData extends UserData {
  academic_degree: {
    id: number;
    name: string;
  };
  academic_title: {
    id: number;
    name: string;
  };
  job_title: {
    id: number;
    name: string;
  };
  role: "teacher";
}
