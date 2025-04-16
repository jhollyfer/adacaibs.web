import AdminLayout from "@/components/administrator/layout/AdminLayout";
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
import { Calendar, Edit, ImageIcon, Plus, Search, Trash2 } from "lucide-react";

// Mock data for gallery albums
const mockAlbums = [
  {
    id: 1,
    title: "Workshop de LIBRAS",
    date: "10 de junho de 2023",
    imageCount: 24,
    thumbnail: "/default.webp",
  },
  {
    id: 2,
    title: "Dia Nacional do Surdo",
    date: "26 de setembro de 2023",
    imageCount: 36,
    thumbnail: "/default.webp",
  },
  {
    id: 3,
    title: "Palestra sobre Inclusão",
    date: "15 de abril de 2023",
    imageCount: 18,
    thumbnail: "/default.webp",
  },
  {
    id: 4,
    title: "Curso de LIBRAS para Professores",
    date: "20 de março de 2023",
    imageCount: 42,
    thumbnail: "/default.webp",
  },
];

const AlbumForm = ({ album = null, onSubmit }) => {
  // In a real app, this would handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Título do Álbum
          </label>
          <Input
            id="title"
            defaultValue={album?.title || ""}
            placeholder="Digite o título do álbum"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Data
          </label>
          <Input id="date" type="date" defaultValue={album?.date || ""} />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Descrição
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full border rounded-md p-2"
            placeholder="Digite a descrição do álbum"
            defaultValue={album?.description || ""}
          ></textarea>
        </div>

        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium mb-1">
            Imagem de Capa
          </label>
          <Input id="thumbnail" type="file" accept="image/*" />
          {album?.thumbnail && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Imagem atual:</p>
              <img
                src={album.thumbnail}
                alt="Preview"
                className="h-24 w-auto rounded-md"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium mb-1">
            Imagens do Álbum
          </label>
          <Input id="images" type="file" accept="image/*" multiple />
          {album && (
            <div className="mt-2 text-sm text-gray-500">
              {album.imageCount} imagens já enviadas
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline">
          Cancelar
        </Button>
        <Button type="submit">
          {album ? "Atualizar Álbum" : "Criar Álbum"}
        </Button>
      </div>
    </form>
  );
};

const Gallery = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Galeria de Fotos</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Novo Álbum
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar Novo Álbum</DialogTitle>
              </DialogHeader>
              <AlbumForm onSubmit={() => console.log("Form submitted")} />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Álbuns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex justify-between items-center">
              <div className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Buscar álbuns..." className="pl-8" />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Álbum</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Imagens</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAlbums.map((album) => (
                    <TableRow key={album.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <img
                            src={album.thumbnail}
                            alt={album.title}
                            className="h-12 w-20 object-cover rounded-md"
                          />
                          <span>{album.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                          <span>{album.date}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ImageIcon className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{album.imageCount} fotos</span>
                        </div>
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
                                <DialogTitle>Editar Álbum</DialogTitle>
                              </DialogHeader>
                              <AlbumForm
                                album={album}
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

export default Gallery;
