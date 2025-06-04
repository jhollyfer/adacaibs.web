import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface ContentItem {
  id: string;
  title: string;
  type: "Notícia" | "Evento" | "Podcast" | "Vídeo" | "Galeria";
  status: "Publicado" | "Rascunho";
  author: string;
  date: string;
}

const recentContent: ContentItem[] = [
  {
    id: "1",
    title: "Festival Cultural Tradicional reúne comunidades indígenas",
    type: "Notícia",
    status: "Publicado",
    author: "Maria Silva",
    date: "17/02/2025",
  },
  {
    id: "2",
    title: "Projeto de preservação da língua indígena é lançado",
    type: "Notícia",
    status: "Publicado",
    author: "João Oliveira",
    date: "17/02/2025",
  },
  {
    id: "3",
    title: "Artesãos indígenas participam de feira nacional",
    type: "Notícia",
    status: "Publicado",
    author: "Ana Costa",
    date: "17/02/2025",
  },
  {
    id: "4",
    title: "Festival Indígena do Évare - Programação",
    type: "Evento",
    status: "Publicado",
    author: "Roberto Almeida",
    date: "15/02/2025",
  },
  {
    id: "5",
    title: "Saberes tradicionais - Episódio 1",
    type: "Podcast",
    status: "Rascunho",
    author: "Paulo Mendes",
    date: "10/02/2025",
  },
];

export function RecentContent(): React.JSX.Element {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Conteúdo Recente</CardTitle>
        <CardDescription>
          Lista dos últimos conteúdos adicionados ou atualizados.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentContent.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium max-w-xs truncate">
                  {item.title}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {item.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      item.status === "Publicado"
                        ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                        : "bg-amber-100 text-amber-800 hover:bg-amber-100 hover:text-amber-800"
                    }
                    variant="secondary"
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" asChild>
                    <Link
                      to={`/administrador/${item.type.toLowerCase()}s/edit/${
                        item.id
                      }`}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link
                      to={`/administrador/${item.type.toLowerCase()}s/view/${
                        item.id
                      }`}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Visualizar</span>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Excluir</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end mt-4">
          <Button variant="outline" asChild>
            <Link to="/administrador/conteudo">Ver Todo Conteúdo</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
