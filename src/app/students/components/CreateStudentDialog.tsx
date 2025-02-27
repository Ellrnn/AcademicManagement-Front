"use client";
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
import { FormEventHandler, useState } from "react";
import { registerStudent, StudentInput } from "../services/ApiService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { QueryKey } from "@/app/students/services/query-keys";
import { ErrorResponse } from "@/types/error";

export function CreateStudentDialog() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<StudentInput>({
    name: "",
    email: "",
    dateBirth: "",
  });

  const { mutate } = useMutation({
    mutationFn: ({ name, email, dateBirth }: StudentInput) =>
      registerStudent(name, email, dateBirth),
    onSuccess: () => {
      toast.success("Novo Aluno Cadastrado!");
      setOpen(false);
    },
    onError: (error: ErrorResponse) =>
      toast.error(error.response.data.errors[0]),
    meta: { refetches: [QueryKey.STUDENTS] },
  });

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate(values);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-blue-600">
          Cadastrar Aluno
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Aluno</DialogTitle>
          <DialogDescription>
            Preencha as informações para cadastrar um novo aluno.
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
