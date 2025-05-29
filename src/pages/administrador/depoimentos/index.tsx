import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTestimonialPaginateQuery } from "@/lib/tanstack/query/depoimentos/paginate";
import { Plus, Search } from "lucide-react";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Sheet } from "./components/sheet";
import { Table } from "./components/table";

export function Testimonials(): React.JSX.Element {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(location.search)
  );

  const createButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const paginate = useTestimonialPaginateQuery({
    page: Number(searchParams.get("page") ?? 1),
    perPage: Number(searchParams.get("perPage") ?? 10),
    ...(searchParams.has("search") && { search: searchParams.get("search")! }),
  });

  return (
    <React.Fragment>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Depoimentos</h1>
          <Button
            disabled={paginate.status === "pending"}
            onClick={() => createButtonRef.current?.click()}
          >
            <Plus className="mr-2 h-4 w-4" /> Novo Depoimento
          </Button>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar cargo ou nome..."
              className="pl-8"
              disabled={paginate.status === "pending"}
              onKeyDown={(event) => {
                if (
                  (event.key === "Backspace" &&
                    event.currentTarget.value?.length === 1) ||
                  event.currentTarget.value === ""
                ) {
                  searchParams.delete("search");
                  setSearchParams(searchParams);
                }

                if (event.key === "Enter" && event.currentTarget.value) {
                  searchParams.set("search", event.currentTarget.value);
                  setSearchParams(searchParams);
                }
              }}
              defaultValue={searchParams.get("search") ?? ""}
            />
          </div>
        </div>

        {paginate.status === "success" && (
          <React.Fragment>
            <div className="rounded-md border">
              <Table
                labels={["Pessoa", "Depoimento", "Avaliação", "Status", "Data"]}
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
