import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { FormEventHandler, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { QueryKey } from "@/app/students/services/query-keys";
import { ErrorResponse } from "@/types/error";
import { FancyMultiSelect, Option } from "@/components/ui/multi-select";
import { getStudents } from "@/app/students/services/ApiService";
import { enrollMultipleStudents } from "../Services/ApiService";
import { useParams } from "next/navigation";

export function EnrollStudentsDialog() {
  const { courseId } = useParams();
  const [studentsList, setStudentsList] = useState<Option[]>([]);
  const { data } = useQuery({
    queryKey: QueryKey.STUDENTS,
    queryFn: () => getStudents(),
  });
  const [open, setOpen] = useState(false);

  const { mutate } = useMutation({
    mutationFn: () =>
      enrollMultipleStudents(
        `${courseId}`,
        studentsList.map((s) => s.value)
      ),
    onSuccess: () => {
      toast.success("Aluno Matriculado!");
      setOpen(false);
    },
    onError: (error: ErrorResponse) =>
      toast.error(error.response.data.errors[0]),
    meta: { refetches: [QueryKey.COURSE_STUDENTS(courseId as string)] },
  });

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate();
  };

  const options = useMemo(
    () =>
      data?.data.map((student) => {
        return {
          value: student.id,
          label: student.name,
        };
      }) || [],
    [data]
  );

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-blue-600">
          Matricular Novo Aluno
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Matricular novo Curso</DialogTitle>
          <DialogDescription>
            Selecione o(s) aluno(S) para matricular.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-2 items-start">
            <Label htmlFor="name" className="text-right">
              Aluno
            </Label>
            <FancyMultiSelect
              placeholder="Selecione o(s) Curso(s)"
              options={options}
              selected={studentsList}
              setSelected={setStudentsList}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
