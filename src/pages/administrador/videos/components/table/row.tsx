import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Video } from "@/lib/model";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  CalendarIcon,
  ClockIcon,
  EllipsisIcon,
  EyeIcon,
  PencilIcon,
  PlayCircleIcon,
  SquareArrowOutUpRightIcon,
  TrashIcon,
} from "lucide-react";
import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Modal } from "../modal";
import { Sheet } from "../sheet";

interface Props {
  data: Video;
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
      <TableCell className="font-medium">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-20">
            <img
              src={data.cover?.url ?? "/default.webp"}
              alt={data.title}
              className="h-full w-full object-cover rounded-md"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircleIcon className="h-6 w-6 text-white" />
            </div>
          </div>
          <span>{data.title}</span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex flex-col">
          <div className="flex items-center text-sm">
            <CalendarIcon className="h-3.5 w-3.5 mr-1 text-gray-500" />
            <span>
              {format(data?.date, "dd/MM/yyyy", {
                locale: ptBR,
              })}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="h-3.5 w-3.5 mr-1" />
            <span>{data.duration}</span>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <span>{data.instructor}</span>
      </TableCell>

      <TableCell>
        <Link to={data.url} target="_blank" className="inline-flex">
          <span>Ver video</span>
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
              onClick={() => {
                setSearchParams((state) => {
                  state.set("id", data.id!);
                  return state;
                });
                removeButtonRef?.current?.click();
              }}
              className="inline-flex space-x-1 w-full"
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
