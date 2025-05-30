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
import { SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Podcast } from "@/lib/model";
import { usePodcastUpdateMutation } from "@/lib/tanstack/mutation/podcast/update";
import { PodcastSchema, PodcastUpdatePayload } from "@/schemas/podcast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useSearchParams } from "react-router-dom";
import { ACTION } from "../action";

interface FormProps {
  data: Podcast;
  onClose: () => void;
}

export function FormUpdate({
  data: podcast,
  onClose,
}: FormProps): React.JSX.Element {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(location.search)
  );

  const update = usePodcastUpdateMutation({
    onError(error) {
      console.log(error);
    },
    onSuccess(response) {
      searchParams.set("page", "1");
      searchParams.set("perPage", "10");
      setSearchParams(searchParams);
      ACTION["PAGINATE"]["UPDATE"](response, {
        page: Number(searchParams.get("page") ?? 1),
        perPage: Number(searchParams.get("perPage") ?? 10),
        ...(searchParams.has("search") && {
          search: searchParams.get("search")!,
        }),
      });
      ACTION["SHOW"]["UPDATE"](response);
      onClose();
    },
  });

  const form = useForm<PodcastUpdatePayload>({
    resolver: zodResolver(PodcastSchema["update"]),
    defaultValues: {
      id: podcast.id,
      title: podcast.title,
      date: podcast.date,
      duration: podcast.duration,
      presenters: podcast.presenters?.join(", "),
      guests: podcast.guests.join(", "),
      description: podcast.description,
      // content: podcast.content || null,
      coverId: podcast.coverId,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    update.mutateAsync({
      ...data,
      id: podcast.id!,
    });
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
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="data-[error=true]:text-destructive">
                  Data <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    // type="date"
                    placeholder="00/00/0000"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-right text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="data-[error=true]:text-destructive">
                  Duração <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="00:00:00" {...field} />
                </FormControl>
                <FormMessage className="text-right text-destructive" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="data-[error=true]:text-destructive">
                Apresentadores <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage className="text-right text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="data-[error=true]:text-destructive">
                Convidados <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage className="text-right text-destructive" />
            </FormItem>
          )}
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
            maxSize: 4 * 1024 * 1024,
            accept: {
              "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
              "audio/*": [".mp3", ".wav", ".ogg", ".flac"], // TODO: verificar se isso funciona
            },
          }}
          fieldName="audio_id"
          label="Audio"
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
          defaultValue={podcast?.cover ? [podcast.cover] : []}
        />

        <SheetFooter className="inline-flex flex-1 justify-end w-full px-0">
          <Button
            className=""
            type="submit"
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
