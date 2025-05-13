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
import { User, UserRole } from "@/lib/model";
import { useUserUpdateMutation } from "@/lib/tanstack/mutation/usuario/update";
import { UserCreatePayload, UserSchema } from "@/schemas/usuario";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useSearchParams } from "react-router-dom";
import { ACTION } from "../action";
import { UploaderFile } from "./uploader-file";

interface Props {
  onClose: () => void;
  data: User;
}

export function Form({ onClose, data: user }: Props): React.JSX.Element {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(location.search)
  );

  const update = useUserUpdateMutation({
    onError(error) {
      console.log(error);
    },
    onSuccess(response) {
      ACTION["PAGINATE"]["UPDATE"](response, {
        page: Number(searchParams.get("page") ?? 1),
        per_page: Number(searchParams.get("per_page") ?? 10),
        ...(searchParams.has("search") && {
          search: searchParams.get("search")!,
        }),
      });
      ACTION["SHOW"]["UPDATE"](response);
      setSearchParams({
        page: "1",
        per_page: "10",
      });
      onClose();
    },
  });

  const form = useForm<UserCreatePayload>({
    resolver: zodResolver(UserSchema["create"]),
    defaultValues: {
      avatar: null,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    update.mutateAsync({
      id: user.id!,
      ...data,
      files: null,
    });
  });

  return (
    <Root {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="name"
          defaultValue={user?.name}
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
          defaultValue={user?.email}
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
          defaultValue={user?.role}
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
            disabled={update.status === "pending"}
          >
            {update.status === "pending" && (
              <LoaderCircleIcon className="w-4 h-4 animate-spin" />
            )}
            {!(update.status === "pending") && <span>Adicionar</span>}
          </Button>
        </SheetFooter>
      </form>
    </Root>
  );
}
