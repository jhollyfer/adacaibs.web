import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAlbumPaginateQuery } from "@/lib/tanstack/query/album/paginate";
import { Plus, Search } from "lucide-react";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Sheet } from "./components/sheet";
import { Table } from "./components/table";

export function Gallery(): React.JSX.Element {
  const location = useLocation();
  const [searchParams] = useSearchParams(new URLSearchParams(location.search));

  const albumCreateButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const paginate = useAlbumPaginateQuery({
    page: Number(searchParams.get("page") ?? 1),
    perPage: Number(searchParams.get("perPage") ?? 10),
    ...(searchParams.has("search") && { search: searchParams.get("search")! }),
  });

  return (
    <React.Fragment>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Galeria de Fotos</h1>
          <Button
            disabled={paginate.status === "pending"}
            onClick={() => albumCreateButtonRef.current?.click()}
          >
            <Plus className="mr-2 h-4 w-4" /> Novo Álbum
          </Button>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar álbuns..."
              className="pl-8"
              disabled={paginate.status === "pending"}
            />
          </div>
        </div>

        {paginate.status === "success" && (
          <React.Fragment>
            <div className="border rounded-lg">
              <Table
                labels={["Título", "Descrição", "Data de submissão"]}
                data={paginate.data?.data}
              />
            </div>
            <Pagination meta={paginate.data?.meta} />
          </React.Fragment>
        )}
      </div>
      <Sheet.Create ref={albumCreateButtonRef} />
    </React.Fragment>
  );
}
