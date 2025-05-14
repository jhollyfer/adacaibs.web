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
import { Textarea } from "@/components/ui/textarea";
import { Uploader } from "@/components/uploader";
import { TestimonialStatus } from "@/lib/model";
import { useTestimonialCreateMutation } from "@/lib/tanstack/mutation/depoimentos/create";
import {
  TestimonialCreatePayload,
  TestimonialSchema,
} from "@/schemas/depoimentos";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useSearchParams } from "react-router-dom";
import { ACTION } from "../action";

export function Form({ onClose }: { onClose: () => void }): React.JSX.Element {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(location.search)
  );

  const create = useTestimonialCreateMutation({
    onError(error) {
      console.log(error);
    },
    onSuccess(response) {
      searchParams.set("page", "1");
      searchParams.set("per_page", "10");
      setSearchParams(searchParams);
      ACTION["PAGINATE"]["ADDED"](response, {
        page: Number(searchParams.get("page") ?? 1),
        per_page: Number(searchParams.get("per_page") ?? 10),
        ...(searchParams.has("search") && {
          search: searchParams.get("search")!,
        }),
      });
      onClose();
    },
  });

  const form = useForm<TestimonialCreatePayload>({
    resolver: zodResolver(TestimonialSchema["create"]),
    defaultValues: {
      files: null,
      status: TestimonialStatus.PENDING,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    create.mutateAsync({
      ...data,
      files: null,
    });
  });

  console.log(form.formState.errors);

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
          name="position"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="data-[error=true]:text-destructive">
                Cargo/Ocupação <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Estudante, Professor, etc."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-right text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="data-[error=true]:text-destructive">
                Avaliação <span className="text-destructive">*</span>
              </FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma avaliação" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="5">5 estrelas</SelectItem>
                  <SelectItem value="4">4 estrelas</SelectItem>
                  <SelectItem value="3">3 estrelas</SelectItem>
                  <SelectItem value="2">2 estrelas</SelectItem>
                  <SelectItem value="1">1 estrela</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-right text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="testimonial"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="data-[error=true]:text-destructive">
                Depoimento <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Digite o depoimento"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-right text-destructive" />
            </FormItem>
          )}
        />

        <Uploader
          dropzoneOptions={{
            multiple: false,
            maxFiles: 1,
            maxSize: 4 * 1024 * 1024,
            accept: {
              "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
            },
          }}
          fieldName="avatar_id"
          label="Avatar"
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="data-[error=true]:text-destructive">
                Status <span className="text-destructive">*</span>
              </FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={TestimonialStatus.APPROVED}>
                    Publicado
                  </SelectItem>
                  <SelectItem value={TestimonialStatus.PENDING}>
                    Pendente
                  </SelectItem>
                  <SelectItem value={TestimonialStatus.REJECTED}>
                    Rejeitado
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-right text-destructive" />
            </FormItem>
          )}
        />

        <SheetFooter className="inline-flex flex-1 justify-end w-full px-0">
          <Button
            type="submit"
            className="w-full"
            disabled={create.status === "pending"}
          >
            {create.status === "pending" && (
              <LoaderCircleIcon className="w-4 h-4 animate-spin" />
            )}
            {!(create.status === "pending") && (
              <span>Adicionar Depoimento</span>
            )}
          </Button>
        </SheetFooter>
      </form>
    </Root>
  );
}
