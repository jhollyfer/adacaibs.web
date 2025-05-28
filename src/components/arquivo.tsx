import { Button } from "@/components/ui/button";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
} from "@/components/ui/file-uploader";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Storage } from "@/lib/model";
import { useUploadMutation } from "@/lib/tanstack/mutation/storage/upload";
import { cn, getFileType } from "@/lib/utils";
import {
  CloudUploadIcon,
  FileIcon,
  LoaderCircleIcon,
  TrashIcon,
} from "lucide-react";
import React from "react";
import { DropzoneOptions } from "react-dropzone";
import { useFormContext } from "react-hook-form";

interface Props {
  defaultValue?: Storage[];
  fieldName: string;
  label: string;
  dropzoneOptions: DropzoneOptions;
}

export function Arquivo({
  defaultValue,
  fieldName,
  label,
  dropzoneOptions,
}: Props): React.JSX.Element {
  const [files, setFiles] = React.useState<Storage[]>([
    ...(defaultValue || []),
  ]);

  const form = useFormContext();

  const upload = useUploadMutation({
    mutationKey: ["upload-".concat(fieldName)],
    onError(error) {
      console.log(error);
    },
    onSuccess(resposta) {
      if (!dropzoneOptions?.multiple) {
        form.setValue(fieldName, resposta[0].id);
        setFiles([resposta[0]]);
        return;
      }

      setFiles((estado) => {
        form.setValue(
          fieldName,
          [...estado, ...resposta]?.flatMap((x) => x.id)
        );
        return [...estado, ...resposta];
      });
    },
  });

  return (
    <React.Fragment>
      <FormField
        control={form.control}
        name="files"
        render={({ field }) => {
          const hasError = !!form.formState.errors[fieldName];

          return (
            <FormItem>
              <FormLabel className="data-[error=true]:text-destructive">
                {label}
              </FormLabel>
              <FileUploader
                orientation="horizontal"
                value={field.value}
                onValueChange={(value) => {
                  if (value && value.length > 0) {
                    const formData = new FormData();
                    for (const file of value) {
                      formData.append("files[]", file);
                    }
                    upload.mutateAsync(formData);
                  }
                  // field.onChange(value);
                }}
                dropzoneOptions={dropzoneOptions}
                reSelect={true}
                className={cn(
                  "relative rounded-lg border border-dashed",
                  hasError && "border-destructive"
                )}
              >
                <FileInput>
                  <div
                    className={cn(
                      "inline-flex items-center justify-center w-full gap-4 py-2"
                    )}
                  >
                    {!(upload.status === "pending") && (
                      <CloudUploadIcon className="w-4 h-4 " />
                    )}
                    {upload.status === "pending" && (
                      <LoaderCircleIcon className="w-4 h-4 animate-spin" />
                    )}

                    <p className="text-sm">
                      {!(upload.status === "pending") && (
                        <span>
                          <strong>Clique para fazer upload</strong> ou arraste e
                          solte.
                        </span>
                      )}
                      {upload.status === "pending" && (
                        <span>
                          <strong>Aguarde</strong> enviando o arquivo.
                        </span>
                      )}
                    </p>
                  </div>
                </FileInput>
                {files?.length > 0 && (
                  <FileUploaderContent className="p-2 inline-flex">
                    {files.map((file) => {
                      const type = getFileType(file);

                      return (
                        <div
                          key={file.id}
                          className="size-20 p-0 rounded-md overflow-hidden border border-muted bg-muted relative"
                          aria-roledescription={`file ${file.id} containing ${file.name}`}
                        >
                          {type === "image" && file.url && (
                            <img
                              src={file.url}
                              alt={file.name}
                              className="size-20 p-0"
                            />
                          )}

                          {type !== "image" && (
                            <FileIcon className="size-20 stroke-current" />
                          )}

                          <Button
                            variant={"ghost"}
                            size={"icon"}
                            type="button"
                            className="absolute top-1 right-1 z-10 p-1 h-auto w-auto cursor-pointer"
                            onClick={() => {
                              const payload = files.filter(
                                (f) => f.id !== file.id
                              );
                              setFiles(payload);
                              form.setValue(
                                fieldName,
                                payload.flatMap((f) => f.id)
                              );
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
              <FormMessage className="text-right text-destructive" />
            </FormItem>
          );
        }}
      />

      <FormField
        control={form.control}
        name={fieldName}
        defaultValue={files?.flatMap((f) => f.id)}
        render={() => <React.Fragment />}
      />
    </React.Fragment>
  );
}
