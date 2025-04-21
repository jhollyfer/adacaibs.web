import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  NoticeCategory,
  Notice as NoticeModel,
  NoticeStatus,
} from "@/lib/model";
import { Filter, PlusIcon, Search } from "lucide-react";
import React from "react";
import { Sheet } from "./components/sheet";
import { Table } from "./components/table";

const mockNewsItems: NoticeModel[] = [
  {
    id: "1",
    title: "Evento de Integração na Praça Central",
    category: NoticeCategory.EDUCATION,
    status: NoticeStatus.PUBLISHED,
    createdAt: new Date(),
    content: "Conteúdo da notícia 1",
    resume: "Resumo da notícia 1",
    cover: null,
    tags: ["tag1", "tag2"],
  },
  {
    id: "2",
    title: "Evento de Integração na Praça Central",
    category: NoticeCategory.EDUCATION,
    status: NoticeStatus.PUBLISHED,
    createdAt: new Date(),
    content: "Conteúdo da notícia 1",
    resume: "Resumo da notícia 1",
    cover: null,
    tags: ["tag1", "tag2"],
  },
  {
    id: "3",
    title: "Evento de Integração na Praça Central",
    category: NoticeCategory.EDUCATION,
    status: NoticeStatus.PUBLISHED,
    createdAt: new Date(),
    content: "Conteúdo da notícia 1",
    resume: "Resumo da notícia 1",
    cover: null,
    tags: ["tag1", "tag2"],
  },
  {
    id: "4",
    title: "Evento de Integração na Praça Central",
    category: NoticeCategory.EDUCATION,
    status: NoticeStatus.PUBLISHED,
    createdAt: new Date(),
    content: "Conteúdo da notícia 1",
    resume: "Resumo da notícia 1",
    cover: null,
    tags: ["tag1", "tag2"],
  },
  {
    id: "5",
    title: "Evento de Integração na Praça Central",
    category: NoticeCategory.EDUCATION,
    status: NoticeStatus.PUBLISHED,
    createdAt: new Date(),
    content: "Conteúdo da notícia 1",
    resume: "Resumo da notícia 1",
    cover: null,
    tags: ["tag1", "tag2"],
  },
];

export function Notice(): React.JSX.Element {
  const noticeCreateButtonRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <React.Fragment>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Notícias</h1>
          <Button
            onClick={() => noticeCreateButtonRef.current?.click()}
            className="flex items-center"
          >
            <PlusIcon className="mr-2 h-4 w-4" /> Nova Notícia
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar notícias..."
              className="pl-10 w-full sm:w-80"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" /> Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Todas as notícias</DropdownMenuItem>
              <DropdownMenuItem>Publicadas</DropdownMenuItem>
              <DropdownMenuItem>Rascunhos</DropdownMenuItem>
              <DropdownMenuItem>Mais recentes</DropdownMenuItem>
              <DropdownMenuItem>Mais visualizadas</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="border rounded-lg">
          <Table
            labels={[
              "Título",
              "Categoria",
              "Status",
              "Autor",
              "Visualizações",
              "Data de submissão",
            ]}
            data={mockNewsItems}
          />
        </div>
      </div>

      <Sheet.Create ref={noticeCreateButtonRef} />
    </React.Fragment>
  );
}
