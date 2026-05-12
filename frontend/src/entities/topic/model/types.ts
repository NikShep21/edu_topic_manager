export type TopicType = "vkr" | "coursework";

export type TopicStatus = "available" | "pending_approval" | "assigned";

export type TopicApplicationStatus = "pending" | "approved" | "rejected";

export interface TopicPerson {
  id: number;
  fullName: string;
}

export interface TopicStudent extends TopicPerson {
  course?: number;
  group?: string;
}

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
  createdAt: string;
  teacher: TopicPerson;
  student: TopicStudent | null;
  steps?: TopicStep[];
  files?: TopicFile[];
}
