import { academicAPI } from "@/lib/api";

export type StudentInput = Omit<Student, "id">;

export type PartialStudent = Partial<Omit<Student, "id">>;

export type Student = {
  id: string;
  name: string;
  email: string;
  dateBirth: string;
};

export type Enrollment = {
  studentId: string;
  courseId: string[];
};

export type GetStudents = Student[];

export type GetCourseStudents = ({ enrollmentId: string } & Student)[];

export async function getStudents() {
  return academicAPI.get<GetStudents>("/Students");
}

export async function registerStudent(
  name: string,
  email: string,
  dateBirth: string
) {
  return academicAPI.post<StudentInput>("/Students", {
    name,
    email,
    dateBirth,
  });
}

export async function editStudent(studentId: string, data: PartialStudent) {
  return academicAPI.patch<Student>(`/Students/${studentId}`, data);
}

export async function deleteStudent(studentId: string) {
  return academicAPI.delete<Student>("/Students", {
    params: { studentId },
  });
}

export async function enrollStudentInCourse(
  studentId: string,
  courseIds: string[]
) {
  return academicAPI.post<Enrollment>("/enrollments", {
    studentId,
    courseIds,
  });
}

export async function getEnrolledStudents() {
  return academicAPI.get<GetCourseStudents>("/enrolledStudents");
}

export async function deleteEnrollment(enrollmentId: string) {
  return academicAPI.delete<Enrollment>("/enrollments", {
    params: { enrollmentId },
  });
}
