import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
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
import {
  deleteEnrollment,
  GetCourseStudents,
} from "@/app/students/services/ApiService";
import { QueryKey } from "@/app/students/services/query-keys";
import { useParams } from "next/navigation";

type DeleteEnrolledStudentProps = {
  courseStudent: GetCourseStudents[number];
};

type ConfirmationDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
} & DeleteEnrolledStudentProps;

function ConfirmationDialog({
  open,
  setOpen,
  courseStudent,
}: ConfirmationDialogProps) {
  const { courseId } = useParams();

  const { mutate } = useMutation({
    mutationFn: () => deleteEnrollment(courseStudent.enrollmentId),
    onSuccess: () => {
      toast.success("Matrícula excluida!");
      setOpen(false);
    },
    meta: { refetches: [QueryKey.COURSE_STUDENTS(`${courseId}`)] },
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

export function DeleteEnrollment({
  courseStudent,
}: DeleteEnrolledStudentProps) {
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
            <Trash2 color="blue" className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
      <ConfirmationDialog
        courseStudent={courseStudent}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
