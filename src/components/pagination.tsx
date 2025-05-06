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
import { PaginateMetaResponse } from "@/lib/model";
import {
  ChevronLeft,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRightIcon,
} from "lucide-react";
import React from "react";
import { useSearchParams } from "react-router-dom";

interface Props {
  meta: PaginateMetaResponse<unknown>["meta"];
}

export function Pagination({ meta }: Props): React.JSX.Element {
  const [, setSearchParams] = useSearchParams();

  const page = Number(meta?.page ?? 1);
  const per_page = Number(meta?.per_page ?? 10);
  const last_page = Number(meta?.last_page ?? 1);

  return (
    <section className="inline-flex w-full justify-between">
      <div className="inline-flex gap-2 items-center">
        <span className="inline-flex flex-1">Registros por página: </span>
        <Select
          defaultValue={String(per_page)}
          onValueChange={(value) => {
            setSearchParams({ per_page: value, page: "1" });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {[10, 20, 30, 40, 50].map((item) => (
                <SelectItem key={item} value={String(item)}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="inline-flex space-x-8 items-center">
        <label className="inline-block max-w-48 w-full">
          Página <strong>{page}</strong> de <strong>{last_page}</strong>
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
              disabled={page === last_page}
              onClick={() => {
                setSearchParams({ page: String(page + 1) });
              }}
            >
              <ChevronRightIcon />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              className="border"
              disabled={page === last_page}
              onClick={() => {
                setSearchParams({ page: String(last_page) });
              }}
            >
              <ChevronsRightIcon />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </div>
    </section>
  );
}
