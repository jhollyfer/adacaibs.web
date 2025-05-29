import {
  Table as Root,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Events } from "@/lib/model";
import React from "react";
import { Row } from "./row";

interface Props {
  data: Events[];
  labels: string[];
}

export function Table({ data, labels }: Props): React.ReactElement {
  return (
    <Root>
      <TableHeader>
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
        {data.map((event) => (
          <Row data={event} key={event.id} />
        ))}
      </TableBody>
    </Root>
  );
}
