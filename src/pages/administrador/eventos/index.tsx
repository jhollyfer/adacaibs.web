import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEventsPaginateQuery } from "@/lib/tanstack/query/eventos/paginate";
import { Plus, Search } from "lucide-react";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Sheet } from "./components/sheet";
import { Table } from "./components/table";

export function Events(): React.JSX.Element {
  const location = useLocation();
  const [searchParams] = useSearchParams(new URLSearchParams(location.search));

  const createButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const [filter, setFilter] = React.useState<string>("all");

  // TODO: adicionar isso na rota do backend, não podemos fazer isso aqui
  // const filteredEvents = React.useMemo(() => {
  //   if (filter === "upcoming") {
  //     return mockEvents.filter(event => new Date(event.date) >= new Date());
  //   } else if (filter === "past") {
  //     return mockEvents.filter(event => new Date(event.date) < new Date());
  //   }
  //   return mockEvents;
  // }, [filter]);

  const paginate = useEventsPaginateQuery({
    page: Number(searchParams.get("page") ?? 1),
    per_page: Number(searchParams.get("per_page") ?? 10),
    ...(searchParams.has("search") && { search: searchParams.get("search")! }),
  });

  return (
    <React.Fragment>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Eventos</h1>
          <Button
            disabled={paginate.status === "pending"}
            onClick={() => createButtonRef.current?.click()}
          >
            <Plus className="mr-2 h-4 w-4" /> Novo Evento
          </Button>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar eventos..."
              className="pl-8"
              disabled={paginate.status === "pending"}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              Todos
            </Button>
            <Button
              variant={filter === "upcoming" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("upcoming")}
            >
              Próximos
            </Button>
            <Button
              variant={filter === "past" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("past")}
            >
              Passados
            </Button>
          </div>
        </div>

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
      <Sheet.Create ref={createButtonRef} />
    </React.Fragment>
  );
}
