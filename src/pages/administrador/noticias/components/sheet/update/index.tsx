import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNoticeShowQuery } from "@/lib/tanstack/query/noticias/show";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Form } from "./form";

export function Update({
  ...props
}: React.ComponentProps<typeof SheetTrigger>): React.JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(location.search)
  );

  const enabled =
    searchParams.has("id") &&
    location?.pathname.includes("/noticias") &&
    /[?&]id=/.test(location.search);

  const id = searchParams.get("id") || "";

  const notice = useNoticeShowQuery({
    enabled,
    id,
  });

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
      <SheetContent className="py-4 px-6 sm:max-w-2xl">
        <SheetHeader className="px-0">
          <SheetTitle className="text-lg font-medium">
            Atualizar notícia
          </SheetTitle>

          <SheetDescription>Atualize sua notícia</SheetDescription>
        </SheetHeader>

        {notice?.status === "success" && (
          <Form
            onClose={() => {
              searchParams.delete("id");
              setSearchParams(searchParams);
              setOpen(false);
            }}
            data={notice.data}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
