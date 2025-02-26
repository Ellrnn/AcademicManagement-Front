"use client";

import { ColumnDef } from "@tanstack/react-table";
import { GetCourseStudents } from "@/app/students/services/ApiService";
import { format } from "date-fns";
import { DeleteEnrollment } from "./DeleteEnrollment";

export const columns: ColumnDef<GetCourseStudents[number]>[] = [
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
    id: "route-action",
    cell: ({ row }) => {
      return <DeleteEnrollment courseStudent={row.original} />;
    },
  },
];
