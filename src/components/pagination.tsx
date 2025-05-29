import { Button } from "@/components/ui/button";
import { PaginationContent, PaginationItem } from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Meta } from "@/lib/model";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React from "react";
import { useSearchParams } from "react-router-dom";

interface Props {
  meta: Meta;
}

export function Pagination({ meta }: Props): React.JSX.Element {
  const [, setSearchParams] = useSearchParams();

  const page = Number(meta?.page ?? 1);
  const perPage = Number(meta?.perPage ?? 10);
  const lastPage = Number(meta?.lastPage ?? 1);

  return (
    <section className="inline-flex w-full justify-between flex-shrink-0">
      <div className="inline-flex gap-2 items-center">
        <span className="inline-flex flex-1">Registros por página: </span>
        <Select
          defaultValue={String(perPage)}
          onValueChange={(value) => {
            setSearchParams({ perPage: value, page: "1" });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="inline-flex space-x-8 items-center">
        <label className="inline-block max-w-48 w-full">
          Página <strong>{page}</strong> de <strong>{lastPage}</strong>
        </label>
        <PaginationContent className="justify-end">
          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              className="border"
              disabled={page === 1}
              onClick={() => {
                setSearchParams({ page: "1" });
              }}
            >
              <ChevronsLeft />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              className="border"
              disabled={page === 1}
              onClick={() => {
                setSearchParams({ page: String(page - 1) });
              }}
            >
              <ChevronLeft />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              className="border"
              disabled={page === lastPage}
              onClick={() => {
                setSearchParams({ page: String(page + 1) });
              }}
            >
              <ChevronRight />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              className="border"
              disabled={page === lastPage}
              onClick={() => {
                setSearchParams({ page: String(lastPage) });
              }}
            >
              <ChevronsRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </div>
    </section>
  );
}
