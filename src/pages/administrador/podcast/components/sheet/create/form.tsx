import { Arquivo } from "@/components/arquivo";
import { Input } from "@/components/ui/input";
import { SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

import { Data } from "@/components/data";
import { MultipleSelector } from "@/components/multi-selector";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as Root,
} from "@/components/ui/form";
import { addedPodcastToPagination } from "@/lib/tanstack/actions/podcast";
import { usePodcastCreateMutation } from "@/lib/tanstack/mutation/podcast/create";
import { cn } from "@/lib/utils";
import { PodcastCreatePayload, PodcastSchema } from "@/schemas/podcast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation, useSearchParams } from "react-router-dom";

export function Form({ onClose }: { onClose: () => void }): React.JSX.Element {
  const location = useLocation();
  const [searchParams] = useSearchParams(new URLSearchParams(location.search));

  const create = usePodcastCreateMutation({
    onError(error) {
      console.log(error);
    },
    onSuccess(response) {
      addedPodcastToPagination(response, {
        page: Number(searchParams.get("page") ?? 1),
        perPage: Number(searchParams.get("perPage") ?? 10),
        ...(searchParams.has("search") && {
          search: searchParams.get("search")!,
        }),
      });
      onClose();
    },
  });

  const form = useForm<PodcastCreatePayload>({
    resolver: zodResolver(PodcastSchema["create"]),
  });

  const onSubmit = form.handleSubmit((payload) => {
    create.mutateAsync(payload);
  });

  return (
    <Root {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="data-[error=true]:text-destructive">
                Título <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Digite o título da notícia" {...field} />
              </FormControl>
              <FormMessage className="text-right text-destructive" />
            </FormItem>
          )}
        />

        <div className="flex-1 w-full gap-2 inline-flex">
          <Data name="date" label="Data" required />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="data-[error=true]:text-destructive">
                  Duração <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 15 min" {...field} />
                </FormControl>
                <FormMessage className="text-right text-destructive" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="presenters"
          render={({ field }) => {
            const hasError = !!form.formState.errors[field.name];

            return (
              <FormItem>
                <FormLabel className="data-[error=true]:text-destructive">
                  Apresentadores
                </FormLabel>
                <FormControl>
                  <MultipleSelector
                    onChange={(value) => {
                      field.onChange(value.flatMap((v) => v.value));
                      // field.onChange(value);
                    }}
                    defaultOptions={[]}
                    value={
                      field.value?.map((v) => ({ value: v, label: v })) || []
                    }
                    creatable
                    triggerSearchOnFocus
                    placeholder="Escreva e adicione"
                    emptyIndicator={null}
                    className={cn("w-full", hasError && "border-destructive")}
                  />
                </FormControl>
                <FormMessage className="text-right text-destructive" />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => {
            const hasError = !!form.formState.errors[field.name];

            return (
              <FormItem>
                <FormLabel className="data-[error=true]:text-destructive">
                  Convidados
                </FormLabel>
                <FormControl>
                  <MultipleSelector
                    onChange={(value) => {
                      field.onChange(value.flatMap((v) => v.value));
                      // field.onChange(value);
                    }}
                    defaultOptions={[]}
                    value={
                      field.value?.map((v) => ({ value: v, label: v })) || []
                    }
                    creatable
                    triggerSearchOnFocus
                    placeholder="Escreva e adicione"
                    emptyIndicator={null}
                    className={cn("w-full", hasError && "border-destructive")}
                  />
                </FormControl>
                <FormMessage className="text-right text-destructive" />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="data-[error=true]:text-destructive">
                Descrição <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Adicione seu texto aqui..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-right text-destructive" />
            </FormItem>
          )}
        />

        <Arquivo
          dropzoneOptions={{
            multiple: false,
            maxFiles: 1,
            maxSize: 20 * 1024 * 1024,
            accept: {
              "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
              "audio/*": [".mp3", ".wav", ".ogg", ".flac"],
            },
          }}
          fieldName="audioId"
          label="Audio"
          required
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
          fieldName="coverId"
          label="Imagem de Capa"
          required
        />

        <SheetFooter className="inline-flex flex-1 justify-end w-full px-0">
          <Button type="submit" disabled={create.status === "pending"}>
            {create.status === "pending" && (
              <LoaderCircleIcon className="w-4 h-4 animate-spin" />
            )}
            {!(create.status === "pending") && <span>Adicionar </span>}
          </Button>
        </SheetFooter>
      </form>
    </Root>
  );
}
