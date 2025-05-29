import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useVideoShowQuery } from "@/lib/tanstack/query/videos/show";
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
    location?.pathname.includes("/videos") &&
    /[?&]id=/.test(location.search);

  const id = searchParams.get("id") || "";

  const video = useVideoShowQuery({
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
      <SheetContent className="py-4 px-6 sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="px-0">
          <SheetTitle className="text-lg font-medium">
            Atualizar evento
          </SheetTitle>

          <SheetDescription>Atualize seu evento</SheetDescription>
        </SheetHeader>

        {video?.status === "success" && (
          <Form
            onClose={() => {
              searchParams.delete("id");
              setSearchParams(searchParams);
              setOpen(false);
            }}
            data={video.data}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
