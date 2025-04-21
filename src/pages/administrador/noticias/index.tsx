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
              "Submissão",
              // "Autor",
              // "Visualizações",
            ]}
            data={mockNewsItems}
          />
        </div>
      </div>

      {/* Edit Dialog */}
      {/* {selectedNews && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Editar Notícia</DialogTitle>
            </DialogHeader>
            <NewsForm
              initialData={selectedNews}
              onSubmit={() => setIsEditOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )} */}

      {/* View Drawer */}
      {/* {selectedNews && (
        <Drawer open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{selectedNews.title}</DrawerTitle>
              <DrawerDescription>
                <div className="flex items-center gap-4 text-sm mt-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{selectedNews.date}</span>
                  </div>
                  <div>Autor: {selectedNews.author}</div>
                  <div>Categoria: {selectedNews.category}</div>
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 md:p-6">
              <p className="text-gray-700">
                Conteúdo da notícia {selectedNews.id} iria aparecer aqui em uma
                implementação real...
              </p>
            </div>
            <DrawerFooter>
              <Button variant="outline">Editar esta notícia</Button>
              <DrawerClose asChild>
                <Button variant="outline">Fechar</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )} */}

      {/* Delete Confirmation Dialog */}
      {/* {selectedNews && (
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>
                Tem certeza que deseja excluir a notícia "{selectedNews.title}"?
              </p>
              <p className="text-gray-500 mt-2">
                Esta ação não pode ser desfeita.
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  // Delete logic would go here in a real implementation
                  setIsDeleteOpen(false);
                }}
              >
                Excluir
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )} */}
      <Sheet.Create ref={noticeCreateButtonRef} />
    </React.Fragment>
  );
}
