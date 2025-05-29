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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EventCategory, Events } from "@/lib/model";
import { updatedEventToPagination } from "@/lib/tanstack/actions/eventos";
import { useEventUpdateMutation } from "@/lib/tanstack/mutation/eventos/update";
import { EventSchema, EventUpdatePayload } from "@/schemas/eventos";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation, useSearchParams } from "react-router-dom";

interface Props {
  data: Events;
  onClose: () => void;
}

export function Form({ data: event, onClose }: Props): React.JSX.Element {
  const location = useLocation();
  const [searchParams] = useSearchParams(new URLSearchParams(location.search));

  const update = useEventUpdateMutation({
    onError(error) {
      console.log(error);
    },
    onSuccess(response) {
      updatedEventToPagination(response, {
        page: Number(searchParams.get("page") ?? 1),
        perPage: Number(searchParams.get("perPage") ?? 10),
        ...(searchParams.has("search") && {
          search: searchParams.get("search")!,
        }),
      });
      onClose();
    },
  });

  const form = useForm<EventUpdatePayload>({
    resolver: zodResolver(EventSchema["update"]),
    defaultValues: {
      id: event.id,
      title: event.title,
      date: event.date,
      hour: event.hour,
      location: event.location,
      address: event.address,
      category: event.category,
      capacity: event.capacity,
      resume: event.resume,
      content: event.content,
      coverId: event.coverId,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    update.mutateAsync({
      ...data,
      id: event.id!,
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
                Título do Evento <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Digite o título do evento" {...field} />
              </FormControl>
              <FormMessage className="text-right text-destructive" />
            </FormItem>
          )}
        />

        <div className="flex-1 w-full gap-2 inline-flex">
          <Data name="date" label="Data" required />

          <FormField
            control={form.control}
            name="hour"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="data-[error=true]:text-destructive">
                  Horário <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 14:00 - 18:00" {...field} />
                </FormControl>
                <FormMessage className="text-right text-destructive" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="data-[error=true]:text-destructive">
                Local <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Nome do local" {...field} />
              </FormControl>
              <FormMessage className="text-right text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="data-[error=true]:text-destructive">
                Endereço <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Endereço completo" {...field} />
              </FormControl>
              <FormMessage className="text-right text-destructive" />
            </FormItem>
          )}
        />

        <div className="flex-1 w-full gap-2 inline-flex">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="data-[error=true]:text-destructive">
                  Categoria <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={EventCategory.WORKSHOP}>
                      Workshop
                    </SelectItem>
                    <SelectItem value={EventCategory.LECTURE}>
                      Palestra
                    </SelectItem>
                    <SelectItem value={EventCategory.COURSE}>Curso</SelectItem>
                    <SelectItem value={EventCategory.SPORT}>Esporte</SelectItem>
                    <SelectItem value={EventCategory.COMMUNITY}>
                      Comunidade
                    </SelectItem>
                    <SelectItem value={EventCategory.ART}>Arte</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-right text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="data-[error=true]:text-destructive">
                  Capacidade <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Número máximo de participantes"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-right text-destructive" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="data-[error=true]:text-destructive">
                Descrição <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Digite a descrição do evento"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-right text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="data-[error=true]:text-destructive">
                Conteúdo Detalhado <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Conteúdo detalhado do evento (pode usar HTML)"
                  className="resize-none min-h-[150px]"
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
          defaultValue={event?.cover ? [event.cover] : []}
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
