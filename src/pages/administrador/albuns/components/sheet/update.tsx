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
} from "@/components/ui/file-uploader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CloudUploadIcon, PaperclipIcon, TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export function Update({
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
            Atualizar Álbum
          </SheetTitle>

          <SheetDescription>Editar informações do álbum</SheetDescription>
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

            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="data-[error=true]:text-destructive">
                      Imagem de Capa <span className="text-destructive">*</span>
                    </FormLabel>
                    <div className="mb-2">
                      <div className="text-sm text-gray-500">Capa atual:</div>
                      <img
                        src="/default.webp"
                        alt="Capa atual"
                        className="h-24 w-40 object-cover rounded-md mt-1"
                      />
                    </div>
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
                          "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
                        },
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
                          <CloudUploadIcon className={cn("w-8 h-8")} />
                          <p className="mb-1 text-sm">
                            <span>
                              <strong>Clique para trocar a capa</strong> ou
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
                                  const payload = form.getValues("cover") ?? [];
                                  payload.splice(index, 1);
                                  form.setValue("cover", payload);
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

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="data-[error=true]:text-destructive">
                      Imagens do Álbum
                    </FormLabel>
                    <div className="mb-2">
                      <div className="text-sm text-gray-500">
                        O álbum possui atualmente 24 imagens.
                      </div>
                    </div>
                    <FileUploader
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      dropzoneOptions={{
                        multiple: true,
                        maxSize: 4 * 1024 * 1024,
                        accept: {
                          "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
                        },
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
                          <CloudUploadIcon className={cn("w-8 h-8")} />
                          <p className="mb-1 text-sm">
                            <span>
                              <strong>
                                Clique para adicionar mais imagens
                              </strong>{" "}
                              ou arraste e solte.
                            </span>
                          </p>
                        </div>
                      </FileInput>
                      {field?.value?.length > 0 && (
                        <FileUploaderContent>
                          <div className="mb-2">
                            {field.value.length}{" "}
                            {field.value.length === 1
                              ? "nova imagem selecionada"
                              : "novas imagens selecionadas"}
                          </div>
                          {(field.value as File[])
                            .slice(0, 3)
                            .map((file, index) => (
                              <div
                                key={index}
                                className="inline-flex gap-2 items-center justify-between"
                              >
                                <div className="inline-flex items-center gap-2">
                                  <PaperclipIcon className="h-4 w-4 stroke-current" />
                                  <span>{file.name}</span>
                                </div>
                              </div>
                            ))}
                          {field.value.length > 3 && (
                            <div className="text-sm text-gray-500 mt-1">
                              ... e mais {field.value.length - 3}{" "}
                              {field.value.length - 3 === 1
                                ? "arquivo"
                                : "arquivos"}
                            </div>
                          )}
                          <div className="mt-2 flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              type="button"
                              onClick={() => {
                                form.setValue("images", []);
                              }}
                            >
                              <TrashIcon className="w-4 h-4 stroke-current mr-2" />
                              Limpar seleção
                            </Button>
                          </div>
                        </FileUploaderContent>
                      )}
                    </FileUploader>
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={() => {}}
                        className="text-red-500 border-red-200 hover:bg-red-50"
                      >
                        <TrashIcon className="w-4 h-4 stroke-current mr-2" />
                        Gerenciar imagens existentes
                      </Button>
                    </div>
                  </FormItem>
                );
              }}
            />

            <SheetFooter className="inline-flex flex-1 justify-end w-full px-0">
              <Button className="" type="submit">
                Atualizar Álbum
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
