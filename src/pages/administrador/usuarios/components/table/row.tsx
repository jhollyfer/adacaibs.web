import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { User, UserRole, UserStatus } from "@/lib/model";
import { cn } from "@/lib/utils";
import {
  EllipsisIcon,
  EyeIcon,
  MailIcon,
  PencilIcon,
  ShieldIcon,
  TrashIcon,
} from "lucide-react";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Sheet } from "../sheet";

interface Props {
  data: User;
}

const RoleLabelMapper = {
  [UserRole.ADMINISTRATOR]: "Administrador",
  [UserRole.EDITOR]: "Editor",
} as const;

const RoleColorMapper = {
  [UserRole.ADMINISTRATOR]: "text-red-500",
  [UserRole.EDITOR]: "text-blue-500",
} as const;

export function Row({ data }: Props): React.JSX.Element {
  const userUpdateButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(location?.search)
  );
  return (
    <TableRow key={data.id}>
      <TableCell className="font-medium">
        <div className="flex items-center gap-3">
          <img
            src={data?.avatar?.url || "/default.webp"}
            alt={data.name}
            className="h-8 w-8 object-cover rounded-full"
          />
          <span>{data.name}</span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center">
          <MailIcon className="h-4 w-4 mr-1 text-gray-500" />
          <span>{data.email}</span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center">
          <ShieldIcon
            className={cn(
              "h-4 w-4 mr-1",
              RoleColorMapper[data.role as keyof typeof RoleColorMapper] ||
                "text-gray-500"
            )}
          />
          <span className="capitalize">
            {RoleLabelMapper[data.role as keyof typeof RoleLabelMapper] ||
              "Desconhecido"}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs",
            data.status === UserStatus.ACTIVE && "bg-green-100 text-green-800",
            data.status === UserStatus.INACTIVE && "bg-gray-100 text-gray-800"
          )}
        >
          {data.status === UserStatus.ACTIVE ? "Ativo" : "Inativo"}
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
                userUpdateButtonRef?.current?.click();
              }}
            >
              <PencilIcon className="w-4 h-4" />
              <span>Editar</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="inline-flex space-x-1 w-full text-red-600"
              // onClick={() => {
              // 	setSearchParams((state) => {
              // 		state.set('id', user.id);
              // 		return state;
              // 	});
              // 	removeUserButtonRef?.current?.click();
              // }}
            >
              <TrashIcon className="w-4 h-4" />
              <span>Remover</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
          <Sheet.Update ref={userUpdateButtonRef} />
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
