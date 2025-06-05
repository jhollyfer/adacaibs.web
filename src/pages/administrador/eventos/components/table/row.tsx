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
import { Events } from "@/lib/model";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  CalendarIcon,
  ClockIcon,
  EllipsisIcon,
  EyeIcon,
  MapPinIcon,
  PencilIcon,
  TrashIcon,
  UsersIcon,
} from "lucide-react";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Modal } from "../modal";
import { Sheet } from "../sheet";

interface Props {
  data: Events;
}

export function Row({ data }: Props): React.ReactElement {
  const updateButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const removeButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const location = useLocation();
  const [, setSearchParams] = useSearchParams(
    new URLSearchParams(location?.search)
  );

  const isEventUpcoming = (date: string): boolean => {
    return new Date(date) >= new Date();
  };

  const isUpcoming = isEventUpcoming(data.date);

  return (
    <TableRow key={data.id}>
      <TableCell className="font-medium">
        <div className="flex items-center gap-3">
          <img
            src={data.cover?.url || "/default.webp"}
            alt={data.title}
            className="h-12 w-20 object-cover rounded-md"
          />
          <div>
            <div>{data.title}</div>
            <Badge variant="outline" className="mt-1">
              {data.category}
            </Badge>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex flex-col">
          <div className="flex items-center text-sm">
            <CalendarIcon className="h-3.5 w-3.5 mr-1 text-gray-500" />
            <span>
              {format(data.date, "dd/MM/yyyy", {
                locale: ptBR,
              })}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="h-3.5 w-3.5 mr-1" />
            <span>{data.hour}</span>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center">
          <MapPinIcon className="h-4 w-4 mr-1 text-gray-500" />
          <div className="flex flex-col">
            <span>{data.location}</span>
            <span className="text-xs text-gray-500 mt-1">{data.address}</span>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center">
          <UsersIcon className="h-4 w-4 mr-1 text-gray-500" />
          <span>{data.capacity}</span>
        </div>
      </TableCell>

      <TableCell>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            isUpcoming
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {isUpcoming ? "Próximo" : "Passado"}
        </span>
      </TableCell>

      <TableCell className="w-[80px]">
        <DropdownMenu dir="ltr" modal={false}>
          <DropdownMenuTrigger className="p-1 rounded-full">
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
