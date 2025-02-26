"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Course } from "../Services/ApiService";
import { DeleteCourseAction } from "./DeleteCourseAction";
import { EditCourseAction } from "./EditCourseAction";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "name",
    header: "Curso",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    id: "edit-action",
    cell: ({ row }) => {
      return <EditCourseAction course={row.original} />;
    },
  },
  {
    id: "delete-action",
    cell: ({ row }) => {
      return <DeleteCourseAction course={row.original} />;
    },
  },
  {
    id: "route-action",
    cell: ({ row }) => {
      return (
        <Link
          href={`/courses/${row.original.id}`}
          className="flex items-center gap-2"
        >
          <SquareArrowOutUpRight color="blue" className="h-4 w-4" />
        </Link>
      );
    },
  },
];
