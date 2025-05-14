import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Testimonial, TestimonialStatus } from "@/lib/model";
import {
  CalendarIcon,
  EllipsisIcon,
  EyeIcon,
  PencilIcon,
  StarIcon,
  TrashIcon,
} from "lucide-react";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Sheet } from "../sheet";

interface Props {
  data: Testimonial;
}

const getStatusStyle = (
  status: TestimonialStatus
):
  | "bg-green-100 text-green-800"
  | "bg-yellow-100 text-yellow-800"
  | "bg-red-100 text-red-800"
  | "bg-gray-100 text-gray-800" => {
  switch (status) {
    case TestimonialStatus.APPROVED:
      return "bg-green-100 text-green-800";
    case TestimonialStatus.PENDING:
      return "bg-yellow-100 text-yellow-800";
    case TestimonialStatus.REJECTED:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (
  status: TestimonialStatus
): "Publicado" | "Pendente" | "Rejeitado" | "Desconhecido" => {
  switch (status) {
    case TestimonialStatus.APPROVED:
      return "Publicado";
    case TestimonialStatus.PENDING:
      return "Pendente";
    case TestimonialStatus.REJECTED:
      return "Rejeitado";
    default:
      return "Desconhecido";
  }
};

export function Row({ data }: Props): React.JSX.Element {
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
            src={data.avatar?.url || "/default.webp"}
            alt={data.name}
            className="h-10 w-10 object-cover rounded-full"
          />
          <div>
            <div>{data.name}</div>
            <div className="text-xs text-gray-500">{data.position}</div>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <p className="line-clamp-2 max-w-xs">{data.testimonial}</p>
      </TableCell>

      <TableCell>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-4 w-4 ${
                i < Number(data.rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </TableCell>

      <TableCell>
        <span
          className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(
            data.status
          )}`}
        >
          {getStatusLabel(data.status)}
        </span>
      </TableCell>

      <TableCell>
        <div className="flex items-center text-sm">
          <CalendarIcon className="h-3.5 w-3.5 mr-1 text-gray-500" />
          <span>
            {data.createdAt
              ? new Intl.DateTimeFormat("pt-BR", {
                  dateStyle: "long",
                }).format(new Date(data.createdAt))
              : "Data não disponível"}
          </span>
        </div>
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
          <Sheet.Update ref={updateButtonRef} />
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
