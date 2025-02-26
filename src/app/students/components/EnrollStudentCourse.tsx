import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookUser } from "lucide-react";
import {
  Enrollment,
  enrollStudentInCourse,
  Student,
} from "../services/ApiService";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "@/app/students/services/query-keys";
import { Dispatch, FormEventHandler, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ErrorResponse } from "@/types/error";

type EnrollStudentActionProps = {
  student: Student;
};

type ConfirmationDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
} & EnrollStudentActionProps;

function EditDialog({ student, open, setOpen }: ConfirmationDialogProps) {
  const [values, setValues] = useState<Enrollment>({
    coursesId: [],
    studentId: student.id,
  });

  const { mutate } = useMutation({
    mutationFn: ({ studentId, coursesId }: Enrollment) =>
      enrollStudentInCourse(studentId, coursesId),
    onSuccess: () => {
      toast.success("Aluno Matriculado!");
      setOpen(false);
    },
    onError: (error: ErrorResponse) =>
      toast.error(error.response.data.errors[0]),
    meta: { refetches: [QueryKey.STUDENTS] },
  });

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(values);

    mutate({
      studentId: student.id,
      coursesId: values.coursesId,
    });
  };

  const handleCoursesIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const coursesArray = e.target.value.split(",").map((id) => id.trim());
    setValues({ ...values, coursesId: coursesArray });
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Matricular Aluno</DialogTitle>
          <DialogDescription>
            Preencha os IDs dos Cursos para Matricular o Aluno.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-2 items-start">
            <Label htmlFor="coursesId" className="text-right">
              IDs dos Cursos
            </Label>
            <Input
              id="coursesId"
              className="col-span-3"
              value={values.coursesId.join(", ")}
              onChange={handleCoursesIdChange}
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
