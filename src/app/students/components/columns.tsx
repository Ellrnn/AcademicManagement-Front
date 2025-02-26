"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Student } from "../services/ApiService";
import { format } from "date-fns";
import { EditStudentAction } from "./EditStudentAction";
import { DeleteStudentAction } from "./DeleteStudentAction";
import { EnrollStudentCourse } from "./EnrollStudentCourse";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

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
    id: "actions1",
    cell: ({ row }) => {
      return <EditStudentAction student={row.original} />;
    },
  },
  {
    id: "actions2",
    cell: ({ row }) => {
      return <EnrollStudentCourse student={row.original} />;
    },
  },
  {
    id: "actions3",
    cell: ({ row }) => {
      return <DeleteStudentAction student={row.original} />;
    },
  },
];
