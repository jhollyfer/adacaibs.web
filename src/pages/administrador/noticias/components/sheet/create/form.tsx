import { Arquivo } from "@/components/arquivo";
import { MultipleSelector } from "@/components/multi-selector";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as Root,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { NOTICE_CATEGORY_LIST, NOTICE_STATUS_LIST } from "@/lib/constant";
import { NoticeStatus } from "@/lib/model";
import { addedNoticeToPagination } from "@/lib/tanstack/actions/noticias";
import { useNoticeCreateMutation } from "@/lib/tanstack/mutation/noticias/create";
import { cn } from "@/lib/utils";
import { NoticeCreatePayload, NoticeSchema } from "@/schemas/noticias";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation, useSearchParams } from "react-router-dom";

export function Form({ onClose }: { onClose: () => void }): React.JSX.Element {
  const location = useLocation();
  const [searchParams] = useSearchParams(new URLSearchParams(location.search));

  const create = useNoticeCreateMutation({
    onError(error) {
      console.log(error);
    },
    onSuccess(response) {
      addedNoticeToPagination(response, {
        page: Number(searchParams.get("page") ?? 1),
        perPage: Number(searchParams.get("perPage") ?? 10),
        ...(searchParams.has("search") && {
          search: searchParams.get("search")!,
        }),
      });
      onClose();
    },
  });

  const form = useForm<NoticeCreatePayload>({
    resolver: zodResolver(NoticeSchema["create"]),
    defaultValues: {
      status: NoticeStatus.DRAFT,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    create.mutateAsync(data);
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
                Título <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Digite o título da notícia" {...field} />
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
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {NOTICE_CATEGORY_LIST.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
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
              <FormItem className="w-full">
                <FormLabel className="data-[error=true]:text-destructive">
                  Status <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {NOTICE_STATUS_LIST.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                Resumo <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Adicione seu resumo aqui..."
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
                Conteúdo <span className="text-destructive">*</span>
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
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => {
            const hasError = !!form.formState.errors[field.name];

            return (
              <FormItem>
                <FormLabel className="data-[error=true]:text-destructive">
                  Tags
                </FormLabel>
                <FormControl>
                  <MultipleSelector
                    onChange={(value) => {
                      field.onChange(value.flatMap((v) => v.value));
                      // field.onChange(value);
                    }}
                    defaultOptions={[]}
                    value={
                      field.value?.map((v) => ({ value: v, label: v })) || []
                    }
                    creatable
                    triggerSearchOnFocus
                    placeholder="Escreva e adicione"
                    emptyIndicator={null}
                    className={cn("w-full", hasError && "border-destructive")}
                  />
                </FormControl>
                <FormMessage className="text-right text-destructive" />
              </FormItem>
            );
          }}
        />

        <SheetFooter className="inline-flex flex-1 justify-end w-full px-0">
          <Button
            className=""
            type="submit"
            disabled={create.status === "pending"}
          >
            {create.status === "pending" && (
              <LoaderCircleIcon className="w-4 h-4 animate-spin" />
            )}
            {!(create.status === "pending") && <span>Adicionar </span>}
          </Button>
        </SheetFooter>
      </form>
    </Root>
  );
}
