import { Podcast } from "@/lib/model";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon, EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Sheet } from "../sheet";

interface Props {
  data: Podcast;
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
      <TableCell>{data.presenters?.join(", ")}</TableCell>
      <TableCell>{"100 ouvintes"}</TableCell>

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
                setSearchParams((state) => {
                  state.set("id", data.id!);
                  return state;
                });
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
            // 		state.set('data_id', data._id);
            // 		return state;
            // 	});
            // 	removeButtonRef?.current?.click();
            // }}
            >
              <TrashIcon className="w-4 h-4" />
              <span>Remover</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
          <Sheet.Update ref={updateButtonRef} />
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}