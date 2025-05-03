import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as Root,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SheetFooter } from "@/components/ui/sheet";
import { UserRole } from "@/lib/model";
import { useUserCreateMutation } from "@/lib/tanstack/mutation/usuario/create";
import { useUserShowQuery } from "@/lib/tanstack/query/usuario/show";
import { UserCreatePayload, UserSchema } from "@/schemas/usuario";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useSearchParams } from "react-router-dom";
import { UploaderFile } from "./uploader-file";

export function Form({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}): React.JSX.Element {
  const location = useLocation();
  const [searchParams] = useSearchParams(new URLSearchParams(location.search));

  const id = searchParams.get("id") || "";

  const userShowQuery = useUserShowQuery({
    enabled: open,
    id,
  });

  const userCreateMutation = useUserCreateMutation({
    onError(error) {
      console.log(error);
    },
    onSuccess(response) {
      onClose();
      console.log(response);
    },
  });
  const form = useForm<UserCreatePayload>({
    resolver: zodResolver(UserSchema["create"]),
    defaultValues: {
      avatar: null,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    userCreateMutation.mutateAsync({
      ...data,
      files: null,
    });
  });

  if (userShowQuery.status !== "success")
    return (
      <div className="flex justify-center items-center">
        <LoaderCircleIcon className="animate-spin" />
      </div>
    );

  return (
    <Root {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="name"
          defaultValue={userShowQuery.data?.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="data-[error=true]:text-destructive">
                Nome <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Nome completo" {...field} />
              </FormControl>
              <FormMessage className="text-right text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          defaultValue={userShowQuery.data?.email}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="data-[error=true]:text-destructive">
                E-mail <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email@exemplo.com"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-right text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          defaultValue={userShowQuery.data?.role}
          name="role"
          render={({ field }) => (
            <FormItem className="w-full flex-1">
              <FormLabel className="data-[error=true]:text-destructive">
                Função <span className="text-destructive">*</span>
              </FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={UserRole.ADMINISTRATOR}>
                    Administrador
                  </SelectItem>
                  <SelectItem value={UserRole.EDITOR}>Editor</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-right text-destructive" />
            </FormItem>
          )}
        />

        <UploaderFile />

        <SheetFooter className="inline-flex flex-1 justify-end w-full px-0">
          <Button
            type="submit"
            className="w-full "
            disabled={userCreateMutation.status === "pending"}
          >
            {userCreateMutation.status === "pending" && (
              <LoaderCircleIcon className="w-6 h-6 animate-spin" />
            )}
            {!(userCreateMutation.status === "pending") && (
              <span>Adicionar</span>
            )}
          </Button>
        </SheetFooter>
      </form>
    </Root>
  );
}
