export const QueryKey = {
  COURSES: ["courses"],
  STUDENTS: ["students"],
  COURSE_STUDENTS: (courseId: string) => ["course-students", courseId],
};
