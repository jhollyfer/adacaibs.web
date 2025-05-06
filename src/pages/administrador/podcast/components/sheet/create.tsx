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
          //   name: "",
          //   email: "",
          //   role: "",
          // });
          // if (searchParams.has("user_id")) {
          //   setSearchParams((state) => {
          //     state.delete("user_id");
          //     return state;
          //   });
          // }
        }

        setOpen(o);
      }}
    >
      <SheetTrigger className="hidden" {...props} />
      <SheetContent className="py-4 px-6 sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="px-0">
          <SheetTitle className="text-lg font-medium">
            Adicionar novo
          </SheetTitle>

          <SheetDescription>Adicione um novo podcast</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={console.log}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="data-[error=true]:text-destructive">
                    Título <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o título da notícia"
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

            <FormField
              control={form.control}
              name="cover"
              // defaultValue={defaultValue}
              // rules={{
              //   validate: (value) => {
              //     if (!value && required)
              //       return column.title.concat(" é obrigatório");

              //     if (required && Array.from(value).length === 0)
              //       return "Adicione ao menos um arquivo";
              //     return true;
              //   },
              // }}
              render={({ field }) => {
                // const hasError = !!form.formState.errors[column.slug!];

                return (
                  <FormItem>
                    <FormLabel className="data-[error=true]:text-destructive">
                      Audio <span className="text-destructive">*</span>
                    </FormLabel>
                    <FileUploader
                      value={field.value}
                      onValueChange={(value) => {
                        // if (value) {
                        //   for (const file of value) {
                        //     mutate.mutate(file);
                        //   }
                        // }
                        field.onChange(value);
                      }}
                      dropzoneOptions={{
                        multiple: false,
                        maxFiles: 1,
                        maxSize: 4 * 1024 * 1024,
                      }}
                      reSelect={true}
                      className={cn(
                        "relative rounded-lg p-2 border border-dashed"
                        // hasError && "border-destructive",
                        // className
                      )}
                    >
                      <FileInput>
                        <div
                          className={cn(
                            "inline-flex items-center justify-center w-full gap-4 py-2"
                            // hasError && "text-destructive"
                          )}
                        >
                          <CloudUploadIcon
                            className={cn(
                              "w-8 h-8"
                              // mutate.status === "pending" && "animate-ping"
                            )}
                          />
                          <p className="mb-1 text-sm ">
                            <span>
                              {/* {mutate.status === "pending" && (
                                <strong>Realizando upload...</strong>
                              )}
                              {!(mutate.status === "pending") && (
                                <>
                                  <strong>Clique para fazer upload</strong> ou
                                  arraste e solte.
                                </>
                              )} */}
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
                                {/* <span>{file.originalname}</span> */}
                                <span>{file.name}</span>
                              </div>
                              <Button
                                variant={"ghost"}
                                size={"icon"}
                                type="button"
                                // onClick={() => {
                                //   const payload =
                                //     form.getValues(String(column?.slug)) ?? [];
                                //   payload.splice(index, 1);
                                //   form.setValue(String(column?.slug), payload);
                                // }}
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
              name="cover"
              // defaultValue={defaultValue}
              // rules={{
              //   validate: (value) => {
              //     if (!value && required)
              //       return column.title.concat(" é obrigatório");

              //     if (required && Array.from(value).length === 0)
              //       return "Adicione ao menos um arquivo";
              //     return true;
              //   },
              // }}
              render={({ field }) => {
                // const hasError = !!form.formState.errors[column.slug!];

                return (
                  <FormItem>
                    <FormLabel className="data-[error=true]:text-destructive">
                      Imagem de Capa <span className="text-destructive">*</span>
                    </FormLabel>
                    <FileUploader
                      value={field.value}
                      onValueChange={(value) => {
                        // if (value) {
                        //   for (const file of value) {
                        //     mutate.mutate(file);
                        //   }
                        // }
                        field.onChange(value);
                      }}
                      dropzoneOptions={{
                        multiple: false,
                        maxFiles: 1,
                        maxSize: 4 * 1024 * 1024,
                      }}
                      reSelect={true}
                      className={cn(
                        "relative rounded-lg p-2 border border-dashed"
                        // hasError && "border-destructive",
                        // className
                      )}
                    >
                      <FileInput>
                        <div
                          className={cn(
                            "inline-flex items-center justify-center w-full gap-4 py-2"
                            // hasError && "text-destructive"
                          )}
                        >
                          <CloudUploadIcon
                            className={cn(
                              "w-8 h-8"
                              // mutate.status === "pending" && "animate-ping"
                            )}
                          />
                          <p className="mb-1 text-sm ">
                            <span>
                              {/* {mutate.status === "pending" && (
                                <strong>Realizando upload...</strong>
                              )}
                              {!(mutate.status === "pending") && (
                                <>
                                  <strong>Clique para fazer upload</strong> ou
                                  arraste e solte.
                                </>
                              )} */}
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
                                {/* <span>{file.originalname}</span> */}
                                <span>{file.name}</span>
                              </div>
                              <Button
                                variant={"ghost"}
                                size={"icon"}
                                type="button"
                                // onClick={() => {
                                //   const payload =
                                //     form.getValues(String(column?.slug)) ?? [];
                                //   payload.splice(index, 1);
                                //   form.setValue(String(column?.slug), payload);
                                // }}
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
                // disabled={update_user_status === "pending"}
              >
                Adicionar
                {/* {update_user_status === "pending" && (
                  <LoaderCircleIcon className="w-4 h-4 animate-spin" />
                )}
                {!(update_user_status === "pending") && <span>Atualizar</span>} */}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
