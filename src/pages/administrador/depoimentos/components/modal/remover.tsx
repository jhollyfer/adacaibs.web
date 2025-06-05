import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { removeTestimonialFromPagination } from "@/lib/tanstack/actions/depoimentos";
import { useTestimonialRemoveMutation } from "@/lib/tanstack/mutation/depoimentos/remove";

import { LoaderCircleIcon } from "lucide-react";
import React from "react";
import { useSearchParams } from "react-router-dom";

export function Remove({
  ...props
}: React.ComponentProps<typeof DialogTrigger>): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(location.search)
  );

  const id = searchParams.get("id") ?? "";

  const remover = useTestimonialRemoveMutation({
    onError(error) {
      console.error(error);
    },
    onSuccess() {
      removeTestimonialFromPagination(
        {
          id,
        },
        {
          page: Number(searchParams.get("page") ?? 1),
          perPage: Number(searchParams.get("perPage") ?? 10),
          ...(searchParams.has("search") && {
            search: searchParams.get("search")!,
          }),
        }
      );
      searchParams.delete("id");
      setSearchParams(searchParams);
      setOpen(false);
    },
  });

  return (
    <Dialog
      modal
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          searchParams.delete("id");
          setSearchParams(searchParams);
        }

        setOpen(o);
      }}
    >
      <DialogTrigger className="hidden" {...props} />
      <DialogContent className="py-4 px-6">
        <DialogHeader>
          <DialogTitle>Remover registro</DialogTitle>
          <DialogDescription>
            Ao confirmar essa ação, o registro será removido permanentemente
          </DialogDescription>
        </DialogHeader>
        <section>
          <form className="pt-4 pb-2">
            <DialogFooter className="inline-flex w-full gap-2 justify-end">
              <DialogClose asChild>
                <Button className="bg-transparent  shadow-none border border-destructive text-destructive hover:bg-destructive/40">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                className="bg-destructive  hover:bg-destructive"
                type="button"
                onClick={() => {
                  remover.mutateAsync(id);
                }}
              >
                {remover.status === "pending" && (
                  <LoaderCircleIcon className="w-4 h-4 animate-spin" />
                )}
                {!(remover.status === "pending") && <span>Confirmar</span>}
              </Button>
            </DialogFooter>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
}
