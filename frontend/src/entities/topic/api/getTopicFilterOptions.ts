import {
  TOPIC_STUDENT_FILTER_OPTIONS_ENDPOINT,
  TOPIC_TEACHER_FILTER_OPTIONS_ENDPOINT,
} from "@/entities/topic/api/constants";
import type {
  StudentTopicsFilterOptions,
  TeacherTopicsFilterOptions,
} from "@/entities/topic/api/types";
import { authClient } from "@/shared/api";

export const getTeacherTopicFilterOptions = () => {
  return authClient.get<TeacherTopicsFilterOptions>(
    TOPIC_TEACHER_FILTER_OPTIONS_ENDPOINT,
  );
};

export const getStudentTopicFilterOptions = () => {
  return authClient.get<StudentTopicsFilterOptions>(
    TOPIC_STUDENT_FILTER_OPTIONS_ENDPOINT,
  );
};
