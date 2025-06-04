import { Arquivo } from "@/components/arquivo";
import { Data } from "@/components/data";
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
import { Album } from "@/lib/model";
import { updatedAlbumToPagination } from "@/lib/tanstack/actions/albums";
import { useAlbumUpdateMutation } from "@/lib/tanstack/mutation/albums/update";
import { AlbumSchema, AlbumUpdatePayload } from "@/schemas/albums";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useSearchParams } from "react-router-dom";

interface Props {
  onClose: () => void;
  data: Album;
}

export function Form({ onClose, data: album }: Props): React.JSX.Element {
  const location = useLocation();
  const [searchParams] = useSearchParams(new URLSearchParams(location.search));

  const update = useAlbumUpdateMutation({
    onError(error) {
      console.log(error);
    },
    onSuccess(response) {
      updatedAlbumToPagination(response, {
        page: Number(searchParams.get("page") ?? 1),
        perPage: Number(searchParams.get("perPage") ?? 10),
        ...(searchParams.has("search") && {
          search: searchParams.get("search")!,
        }),
      });
      onClose();
    },
  });

  const form = useForm<AlbumUpdatePayload>({
    resolver: zodResolver(AlbumSchema["update"]),
    defaultValues: {
      title: album.title,
      date: new Date(album.date),
      description: album.description,
      coverId: album.coverId,
      imageIds: album.imageIds,
      id: album.id!,
    },
  });

  const onSubmit = form.handleSubmit((payload) => {
    update.mutateAsync(payload);
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
                Título do Álbum <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Digite o título do álbum" {...field} />
              </FormControl>
              <FormMessage className="text-right text-destructive" />
            </FormItem>
          )}
        />

        <Data name="date" label="Data" required />

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
                  placeholder="Digite a descrição do álbum"
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
          defaultValue={album.cover ? [album.cover] : []}
        />

        <Arquivo
          dropzoneOptions={{
            multiple: true,
            maxFiles: 20,
            maxSize: 20 * 1024 * 1024,
            accept: {
              "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
            },
          }}
          fieldName="imageIds"
          label="Imagens"
          defaultValue={album.images}
        />

        <SheetFooter className="inline-flex flex-1 justify-end w-full px-0">
          <Button
            type="submit"
            className="w-full "
            disabled={update.status === "pending"}
          >
            {update.status === "pending" && (
              <LoaderCircleIcon className="w-4 h-4 animate-spin" />
            )}
            {!(update.status === "pending") && <span>Atualizar</span>}
          </Button>
        </SheetFooter>
      </form>
    </Root>
  );
}
