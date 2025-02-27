import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookUser } from "lucide-react";
import { enrollStudentInCourse, Student } from "../services/ApiService";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/app/students/services/query-keys";
import {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ErrorResponse } from "@/types/error";
import { FancyMultiSelect, Option } from "@/components/ui/multi-select";
import { getCourses } from "@/app/courses/Services/ApiService";

type EnrollStudentActionProps = {
  student: Student;
};

type ConfirmationDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
} & EnrollStudentActionProps;

function EditDialog({ student, open, setOpen }: ConfirmationDialogProps) {
  const [coursesList, setCoursesList] = useState<Option[]>([]);

  const { mutate } = useMutation({
    mutationFn: () =>
      enrollStudentInCourse(
        student.id,
        coursesList.map((c) => c.value)
      ),
    onSuccess: () => {
      toast.success("Aluno Matriculado!");
      setOpen(false);
    },
    onError: (error: ErrorResponse) =>
      toast.error(error.response.data.errors[0]),
    meta: { refetches: [QueryKey.STUDENTS] },
  });

  const { data } = useQuery({
    queryKey: QueryKey.COURSES,
    queryFn: getCourses,
  });

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    mutate();
  };

  const options = useMemo(
    () =>
      data?.data.map((course) => {
        return {
          value: course.id,
          label: course.name,
        };
      }) || [],
    [data]
  );

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Matricular Aluno</DialogTitle>
          <DialogDescription>
            Selecione os Cursos para Matricular o Aluno.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-2 items-start">
            <Label htmlFor="coursesId" className="text-right">
              Cursos
            </Label>
            <FancyMultiSelect
              placeholder="Selecione o(s) Curso(s)"
              options={options}
              selected={coursesList}
              setSelected={setCoursesList}
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

export function EnrollStudentCourse({ student }: EnrollStudentActionProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => setOpen(true)}
          >
            <BookUser color="blue" className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
      <EditDialog student={student} open={open} setOpen={setOpen} />
    </>
  );
}
