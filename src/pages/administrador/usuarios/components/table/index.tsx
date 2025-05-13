import {
  Table as Root,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/lib/model";
import React from "react";
import { Row } from "./row";

interface Props {
  data: User[];
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
        {data.map((user) => (
          <Row key={user.id} data={user} />
        ))}
      </TableBody>
    </Root>
  );
}
