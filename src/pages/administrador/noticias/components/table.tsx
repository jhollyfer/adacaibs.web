import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table as Root,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Notice } from "@/lib/model";
import { EllipsisIcon, EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
interface Props {
  data: Notice[];
  labels: string[];
}

export function Table({ data, labels }: Props): React.ReactElement {
  const editUserButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const viewUserButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const location = useLocation();
  const [, setSearchParams] = useSearchParams(
    new URLSearchParams(location?.search)
  );

  return (
    <React.Fragment>
      <Root>
        <TableHeader>
          <TableRow className="bg-primary/20 rounded-lg">
            {labels.map((label) => (
              <TableHead key={label}>
                <span>{label}</span>
              </TableHead>
            ))}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => {
            return (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.title}</TableCell>
                <TableCell className="font-medium">{row.category}</TableCell>
                <TableCell>
                  <Badge variant="outline">{row?.status}</Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {new Intl.DateTimeFormat("pt-BR", {
                    dateStyle: "long",
                  }).format(row.createdAt)}
                </TableCell>

                <TableCell className="w-[80px]">
                  <DropdownMenu dir="ltr" modal={false}>
                    <DropdownMenuTrigger className="p-1 rounded-full ">
                      <EllipsisIcon className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-10">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className="inline-flex space-x-1 w-full"
                        onClick={() => {
                          setSearchParams((state) => {
                            state.set("id", row.id!);
                            return state;
                          });
                          viewUserButtonRef?.current?.click();
                        }}
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span>Visualizar</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="inline-flex space-x-1 w-full"
                        onClick={() => {
                          setSearchParams((state) => {
                            state.set("id", row.id!);
                            return state;
                          });
                          editUserButtonRef?.current?.click();
                        }}
                      >
                        <PencilIcon className="w-4 h-4" />
                        <span>Editar</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="inline-flex space-x-1 w-full"
                        // onClick={() => {
                        // 	setSearchParams((state) => {
                        // 		state.set('row_id', row._id);
                        // 		return state;
                        // 	});
                        // 	removeRowButtonRef?.current?.click();
                        // }}
                      >
                        <TrashIcon className="w-4 h-4" />
                        <span>Remover</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Root>
      {/* <Sheet.UserView ref={viewUserButtonRef} /> */}
      {/* <Sheet.UserEdit ref={editUserButtonRef} /> */}
    </React.Fragment>
  );
}
