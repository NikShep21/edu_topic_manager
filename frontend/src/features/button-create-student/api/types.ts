export interface createStudentRequest {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  group: string;
  course: number;
  role: "student";
}
