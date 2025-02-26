"use client";

import { DataTableStudents } from "./components/DataTableStudents";

export default function StudentsPage() {
  return (
    <div className="flex flex-col container mx-10 py-10">
      Alunos
      <DataTableStudents />
    </div>
  );
}
