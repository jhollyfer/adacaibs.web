import { Button } from "@/components/ui/button";
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
import {
  Calendar,
  Clock,
  Edit,
  Eye,
  PlayCircle,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import React from "react";

// Mock data for videos
const mockVideos = [
  {
    id: 1,
    title: "Aprenda Comunicação - Expressões Básicas",
    date: "20 de junho de 2023",
    duration: "15 min",
    instructor: "Ana Beatriz Santos",
    views: 3240,
    thumbnail: "/default.webp",
  },
  {
    id: 2,
    title: "Dia Nacional do Surdo - Celebração",
    date: "26 de setembro de 2023",
    duration: "22 min",
    instructor: "Carlos Mendes",
    views: 1852,
    thumbnail: "/default.webp",
  },
  {
    id: 3,
    title: "Entrevista com Líder da Comunidade Surda",
    date: "05 de abril de 2023",
    duration: "30 min",
    instructor: "Maria Santos",
    views: 2104,
    thumbnail: "/default.webp",
  },
];

const VideoForm = (): React.JSX.Element => {
  return (
    <form className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Título do Vídeo
          </label>
          <Input id="title" placeholder="Digite o título do vídeo" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Data
            </label>
            <Input id="date" type="date" />
          </div>
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium mb-1"
            >
              Duração
            </label>
            <Input id="duration" placeholder="Ex: 15 min" />
          </div>
        </div>

        <div>
          <label
            htmlFor="instructor"
            className="block text-sm font-medium mb-1"
          >
            Instrutor/Apresentador
          </label>
          <Input
            id="instructor"
            placeholder="Nome do instrutor ou apresentador"
          />
        </div>

        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium mb-1">
            URL do Vídeo (YouTube ou Vimeo)
          </label>
          <Input
            id="videoUrl"
            placeholder="Ex: https://www.youtube.com/watch?v=..."
          />
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
            placeholder="Digite a descrição do vídeo"
            // defaultValue={video?.description || ""}
          ></textarea>
        </div>

        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium mb-1">
            Thumbnail
          </label>
          <Input id="thumbnail" type="file" accept="image/*" />
          {/* {video?.thumbnail && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Thumbnail atual:</p>
              <img
                src={video.thumbnail}
                alt="Preview"
                className="h-24 w-auto rounded-md"
              />
            </div>
          )} */}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline">
          Cancelar
        </Button>
        <Button type="submit">
          {/* {video ? "Atualizar Vídeo" : "Publicar Vídeo"} */}
        </Button>
      </div>
    </form>
  );
};

export function Video(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Vídeos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Novo Vídeo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Vídeo</DialogTitle>
            </DialogHeader>
            <VideoForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Buscar vídeos..." className="pl-8" />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vídeo</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Instrutor</TableHead>
              <TableHead>Estatísticas</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockVideos.map((video) => (
              <TableRow key={video.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-20">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="h-full w-full object-cover rounded-md"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <span>{video.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                      <span>{video.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span>{video.instructor}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{video.views} visualizações</span>
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
                          <DialogTitle>Editar Vídeo</DialogTitle>
                        </DialogHeader>
                        {/* <VideoForm
                            video={video}
                            onSubmit={() => console.log("Form submitted")}
                          /> */}
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
    </div>
  );
}
