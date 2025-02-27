import { useQuery } from "@tanstack/react-query";
import { getEnrolledStudents, Student } from "../services/ApiService";
import { QueryKey } from "../services/query-keys";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";

export function NotEnrolled({ student }: { student: Student }) {
  const { data: enrolledStudent, isLoading } = useQuery({
    queryKey: QueryKey.ENROLLED_STUDENTS,
    queryFn: getEnrolledStudents,
  });

  const hasEnrolled = useMemo(
    () => enrolledStudent?.data.find((s) => s.id === student.id),
    [enrolledStudent, student]
  );

  if (isLoading) return null;

  return (
    <div>
      {!!hasEnrolled ? (
        <Badge variant="default">Matriculado</Badge>
      ) : (
        <Badge variant="destructive">Não Matriculado</Badge>
      )}
    </div>
  );
}
