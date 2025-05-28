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

import { Arquivo } from "@/components/arquivo";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

export function Create({
  ...props
}: React.ComponentProps<typeof SheetTrigger>): React.JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false);

  const form = useForm();

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          // form.reset({
          //   title: "",
          //   date: "",
          //   description: "",
          // });
        }

        setOpen(o);
      }}
    >
      <SheetTrigger className="hidden" {...props} />
      <SheetContent className="py-4 px-6 sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="px-0">
          <SheetTitle className="text-lg font-medium">
            Adicionar novo álbum
          </SheetTitle>

          <SheetDescription>
            Adicione um novo álbum de fotos para a galeria
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
                    Título do Álbum <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o título do álbum" {...field} />
                  </FormControl>
                  <FormMessage className="text-right text-destructive" />
                </FormItem>
              )}
            />

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
              fieldName="cover_id"
              label="Capa do Álbum"
            />

            <Arquivo
              dropzoneOptions={{
                multiple: true,
                maxFiles: 10,
                maxSize: 4 * 1024 * 1024,
                accept: {
                  "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
                },
              }}
              fieldName="images"
              label="Capa do Álbum"
            />

            <SheetFooter className="inline-flex flex-1 justify-end w-full px-0">
              <Button className="" type="submit">
                Adicionar Álbum
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
