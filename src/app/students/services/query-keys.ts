export const QueryKey = {
  COURSES: ["courses"],
  STUDENTS: ["students"],
  ENROLLED_STUDENTS: ["enrolled-students"],
  COURSE_STUDENTS: (courseId: string) => ["course-students", courseId],
};
