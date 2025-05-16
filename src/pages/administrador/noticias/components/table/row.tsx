import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Notice } from "@/lib/model";
import { EllipsisIcon, EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";

interface Props {
  data: Notice;
}

export function Row({ data }: Props): React.ReactElement {
  const updateButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(location?.search)
  );

  return (
    <TableRow key={data.id}>
      <TableCell>{data.title}</TableCell>
      <TableCell>{data.category}</TableCell>
      <TableCell>
        <Badge variant="outline">{data?.status}</Badge>
      </TableCell>
      <TableCell>{"Administrador"}</TableCell>
      <TableCell>{"100 visualizações"}</TableCell>
      <TableCell>
        {new Intl.DateTimeFormat("pt-BR", {
          dateStyle: "long",
        }).format(data.createdAt)}
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
                searchParams.set("id", data.id!);
                setSearchParams(searchParams);
              }}
            >
              <EyeIcon className="w-4 h-4" />
              <span>Visualizar</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="inline-flex space-x-1 w-full"
              onClick={() => {
                searchParams.set("id", data.id!);
                setSearchParams(searchParams);
                updateButtonRef?.current?.click();
              }}
            >
              <PencilIcon className="w-4 h-4" />
              <span>Editar</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="inline-flex space-x-1 w-full"
            // onClick={() => {
            // 	setSearchParams((state) => {
            // 		state.set('id', row.id);
            // 		return state;
            // 	});
            // 	removeTestimonialButtonRef?.current?.click();
            // }}
            >
              <TrashIcon className="w-4 h-4" />
              <span>Remover</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
