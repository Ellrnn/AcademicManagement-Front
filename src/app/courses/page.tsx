"use client";
import { DataTableCourses } from "./components/DataTableCourses";

export default function CoursesPage() {
  return (
    <div className="flex flex-col container mx-10 py-10">
      Cursos
      <DataTableCourses />
    </div>
  );
}
