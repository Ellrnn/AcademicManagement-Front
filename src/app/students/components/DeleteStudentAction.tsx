import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";
import { Student, deleteStudent } from "../services/ApiService";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "@/app/students/services/query-keys";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dispatch, SetStateAction, useState } from "react";

type DeleteStudentActionProps = {
  student: Student;
};

type ConfirmationDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
} & DeleteStudentActionProps;

function ConfirmationDialog({
  student,
  open,
  setOpen,
}: ConfirmationDialogProps) {
  const { mutate } = useMutation({
    mutationFn: () => deleteStudent(student.id),
    onSuccess: () => {
      toast.success("Aluno excluido!");
      setOpen(false);
    },
    meta: { refetches: [QueryKey.STUDENTS] },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Realmente deseja excluir?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar esta ação será permanente e irreversível.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate()}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DeleteStudentAction({ student }: DeleteStudentActionProps) {
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
            <Trash2 color="blue" className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
      <ConfirmationDialog student={student} open={open} setOpen={setOpen} />
    </>
  );
}
