import {
  Table as Root,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginateMetaResponse, User } from "@/lib/model";
import { QUERY, TanstackQuery } from "@/lib/tanstack/instance";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Row } from "./row";

interface Props {
  labels: string[];
}

export function Table({ labels }: Props): React.ReactElement {
  const location = useLocation();
  const [searchParams] = useSearchParams(new URLSearchParams(location.search));

  const paginate = TanstackQuery.getQueryData<PaginateMetaResponse<User[]>>([
    QUERY.USER_PAGINATE,
    {
      page: Number(searchParams.get("page") ?? 1),
      perPage: Number(searchParams.get("perPage") ?? 10),
      ...(searchParams.has("search") && {
        search: searchParams.get("search")!,
      }),
    },
  ]);

  return (
    <Root>
      <TableHeader className="sticky top-0 bg-background">
        <TableRow>
          {labels.map((label) => (
            <TableHead key={label}>
              <span>{label}</span>
            </TableHead>
          ))}
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginate?.data.map((user) => (
          <Row key={user.id} data={user} />
        ))}
      </TableBody>
    </Root>
  );
}
