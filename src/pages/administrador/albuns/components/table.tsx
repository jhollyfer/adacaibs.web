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
import { Album } from "@/lib/model";
import { Calendar, EllipsisIcon, EyeIcon, ImageIcon, PencilIcon, TrashIcon } from "lucide-react";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Sheet } from "./sheet";

interface Props {
  data: Album[];
  labels: string[];
}

export function Table({ data, labels }: Props): React.ReactElement {
  const albumUpdateButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const location = useLocation();
  const [, setSearchParams] = useSearchParams(
    new URLSearchParams(location?.search)
  );

  return (
    <React.Fragment>
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
          {data.map((row) => {
            return (
              <TableRow key={row.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <img
                      src={row.cover || "/default.webp"}
                      alt={row.title}
                      className="h-12 w-20 object-cover rounded-md"
                    />
                    <span>{row.title}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                    <span>{row.date}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="line-clamp-2 text-sm text-gray-700">{row.description}</span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center">
                    <ImageIcon className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{row.imageCount || row.images.length} fotos</span>
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
                          setSearchParams((state) => {
                            state.set("id", row.id!);
                            return state;
                          });
                          // Poderia abrir uma visualização do álbum
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
                          albumUpdateButtonRef?.current?.click();
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
                      // 	removeAlbumButtonRef?.current?.click();
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
      <Sheet.Update ref={albumUpdateButtonRef} />
    </React.Fragment>
  );
}