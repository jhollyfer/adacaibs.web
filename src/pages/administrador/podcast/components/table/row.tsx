import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Podcast } from "@/lib/model";
import {
  EllipsisIcon,
  EyeIcon,
  PencilIcon,
  SquareArrowOutUpRightIcon,
  TrashIcon,
} from "lucide-react";
import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Modal } from "../modal";
import { Sheet } from "../sheet";

interface Props {
  data: Podcast;
}

export function Row({ data }: Props): React.ReactElement {
  const updateButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const removeButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const location = useLocation();
  const [, setSearchParams] = useSearchParams(
    new URLSearchParams(location?.search)
  );

  return (
    <TableRow key={data.id}>
      <TableCell className="flex items-center gap-3">
        {data.cover?.url && (
          <img
            src={data.cover?.url}
            alt="Capa"
            className="w-8 h-8 object-cover rounded border flex-shrink-0"
          />
        )}
        <span className="truncate">{data.title}</span>
      </TableCell>
      <TableCell>{data.presenters?.join(", ")}</TableCell>
      <TableCell>{"100 ouvintes"}</TableCell>

      <TableCell>
        <Link
          to={data.audio?.url ?? "#"}
          target="_blank"
          className="inline-flex"
        >
          <span>Ouvir audio</span>
          <SquareArrowOutUpRightIcon className="w-4 h-4 ml-1" />
        </Link>
      </TableCell>

      <TableCell className="w-[80px]">
        <DropdownMenu dir="ltr" modal={false}>
          <DropdownMenuTrigger className="p-1 rounded-full ">
            <EllipsisIcon className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-10">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="inline-flex space-x-1 w-full">
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
              onClick={() => {
                setSearchParams((state) => {
                  state.set("id", data.id!);
                  return state;
                });
                removeButtonRef?.current?.click();
              }}
            >
              <TrashIcon className="w-4 h-4" />
              <span>Remover</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
          <Modal.Remove ref={removeButtonRef} />
          <Sheet.Update ref={updateButtonRef} />
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
