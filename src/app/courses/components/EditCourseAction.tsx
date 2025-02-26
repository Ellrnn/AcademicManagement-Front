import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil } from "lucide-react";
import { Course, editCourse } from "../Services/ApiService";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ErrorResponse } from "@/types/error";

type EditCourseActionProps = {
  course: Course;
};

type ConfirmationDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
} & EditCourseActionProps;

function EditDialog({ course, open, setOpen }: ConfirmationDialogProps) {
  const [values, setValues] = useState<Partial<Course>>({
    name: course.name,
    description: course.description,
  });

  useEffect(() => {
    setValues({ name: course.name, description: course.description });
  }, [course]);

  const { mutate } = useMutation({
    mutationFn: ({
      courseId,
      data,
    }: {
      courseId: string;
      data: Partial<Course>;
    }) => editCourse(courseId, data),
    onSuccess: () => {
      toast.success("Curso Atualizado!");
      setOpen(false);
    },
    onError: (error: ErrorResponse) =>
      toast.error(error.response.data.errors[0]),
    meta: { refetches: [QueryKey.COURSES] },
  });

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({
      courseId: course.id,
      data: { name: values.name, description: values.description },
    });
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Curso</DialogTitle>
          <DialogDescription>
            Preencha (a)s informação(ões) necessária para editar o curso.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-2 items-start">
            <Label htmlFor="name" className="text-right">
              Curso
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
              Descrição
            </Label>
            <Textarea
              placeholder="Descrição do curso..."
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
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

export function EditCourseAction({ course }: EditCourseActionProps) {
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
            <Pencil color="blue" className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
      <EditDialog course={course} open={open} setOpen={setOpen} />
    </>
  );
}
