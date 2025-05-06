import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import { Form } from "./form";

export function Create({
  ...props
}: React.ComponentProps<typeof SheetTrigger>): React.JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="hidden" {...props} />
      <SheetContent className="py-4 px-6 sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="px-0">
          <SheetTitle className="text-lg font-medium">Novo registro</SheetTitle>

          <SheetDescription>
            Adicione um novo usuário ao sistema
          </SheetDescription>
        </SheetHeader>

        <Form onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
