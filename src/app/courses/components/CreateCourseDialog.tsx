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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormEventHandler, useState } from "react";
import { CourseInput, createCourse } from "../Services/ApiService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { QueryKey } from "@/app/students/services/query-keys";
import { ErrorResponse } from "@/types/error";

export function CreateCourseDialog() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<CourseInput>({
    name: "",
    description: "",
  });

  const { mutate } = useMutation({
    mutationFn: ({ name, description }: CourseInput) =>
      createCourse(name, description),
    onSuccess: () => {
      toast.success("Novo curso criado!");
      setOpen(false);
    },
    onError: (error: ErrorResponse) =>
      toast.error(error.response.data.errors[0]),
    meta: { refetches: [QueryKey.COURSES] },
  });

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate(values);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="outline">Criar Novo Curso</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar novo Curso</DialogTitle>
          <DialogDescription>
            Preencha as informações para criar um novo curso.
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
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea
              placeholder="Descrição do curso..."
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
