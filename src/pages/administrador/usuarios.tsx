import AdminLayout from "@/components/administrador/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Mail, Plus, Search, Shield, Trash2 } from "lucide-react";

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@exemplo.com",
    role: "admin",
    lastLogin: "20/05/2023 14:30",
    status: "active",
    image: "/default.webp",
  },
  {
    id: 2,
    name: "Carlos Mendes",
    email: "carlos.mendes@exemplo.com",
    role: "editor",
    lastLogin: "18/05/2023 09:15",
    status: "active",
    image: "/default.webp",
  },
  {
    id: 3,
    name: "Juliana Freitas",
    email: "juliana.freitas@exemplo.com",
    role: "editor",
    lastLogin: "12/05/2023 16:45",
    status: "inactive",
    image: "/default.webp",
  },
];

const UserForm = ({ user = null, onSubmit }) => {
  // In a real app, this would handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nome
          </label>
          <Input
            id="name"
            defaultValue={user?.name || ""}
            placeholder="Nome completo"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            E-mail
          </label>
          <Input
            id="email"
            type="email"
            defaultValue={user?.email || ""}
            placeholder="email@exemplo.com"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-1">
            Função
          </label>
          <select
            id="role"
            className="w-full border rounded-md p-2"
            defaultValue={user?.role || "editor"}
          >
            <option value="admin">Administrador</option>
            <option value="editor">Editor</option>
            <option value="viewer">Visualizador</option>
          </select>
        </div>

        {!user && (
          <>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Senha
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Digite a senha"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1"
              >
                Confirmar Senha
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme a senha"
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            Foto de Perfil
          </label>
          <Input id="image" type="file" accept="image/*" />
          {user?.image && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Imagem atual:</p>
              <img
                src={user.image}
                alt="Preview"
                className="h-16 w-16 object-cover rounded-full"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline">
          Cancelar
        </Button>
        <Button type="submit">
          {user ? "Atualizar Usuário" : "Criar Usuário"}
        </Button>
      </div>
    </form>
  );
};

const Users = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Usuários</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Novo Usuário
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Usuário</DialogTitle>
              </DialogHeader>
              <UserForm onSubmit={() => console.log("Form submitted")} />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex justify-between items-center">
              <div className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Buscar usuários..." className="pl-8" />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Último Login</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.image}
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
                          <Shield
                            className={`h-4 w-4 mr-1 ${
                              user.role === "admin"
                                ? "text-red-500"
                                : "text-blue-500"
                            }`}
                          />
                          <span className="capitalize">
                            {user.role === "admin"
                              ? "Administrador"
                              : user.role === "editor"
                              ? "Editor"
                              : "Visualizador"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.status === "active" ? "Ativo" : "Inativo"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-500">
                          {user.lastLogin}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Editar Usuário</DialogTitle>
                              </DialogHeader>
                              <UserForm
                                user={user}
                                onSubmit={() => console.log("Form submitted")}
                              />
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Users;
