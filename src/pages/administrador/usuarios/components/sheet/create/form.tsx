import { Arquivo } from "@/components/arquivo";
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
import { addedUserToPagination } from "@/lib/tanstack/actions/usuarios";
import { useUserCreateMutation } from "@/lib/tanstack/mutation/usuario/create";
import { UserCreatePayload, UserSchema } from "@/schemas/usuario";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useSearchParams } from "react-router-dom";

export function Form({ onClose }: { onClose: () => void }): React.JSX.Element {
  const location = useLocation();
  const [searchParams] = useSearchParams(new URLSearchParams(location.search));

  const create = useUserCreateMutation({
    onError(error) {
      console.log(error);
    },
    onSuccess(response) {
      addedUserToPagination(response, {
        page: Number(searchParams.get("page") ?? 1),
        perPage: Number(searchParams.get("perPage") ?? 10),
        ...(searchParams.has("search") && {
          search: searchParams.get("search")!,
        }),
      });
      onClose();
    },
  });

  const form = useForm<UserCreatePayload>({
    resolver: zodResolver(UserSchema["create"]),
    defaultValues: {
      avatarId: null,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    create.mutateAsync(data);
  });

  return (
    <Root {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="name"
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

        <Arquivo
          dropzoneOptions={{
            multiple: false,
            maxFiles: 1,
            maxSize: 4 * 1024 * 1024,
            accept: {
              "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
            },
          }}
          fieldName="avatarId"
          label="Avatar"
        />

        <SheetFooter className="inline-flex flex-1 justify-end w-full px-0">
          <Button
            type="submit"
            className="w-full "
            disabled={create.status === "pending"}
          >
            {create.status === "pending" && (
              <LoaderCircleIcon className="w-4 h-4 animate-spin" />
            )}
            {!(create.status === "pending") && <span>Adicionar</span>}
          </Button>
        </SheetFooter>
      </form>
    </Root>
  );
}
