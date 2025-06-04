import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { MetaBase } from "@/lib/constant";
import { useVideoPaginateQuery } from "@/lib/tanstack/query/videos/paginate";
import { PlusIcon } from "lucide-react";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Sheet } from "./components/sheet";
import { Table } from "./components/table";

export function Video(): React.JSX.Element {
  const location = useLocation();
  const [searchParams] = useSearchParams(new URLSearchParams(location.search));

  const createButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const paginate = useVideoPaginateQuery({
    page: Number(searchParams.get("page") ?? 1),
    perPage: Number(searchParams.get("perPage") ?? 10),
    ...(searchParams.has("search") && { search: searchParams.get("search")! }),
  });

  return (
    <React.Fragment>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex-shrink-0 p-2 flex flex-row justify-between gap-1 border-b">
          <h1 className="text-2xl font-medium ">Vídeos</h1>

          <Button
            type="button"
            onClick={() => createButtonRef.current?.click()}
            disabled={paginate.status === "pending"}
            className="py-1 px-2  h-auto inline-flex gap-1 cursor-pointer"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Novo vídeo</span>
          </Button>
        </div>

        <div className="flex-1 flex flex-col min-h-0 overflow-auto relative">
          <Table
            labels={[
              "Vídeo",
              "Data-Hora",
              "Apresentador/Instrutor",
              "Link do Vídeo",
            ]}
            data={paginate.data?.data ?? []}
          />
        </div>

        <div className="flex-shrink-0 border-t p-2">
          <Pagination meta={paginate?.data?.meta ?? MetaBase} />
        </div>
        <Sheet.Create ref={createButtonRef} />
      </div>
    </React.Fragment>
  );
}
