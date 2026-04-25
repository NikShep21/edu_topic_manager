export interface CreateStudentRequest {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  group: string;
  course: number;
  role: "student";
}
