import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Uploader } from "@/components/uploader";
import { EventCategory } from "@/lib/model";
import { EventCreatePayload, EventSchema } from "@/schemas/evento";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function Create({
  ...props
}: React.ComponentProps<typeof SheetTrigger>): React.JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false);

  const form = useForm<EventCreatePayload>({
    resolver: zodResolver(EventSchema["create"]),
    defaultValues: {
      cover_id: null,
    },
  });

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          // form.reset({
          //   title: "",
          //   date: "",
          //   hour: "",
          //   location: "",
          //   address: "",
          //   category: "",
          //   capacity: "",
          //   description: "",
          //   detailedContent: "",
          // });
        }

        setOpen(o);
      }}
    >
      <SheetTrigger className="hidden" {...props} />
      <SheetContent className="py-4 px-6 sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="px-0">
          <SheetTitle className="text-lg font-medium">
            Adicionar novo evento
          </SheetTitle>

          <SheetDescription>
            Adicione um novo evento para a plataforma
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={console.log}>
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
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="data-[error=true]:text-destructive">
                      Data <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="00/00/0000" {...field} />
                    </FormControl>
                    <FormMessage className="text-right text-destructive" />
                  </FormItem>
                )}
              />

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
                        <SelectItem value={EventCategory.COURSE}>
                          Curso
                        </SelectItem>
                        <SelectItem value={EventCategory.SPORT}>
                          Esporte
                        </SelectItem>
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
                    Conteúdo Detalhado{" "}
                    <span className="text-destructive">*</span>
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

            <Uploader
              dropzoneOptions={{
                multiple: false,
                maxFiles: 1,
                maxSize: 4 * 1024 * 1024,
                accept: {
                  "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
                },
              }}
              fieldName="cover_id"
              label="Capa"
            />

            <SheetFooter className="inline-flex flex-1 justify-end w-full px-0">
              <Button className="" type="submit">
                Adicionar Evento
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
