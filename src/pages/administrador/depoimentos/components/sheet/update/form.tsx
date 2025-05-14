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
import { Testimonial, TestimonialStatus } from "@/lib/model";
import { useTestimonialUpdateMutation } from "@/lib/tanstack/mutation/depoimentos/update";
import {
  TestimonialSchema,
  TestimonialUpdatePayload,
} from "@/schemas/depoimentos";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useSearchParams } from "react-router-dom";
import { ACTION } from "../action";

interface FormProps {
  data: Testimonial;
  onClose: () => void;
}

export function FormUpdate({
  data: testimonial,
  onClose,
}: FormProps): React.JSX.Element {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(location.search)
  );

  const update = useTestimonialUpdateMutation({
    onError(error) {
      console.log(error);
    },
    onSuccess(response) {
      searchParams.set("page", "1");
      searchParams.set("per_page", "10");
      setSearchParams(searchParams);
      ACTION["PAGINATE"]["UPDATE"](response, {
        page: Number(searchParams.get("page") ?? 1),
        per_page: Number(searchParams.get("per_page") ?? 10),
        ...(searchParams.has("search") && {
          search: searchParams.get("search")!,
        }),
      });
      ACTION["SHOW"]["UPDATE"](response);
      onClose();
    },
  });

  const form = useForm<TestimonialUpdatePayload>({
    resolver: zodResolver(TestimonialSchema["update"]),
    defaultValues: {
      id: testimonial.id,
      name: testimonial.name,
      position: testimonial.position,
      rating: testimonial.rating,
      testimonial: testimonial.testimonial,
      status: testimonial.status,
      avatar_id: testimonial.avatar_id,
      files: null,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    update.mutateAsync({
      ...data,
      id: testimonial.id!,
      files: null,
    });
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

        <div className="inline-flex gap-4 w-full">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="data-[error=true]:text-destructive">
                  Avaliação <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl className="w-full">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma avaliação" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating} estrelas
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-right text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="data-[error=true]:text-destructive">
                  Status <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl className="w-full">
                    <SelectTrigger className="w-full">
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
        </div>

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
          defaultValue={testimonial?.avatar ? [testimonial.avatar] : []}
        />

        <SheetFooter className="inline-flex flex-1 justify-end w-full px-0">
          <Button
            type="submit"
            className="w-full"
            disabled={update.status === "pending"}
          >
            {update.status === "pending" && (
              <LoaderCircleIcon className="w-4 h-4 animate-spin" />
            )}
            {!(update.status === "pending") && <span>Atualizar </span>}
          </Button>
        </SheetFooter>
      </form>
    </Root>
  );
}
