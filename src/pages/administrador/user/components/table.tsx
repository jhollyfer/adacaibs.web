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
import { User, UserRole, UserStatus } from "@/lib/model";
import { Calendar, EllipsisIcon, EyeIcon, Mail, PencilIcon, ShieldIcon, TrashIcon } from "lucide-react";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Sheet } from "./sheet";

interface Props {
  data: User[];
  labels: string[];
}

export function Table({ data, labels }: Props): React.ReactElement {
  const userUpdateButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const location = useLocation();
  const [, setSearchParams] = useSearchParams(
    new URLSearchParams(location?.search)
  );

  const getRoleLabel = (role: UserRole): "Administrador" | "Editor" | "Desconhecido" => {
    switch (role) {
      case UserRole.ADMINISTRATOR:
        return "Administrador";
      case UserRole.EDITOR:
        return "Editor";
      default:
        return "Desconhecido";
    }
  };

  const getRoleColor = (role: UserRole): "text-red-500" | "text-blue-500" | "text-gray-500" => {
    switch (role) {
      case UserRole.ADMINISTRATOR:
        return "text-red-500";
      case UserRole.EDITOR:
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
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
          {data.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar || "/default.webp"}
                      alt={user.name}
                      className="h-8 w-8 object-cover rounded-full"
                    />
                    <span>{user.name}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{user.email}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center">
                    <ShieldIcon className={`h-4 w-4 mr-1 ${getRoleColor(user.role)}`} />
                    <span className="capitalize">{getRoleLabel(user.role)}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${user.status === UserStatus.ACTIVE
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {user.status === UserStatus.ACTIVE ? "Ativo" : "Inativo"}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                    <span>{new Intl.DateTimeFormat("pt-BR", {
                      dateStyle: "long",
                    }).format(user.createdAt)}</span>
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
                          setSearchParams((state) => {
                            state.set("id", user.id!);
                            return state;
                          });
                          // Poderia abrir uma visualização detalhada do usuário
                        }}
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span>Visualizar</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="inline-flex space-x-1 w-full"
                        onClick={() => {
                          setSearchParams((state) => {
                            state.set("id", user.id!);
                            return state;
                          });
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
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Root>
      <Sheet.Update ref={userUpdateButtonRef} />
    </React.Fragment>
  );
}