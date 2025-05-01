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
import { cn } from "@/lib/utils";
import { CloudUploadIcon, EyeIcon, EyeOffIcon, PaperclipIcon, TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole, UserStatus } from "@/lib/model";

export function Create({
  ...props
}: React.ComponentProps<typeof SheetTrigger>): React.JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const form = useForm();

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          // form.reset({
          //   name: "",
          //   email: "",
          //   password: "",
          //   role: "",
          //   status: "",
          // });
        }

        setOpen(o);
      }}
    >
      <SheetTrigger className="hidden" {...props} />
      <SheetContent className="py-4 px-6 sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="px-0">
          <SheetTitle className="text-lg font-medium">
            Adicionar novo usuário
          </SheetTitle>

          <SheetDescription>Adicione um novo usuário ao sistema</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={console.log}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="data-[error=true]:text-destructive">
                    Nome <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome completo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-right text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="data-[error=true]:text-destructive">
                    E-mail <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@exemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-right text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="data-[error=true]:text-destructive">
                    Senha <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite a senha"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-right text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="data-[error=true]:text-destructive">
                    Confirmar Senha <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirme a senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-right text-destructive" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="data-[error=true]:text-destructive">
                      Função <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma função" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMINISTRATOR}>Administrador</SelectItem>
                        <SelectItem value={UserRole.EDITOR}>Editor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-right text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="data-[error=true]:text-destructive">
                      Status <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserStatus.ACTIVE}>Ativo</SelectItem>
                        <SelectItem value={UserStatus.INACTIVE}>Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-right text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="data-[error=true]:text-destructive">
                      Foto de Perfil
                    </FormLabel>
                    <FileUploader
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      dropzoneOptions={{
                        multiple: false,
                        maxFiles: 1,
                        maxSize: 2 * 1024 * 1024, // 2MB
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
                                  const payload = form.getValues("avatar") ?? [];
                                  payload.splice(index, 1);
                                  form.setValue("avatar", payload);
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
                Adicionar Usuário
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}