export interface CreateTeacherRequest {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  academic_degree: string;
  academic_title: string;
  job_title: string;
  role: "teacher";
}
