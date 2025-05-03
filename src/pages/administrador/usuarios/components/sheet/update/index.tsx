import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";

import { useLocation, useSearchParams } from "react-router-dom";
import { Form } from "./form";

export function Update({
  ...props
}: React.ComponentProps<typeof SheetTrigger>): React.JSX.Element {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(location.search)
  );

  const enabledQuery =
    searchParams.has("id") &&
    location?.pathname.includes("/usuarios") &&
    /[?&]id=/.test(location.search);

  const [open, setOpen] = React.useState<boolean>(enabledQuery);

  return (
    <Sheet
      open={open}
      onOpenChange={(_open) => {
        if (!_open) {
          searchParams.delete("id");
          setSearchParams(searchParams);
        }
        setOpen(_open);
      }}
    >
      <SheetTrigger className="hidden" {...props} />
      <SheetContent className="py-4 px-6 sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="px-0">
          <SheetTitle className="text-lg font-medium">
            Atualizar usuário
          </SheetTitle>

          <SheetDescription>Editar informações do usuário</SheetDescription>
        </SheetHeader>

        <Form onClose={() => setOpen(false)} open={open} />
      </SheetContent>
    </Sheet>
  );
}
