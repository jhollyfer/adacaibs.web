import {
  FileInput,
  FileUploader,
  FileUploaderContent,
} from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Storage } from "@/lib/model";
import { useUploadMutation } from "@/lib/tanstack/mutation/storage/upload";
import { cn } from "@/lib/utils";
import { UserCreatePayload } from "@/schemas/usuario";
import {
  CheckCircleIcon,
  CloudUploadIcon,
  LoaderCircleIcon,
  PaperclipIcon,
  TrashIcon,
} from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  defaultValue?: Storage[];
}

export function UploaderFile({ defaultValue }: Props): React.JSX.Element {
  const [files, setFiles] = React.useState<Storage[]>([
    ...(defaultValue || []),
  ]);

  const uploadMutation = useUploadMutation({
    onError(error) {
      console.log(error);
    },
    onSuccess([response]) {
      setFiles([response]);
      form.setValue("avatar_id", response.id!);
    },
  });

  const form = useFormContext<UserCreatePayload>();
  return (
    <FormField
      control={form.control}
      name="files"
      // defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="data-[error=true]:text-destructive">
              Foto de Perfil
            </FormLabel>
            <FileUploader
              value={field.value}
              onValueChange={(value) => {
                if (value && value.length > 0) {
                  const formData = new FormData();
                  formData.append("files[0]", value[0]);
                  uploadMutation.mutateAsync(formData);
                }

                field.onChange(value);
              }}
              dropzoneOptions={{
                multiple: false,
                maxFiles: 1,
                maxSize: 2 * 1024 * 1024, // 2MB
                accept: {
                  "image/*": [".jpeg", ".jpg", ".png", ".webp"],
                },
              }}
              reSelect={true}
              className={cn("relative rounded-lg p-2 border border-dashed")}
            >
              <FileInput>
                <div
                  className={cn(
                    "inline-flex items-center justify-center w-full gap-4 py-2"
                  )}
                >
                  {uploadMutation.status === "pending" && (
                    <React.Fragment>
                      <LoaderCircleIcon className="w-4 h-4 animate-spin" />
                      <p className="text-sm">
                        <span>
                          <strong>Aguarde</strong> enviando o arquivo.
                        </span>
                      </p>
                    </React.Fragment>
                  )}

                  {!(uploadMutation.status === "pending") &&
                    files?.length === 0 && (
                      <React.Fragment>
                        <CloudUploadIcon className="w-4 h-4 " />
                        <p className="text-sm">
                          <span>
                            <strong>Clique para fazer upload</strong> ou arraste
                            e solte.
                          </span>
                        </p>
                      </React.Fragment>
                    )}

                  {uploadMutation.status === "success" && files?.length > 0 && (
                    <React.Fragment>
                      <CheckCircleIcon className="w-4 h-4 " />
                      <p className="text-sm">
                        <span>
                          <strong>Pronto</strong> arquivo foi submetido.
                        </span>
                      </p>
                    </React.Fragment>
                  )}
                </div>
              </FileInput>
              {files?.length > 0 && (
                <FileUploaderContent>
                  {files.map((file) => {
                    return (
                      <div
                        key={file.id}
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
                            const payload = files.filter(
                              (f) => f.id !== file.id
                            );
                            setFiles(payload);
                            form.setValue("avatar_id", null);
                            form.setValue("files", []);
                          }}
                        >
                          <TrashIcon className="w-4 h-4 stroke-current" />
                        </Button>
                      </div>
                    );
                  })}
                </FileUploaderContent>
              )}
            </FileUploader>
          </FormItem>
        );
      }}
    />
  );
}
