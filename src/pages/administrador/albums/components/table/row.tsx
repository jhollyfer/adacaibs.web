import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Album } from "@/lib/model";
import {
  EllipsisIcon,
  EyeIcon,
  ImageIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Sheet } from "../sheet";

interface Props {
  data: Album;
}

export function Row({ data }: Props): React.ReactElement {
  const updateButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(location?.search)
  );

  return (
    <TableRow key={data.id}>
      <TableCell className="font-medium">
        <div className="flex items-center gap-3">
          <img
            src={data.cover?.url || "/default.webp"}
            alt={data.title}
            className="h-12 w-20 object-cover rounded-md"
          />
          <span>{data.title}</span>
        </div>
      </TableCell>

      {/* <TableCell>
        <div className="flex items-center text-sm">
          <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
          <span>{data.description}</span>
        </div>
      </TableCell> */}

      <TableCell>
        <span className="line-clamp-2 text-sm text-gray-700">
          {data.description}
        </span>
      </TableCell>

      <TableCell>
        <div className="flex items-center">
          <ImageIcon className="h-4 w-4 mr-1 text-gray-500" />
          <span>{data.images.length} fotos</span>
        </div>
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
              // 		state.set('id', data.id);
              // 		return state;
              // 	});
              // 	removeAlbumButtonRef?.current?.click();
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
