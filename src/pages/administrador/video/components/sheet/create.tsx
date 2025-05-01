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

import {
  FileInput,
  FileUploader,
  FileUploaderContent,
} from "@/components/file-uploader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CloudUploadIcon, PaperclipIcon, TrashIcon } from "lucide-react";
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
          //   duration: "",
          //   instructor: "",
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
            Adicionar novo vídeo
          </SheetTitle>

          <SheetDescription>Adicione um novo vídeo para a plataforma</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={console.log}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="data-[error=true]:text-destructive">
                    Título do Vídeo <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o título do vídeo"
                      {...field}
                    />
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
                        type="date"
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
                    Instrutor/Apresentador <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do instrutor ou apresentador" {...field} />
                  </FormControl>
                  <FormMessage className="text-right text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="data-[error=true]:text-destructive">
                    URL do Vídeo <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: https://www.youtube.com/watch?v=..." {...field} />
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

            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="data-[error=true]:text-destructive">
                      Thumbnail <span className="text-destructive">*</span>
                    </FormLabel>
                    <FileUploader
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      dropzoneOptions={{
                        multiple: false,
                        maxFiles: 1,
                        maxSize: 4 * 1024 * 1024,
                        accept: {
                          'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
                        }
                      }}
                      reSelect={true}
                      className={cn(
                        "relative rounded-lg p-2 border border-dashed"
                      )}
                    >
                      <FileInput>
                        <div
                          className={cn(
                            "inline-flex items-center justify-center w-full gap-4 py-2"
                          )}
                        >
                          <CloudUploadIcon
                            className={cn(
                              "w-8 h-8"
                            )}
                          />
                          <p className="mb-1 text-sm">
                            <span>
                              <strong>Clique para fazer upload</strong> ou
                              arraste e solte.
                            </span>
                          </p>
                        </div>
                      </FileInput>
                      {field?.value?.length > 0 && (
                        <FileUploaderContent>
                          {(field.value as File[]).map((file, index) => (
                            <div
                              key={index}
                              className="inline-flex gap-2 items-center justify-between"
                            >
                              <div className="inline-flex items-center gap-2">
                                <PaperclipIcon className="h-4 w-4 stroke-current" />
                                <span>{file.name}</span>
                              </div>
                              <Button
                                variant={"ghost"}
                                size={"icon"}
                                type="button"
                                onClick={() => {
                                  const payload = form.getValues("thumbnail") ?? [];
                                  payload.splice(index, 1);
                                  form.setValue("thumbnail", payload);
                                }}
                              >
                                <TrashIcon className="w-4 h-4 stroke-current" />
                              </Button>
                            </div>
                          ))}
                        </FileUploaderContent>
                      )}
                    </FileUploader>
                  </FormItem>
                );
              }}
            />

            <SheetFooter className="inline-flex flex-1 justify-end w-full px-0">
              <Button
                className=""
                type="submit"
              >
                Adicionar Vídeo
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}