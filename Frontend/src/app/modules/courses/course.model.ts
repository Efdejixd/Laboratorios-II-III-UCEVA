export interface Course {
  id: number;
  name: string;
  description: string;
  credits: number;
  semester: number;
  status: boolean;
}
export type CoursePayload = Omit<Course, "id">;
export type CreateCoursePayload = CoursePayload;
