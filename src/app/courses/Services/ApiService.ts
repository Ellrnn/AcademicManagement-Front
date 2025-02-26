import { GetCourseStudents } from "@/app/students/services/ApiService";
import { academicAPI } from "@/lib/api";

export type CourseInput = Omit<Course, "id">;

export type PartialCourse = Partial<Omit<Course, "id">>;

export type Course = {
  id: string;
  name: string;
  description: string;
};

export type GetCourses = Course[];

export async function getCourses() {
  return academicAPI.get<GetCourses>("/Courses");
}

export async function createCourse(name: string, description: string) {
  return academicAPI.post<CourseInput>("/Courses", { name, description });
}

export async function editCourse(courseId: string, data: PartialCourse) {
  return academicAPI.patch<Course>(`/Courses/${courseId}`, data);
}

export async function deleteCourse(courseId: string) {
  return academicAPI.delete<Course>("/Courses", {
    params: { courseId },
  });
}

export async function getCourseStudents(courseId: string) {
  return academicAPI.get<GetCourseStudents>("/coursesStudents", {
    params: { courseId },
  });
}
