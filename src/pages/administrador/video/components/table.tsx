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
import { Video } from "@/lib/model";
import {
  Calendar,
  Clock,
  EllipsisIcon,
  Eye,
  EyeIcon,
  PencilIcon,
  PlayCircle,
  TrashIcon,
} from "lucide-react";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Sheet } from "./sheet";
interface Props {
  data: Video[];
  labels: string[];
}

export function Table({ data, labels }: Props): React.ReactElement {
  const videoUpdateButtonRef = React.useRef<HTMLButtonElement | null>(null);

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
                <TableCell>{row.title}</TableCell>

                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-20">
                      <img
                        src={row.thumbnail ?? "/default.webp"} // TODO: tratar esse erro
                        alt={row.title}
                        className="h-full w-full object-cover rounded-md"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <span>{row.title}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                      <span>{row.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{row.duration}</span>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <span>{row.instructor}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{row.views} visualizações</span>
                  </div>
                </TableCell>

                <TableCell>
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
                          // videoUpdateButtonRef?.current?.click();
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
                          videoUpdateButtonRef?.current?.click();
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
      <Sheet.Update ref={videoUpdateButtonRef} />
    </React.Fragment>
  );
}
