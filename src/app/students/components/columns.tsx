"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Student } from "../services/ApiService";
import { format } from "date-fns";
import { EditStudentAction } from "./EditStudentAction";
import { DeleteStudentAction } from "./DeleteStudentAction";
import { EnrollStudentCourse } from "./EnrollStudentCourse";
import { NotEnrolled } from "./EnrolledStudents";

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "Data",
    accessorKey: "dateBirth",
    header: "Data de Nascimento",
    cell: ({ row }) => (
      <div className="text-center lowercase">
        {format(new Date(row.original.dateBirth), "dd/MM/yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    id: "EditAction",
    cell: ({ row }) => {
      return <EditStudentAction student={row.original} />;
    },
  },
  {
    id: "EnrollAction",
    cell: ({ row }) => {
      return <EnrollStudentCourse student={row.original} />;
    },
  },
  {
    id: "BagdeAction",
    cell: ({ row }) => {
      return <NotEnrolled student={row.original} />;
    },
  },
  {
    id: "DeleteAction",
    cell: ({ row }) => {
      return <DeleteStudentAction student={row.original} />;
    },
  },
];
