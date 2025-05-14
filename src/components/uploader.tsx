import {
  FileInput,
  FileUploader,
  FileUploaderContent,
} from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Storage } from "@/lib/model";
import { useUploadMutation } from "@/lib/tanstack/mutation/storage/upload";
import { cn, storageToFile } from "@/lib/utils";
import {
  CheckCircleIcon,
  CloudUploadIcon,
  LoaderCircleIcon,
  PaperclipIcon,
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

export function Uploader({
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
    onError(error) {
      console.log(error);
    },
    onSuccess([response]) {
      setFiles([response]);
      form.setValue(fieldName, response.id!);
    },
  });

  const defaultFile = React.useMemo(() => {
    if (defaultValue?.length === 0) return null;
    return defaultValue?.map(storageToFile);
  }, [defaultValue]);

  return (
    <FormField
      control={form.control}
      name="files"
      defaultValue={defaultFile}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="data-[error=true]:text-destructive">
              {label}
            </FormLabel>
            <FileUploader
              value={field.value}
              onValueChange={(value) => {
                if (value && value.length > 0) {
                  const formData = new FormData();
                  formData.append("files[0]", value[0]);
                  upload.mutateAsync(formData);
                }

                field.onChange(value);
              }}
              dropzoneOptions={dropzoneOptions}
              reSelect={true}
              className={cn("relative rounded-lg p-2 border border-dashed")}
            >
              <FileInput>
                <div
                  className={cn(
                    "inline-flex items-center justify-center w-full gap-4 py-2"
                  )}
                >
                  {upload.status === "pending" && (
                    <React.Fragment>
                      <LoaderCircleIcon className="w-4 h-4 animate-spin" />
                      <p className="text-sm">
                        <span>
                          <strong>Aguarde</strong> enviando o arquivo.
                        </span>
                      </p>
                    </React.Fragment>
                  )}

                  {!(upload.status === "pending") && files?.length === 0 && (
                    <React.Fragment>
                      <CloudUploadIcon className="w-4 h-4 " />
                      <p className="text-sm">
                        <span>
                          <strong>Clique para fazer upload</strong> ou arraste e
                          solte.
                        </span>
                      </p>
                    </React.Fragment>
                  )}

                  {upload.status === "success" && files?.length > 0 && (
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
                            form.setValue(fieldName, null);
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
