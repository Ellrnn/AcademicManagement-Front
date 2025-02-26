import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil } from "lucide-react";
import { editStudent, Student } from "../services/ApiService";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "@/app/students/services/query-keys";
import {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
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
import { Input } from "@/components/ui/input";
import { ErrorResponse } from "@/types/error";

type EditStudentActionProps = {
  student: Student;
};

type ConfirmationDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
} & EditStudentActionProps;

function EditDialog({ student, open, setOpen }: ConfirmationDialogProps) {
  const [values, setValues] = useState<Partial<Student>>({
    name: student.name,
    email: student.email,
    dateBirth: student.dateBirth,
  });

  useEffect(() => {
    setValues({
      name: student.name,
      email: student.email,
      dateBirth: student.dateBirth,
    });
  }, [student]);

  const { mutate } = useMutation({
    mutationFn: ({
      studentId,
      data,
    }: {
      studentId: string;
      data: Partial<Student>;
    }) => editStudent(studentId, data),
    onSuccess: () => {
      toast.success("Aluno Atualizado!");
      setOpen(false);
    },
    onError: (error: ErrorResponse) =>
      toast.error(error.response.data.errors[0]),
    meta: { refetches: [QueryKey.STUDENTS] },
  });

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({
      studentId: student.id,
      data: {
        name: values.name,
        email: student.email,
        dateBirth: student.dateBirth,
      },
    });
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Aluno</DialogTitle>
          <DialogDescription>
            Preencha (a)s informação(ões) necessária para editar o Aluno.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-2 items-start">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <Label htmlFor="description" className="text-right">
              Email
            </Label>
            <Input
              placeholder="nome@gmail..."
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <Label htmlFor="description" className="text-right">
              Data de Nascimento
            </Label>
            <Input
              placeholder="DD/MM/AAAA"
              type="date"
              onChange={(e) =>
                setValues({ ...values, dateBirth: e.target.value })
              }
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

export function EditStudentAction({ student }: EditStudentActionProps) {
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
            <span className="sr-only"></span>
            <Pencil color="blue" className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
      <EditDialog student={student} open={open} setOpen={setOpen} />
    </>
  );
}
