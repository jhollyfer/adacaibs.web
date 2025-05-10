import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Filter, PlusIcon, Search } from "lucide-react";
import React from "react";
import { Sheet } from "./components/sheet";
import { Table } from "./components/table";
import { useLocation, useSearchParams } from "react-router-dom";
import { useNoticePaginateQuery } from "@/lib/tanstack/query/noticias/paginate";
import { Pagination } from "@/components/pagination";

export function Notice(): React.JSX.Element {
  const location = useLocation();
  const [searchParams] = useSearchParams(new URLSearchParams(location.search));

  const noticeCreateButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const paginate = useNoticePaginateQuery({
    page: Number(searchParams.get("page") ?? 1),
    per_page: Number(searchParams.get("per_page") ?? 10),
    ...(searchParams.has("search") && { search: searchParams.get("search")! }),
  });

  return (
    <React.Fragment>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Notícias</h1>
          <Button
            disabled={paginate.status === "pending"}
            onClick={() => noticeCreateButtonRef.current?.click()}
            className="flex items-center"
          >
            <PlusIcon className="mr-2 h-4 w-4" /> Nova Notícia
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar notícias..."
              className="pl-10 w-full sm:w-80"
              disabled={paginate.status === "pending"}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" /> Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Todas as notícias</DropdownMenuItem>
              <DropdownMenuItem>Publicadas</DropdownMenuItem>
              <DropdownMenuItem>Rascunhos</DropdownMenuItem>
              <DropdownMenuItem>Mais recentes</DropdownMenuItem>
              <DropdownMenuItem>Mais visualizadas</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* TODO: criar um estado vazio para quando não tem nada */}
        {paginate.status === "success" && (
          <React.Fragment>
            <div className="border rounded-lg">
              <Table
                labels={[
                  "Título",
                  "Categoria",
                  "Status",
                  "Autor",
                  "Visualizações",
                  "Data de submissão",
                ]}
                data={paginate.data?.data}
              />
            </div>
            <Pagination meta={paginate.data?.meta} />
          </React.Fragment>
        )}
      </div>

      <Sheet.Create ref={noticeCreateButtonRef} />
    </React.Fragment>
  );
}
