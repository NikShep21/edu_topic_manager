import type { StudentData, TeacherData } from "@/entities/user";

export type TopicType = "vkr" | "coursework";

export type TopicStatus = "available" | "pending_approval" | "assigned";

export type TopicApplicationStatus = "pending" | "approved" | "rejected";

export interface TopicStep {
  order: number;
  title: string;
}

export interface TopicFile {
  id: number;
  name: string;
  url: string;
  size: number;
}

export interface Topic {
  id: number;
  title: string;
  description: string;
  type: TopicType;
  status: TopicStatus;
  created_at: string;
  teacher: TeacherData;
  student: StudentData | null;
  steps?: TopicStep[];
  files?: TopicFile[];
}
