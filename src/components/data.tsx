import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, XIcon } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  defaultValue?: Date;
  required?: boolean;
  name: string;
  label: string;
}

export function Data({
  required,
  defaultValue,
  name,
  label,
}: Props): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const form = useFormContext();

  function clear(event: React.MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    form.setValue(name, null);
  }

  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={defaultValue}
      rules={{
        validate: (value) => {
          if (!value && required) return name.concat(" é obrigatório");

          // if (value && Array.isArray(value) && value.length === 0 && required)
          //   return "Adicione ao menos uma opção";

          return true;
        },
      }}
      render={({ field }) => {
        const hasError = !!form.formState.errors[field.name];
        return (
          <FormItem className="flex flex-col w-full">
            <FormLabel className="data-[error=true]:text-destructive">
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-between pl-3 text-left font-normal border border-transparent",
                      !field.value && "text-muted-foreground",
                      hasError && "dark:border-destructive border-destructive"
                    )}
                  >
                    <span className="truncate">
                      {field.value &&
                        format(field.value, "dd/MM/yyyy", {
                          locale: ptBR,
                        })}
                      {!field.value && "Selecione uma data"}
                    </span>

                    <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                      {field.value && (
                        <span
                          onClick={clear}
                          className="flex items-center justify-center"
                        >
                          <XIcon className="h-4 w-4 opacity-50 hover:opacity-100 cursor-pointer transition-opacity" />
                        </span>
                      )}
                      <CalendarIcon className="h-4 w-4 opacity-50" />
                    </div>
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    if (date) setOpen(false);
                  }}
                  disabled={(date) => date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage className="text-right text-destructive" />
          </FormItem>
        );
      }}
    />
  );
}
