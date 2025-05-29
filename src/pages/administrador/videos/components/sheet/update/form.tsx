import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as Root,
} from "@/components/ui/form";

import { SheetFooter } from "@/components/ui/sheet";
import React from "react";

import { Arquivo } from "@/components/arquivo";
import { Data } from "@/components/data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Video } from "@/lib/model";
import { updatedVideoToPagination } from "@/lib/tanstack/actions/videos";
import { useVideoUpdateMutation } from "@/lib/tanstack/mutation/videos/update";
import { VideoSchema, VideoUpdatePayload } from "@/schemas/videos";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation, useSearchParams } from "react-router-dom";

interface Props {
  data: Video;
  onClose: () => void;
}

export function Form({ data: video, onClose }: Props): React.JSX.Element {
  const location = useLocation();
  const [searchParams] = useSearchParams(new URLSearchParams(location.search));

  const update = useVideoUpdateMutation({
    onError(error) {
      console.log(error);
    },
    onSuccess(response) {
      updatedVideoToPagination(response, {
        page: Number(searchParams.get("page") ?? 1),
        perPage: Number(searchParams.get("perPage") ?? 10),
        ...(searchParams.has("search") && {
          search: searchParams.get("search")!,
        }),
      });
      onClose();
    },
  });

  const form = useForm<VideoUpdatePayload>({
    resolver: zodResolver(VideoSchema["update"]),
    defaultValues: {
      id: video.id,
      date: new Date(video.date),
      coverId: video.coverId,
      duration: video.duration,
      instructor: video.instructor,
      url: video.url,
      description: video.description,
      title: video.title,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    update.mutateAsync({
      ...data,
      id: video.id!,
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
                Título do Vídeo <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Digite o título do vídeo" {...field} />
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
          name="instructor"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="data-[error=true]:text-destructive">
                Instrutor/Apresentador{" "}
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nome do instrutor ou apresentador"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-right text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="data-[error=true]:text-destructive">
                URL do Vídeo <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: https://www.youtube.com/watch?v=..."
                  {...field}
                />
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
                  placeholder="Digite a descrição do vídeo"
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
            },
          }}
          fieldName="coverId"
          label="Capa"
          defaultValue={video?.cover ? [video.cover] : []}
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
