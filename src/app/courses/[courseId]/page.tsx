"use client";

import { use } from "react";
import { DataTableStudentsInCourse } from "./DataTableStudentsInCourse";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/app/students/services/query-keys";
import { getCourses } from "../Services/ApiService";

export default function Course({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const { data } = useQuery({
    queryKey: QueryKey.COURSES,
    queryFn: () => getCourses(),
  });

  const currentCourse = data?.data.find((course) => course.id === courseId);

  return (
    <div className="flex flex-col container mx-10 py-10">
      <span className="text-lg">Alunos do curso de {currentCourse?.name}</span>
      {currentCourse?.description}
      <DataTableStudentsInCourse courseId={courseId} />
    </div>
  );
}
