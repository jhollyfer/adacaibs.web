import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
} from "lucide-react";
import React from "react";
import { Table } from "./components/table";
import type { User } from "@/lib/model";
import { UserRole, UserStatus } from "@/lib/model";
import { Sheet } from "./components/sheet";

// Mock data for users
const mockUsers: User[] = [
  {
    id: '1',
    name: "Ana Silva",
    email: "ana.silva@exemplo.com",
    password: "", // Não exposto na interface
    role: UserRole.ADMINISTRATOR,
    status: UserStatus.ACTIVE,
    avatar: "/default.webp",
  },
  {
    id: '2',
    name: "Carlos Mendes",
    email: "carlos.mendes@exemplo.com",
    password: "", // Não exposto na interface
    role: UserRole.EDITOR,
    status: UserStatus.ACTIVE,
    avatar: "/default.webp",
  },
  {
    id: '3',
    name: "Juliana Freitas",
    email: "juliana.freitas@exemplo.com",
    password: "", // Não exposto na interface
    role: UserRole.EDITOR,
    status: UserStatus.INACTIVE,
    avatar: "/default.webp",
  },
];

export function Users(): React.JSX.Element {
  const userCreateButtonRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <React.Fragment>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Usuários</h1>
          <Button onClick={() => userCreateButtonRef.current?.click()}>
            <Plus className="mr-2 h-4 w-4" /> Novo Usuário
          </Button>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Buscar usuários..." className="pl-8" />
          </div>
        </div>

        <div className="rounded-md border">
          <Table
            labels={[
              "Usuário",
              "E-mail",
              "Função",
              "Status",
              "Último Login"
            ]}
            data={mockUsers}
          />
        </div>
      </div>
      <Sheet.Create ref={userCreateButtonRef} />
    </React.Fragment>
  );
}