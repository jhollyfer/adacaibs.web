import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Table as Root,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Events } from "@/lib/model";
import { Calendar, Clock, EllipsisIcon, EyeIcon, MapPin, PencilIcon, TrashIcon, Users } from "lucide-react";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Sheet } from "./sheet";

interface Props {
  data: Events[];
  labels: string[];
}

// TODO: mudar a forma que a categoria é exibida
export function Table({ data, labels }: Props): React.ReactElement {
  const eventUpdateButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const location = useLocation();
  const [, setSearchParams] = useSearchParams(
    new URLSearchParams(location?.search)
  );

  const isEventUpcoming = (date: string): boolean => {
    return new Date(date) >= new Date();
  };

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
          {data.map((event) => {
            const isUpcoming = isEventUpcoming(event.date);

            return (
              <TableRow key={event.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <img
                      src={event.cover || "/default.webp"}
                      alt={event.title}
                      className="h-12 w-20 object-cover rounded-md"
                    />
                    <div>
                      <div>{event.title}</div>
                      <Badge variant="outline" className="mt-1">
                        {event.category}
                      </Badge>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{event.hour}</span>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                    <div className="flex flex-col">
                      <span>{event.location}</span>
                      <span className="text-xs text-gray-500 mt-1">{event.address}</span>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-gray-500" />
                    <span>
                      {/* Placeholder for registered count */}
                      {Math.floor(Math.random() * event.capacity)}/{event.capacity}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${isUpcoming
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

                      <DropdownMenuItem
                        className="inline-flex space-x-1 w-full"
                        onClick={() => {
                          setSearchParams((state) => {
                            state.set("id", event.id!);
                            return state;
                          });
                          // Poderia abrir uma visualização do evento
                        }}
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span>Visualizar</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="inline-flex space-x-1 w-full"
                        onClick={() => {
                          setSearchParams((state) => {
                            state.set("id", event.id!);
                            return state;
                          });
                          eventUpdateButtonRef?.current?.click();
                        }}
                      >
                        <PencilIcon className="w-4 h-4" />
                        <span>Editar</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="inline-flex space-x-1 w-full"
                      // onClick={() => {
                      // 	setSearchParams((state) => {
                      // 		state.set('id', event.id);
                      // 		return state;
                      // 	});
                      // 	removeEventButtonRef?.current?.click();
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
      <Sheet.Update ref={eventUpdateButtonRef} />
    </React.Fragment>
  );
}