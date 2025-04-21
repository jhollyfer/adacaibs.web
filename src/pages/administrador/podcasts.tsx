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
import {
  Calendar,
  Clock,
  Edit,
  Headphones,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

// Mock data for podcasts
const mockPodcasts = [
  {
    id: 1,
    title: "Acessibilidade na Educação",
    date: "15 de maio de 2023",
    duration: "45 min",
    hosts: ["Maria Santos", "João Lima"],
    listens: 324,
    image: "/default.webp",
  },
  {
    id: 2,
    title: "Comunicação no Cotidiano",
    date: "22 de abril de 2023",
    duration: "38 min",
    hosts: ["João Lima", "Carlos Mendes"],
    listens: 246,
    image: "/default.webp",
  },
  {
    id: 3,
    title: "Tecnologias Assistivas",
    date: "10 de março de 2023",
    duration: "52 min",
    hosts: ["Maria Santos", "Ana Clara"],
    listens: 189,
    image: "/default.webp",
  },
];

const PodcastForm = ({ podcast = null, onSubmit }) => {
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
            Título do Podcast
          </label>
          <Input
            id="title"
            defaultValue={podcast?.title || ""}
            placeholder="Digite o título do podcast"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Data
            </label>
            <Input id="date" type="date" defaultValue={podcast?.date || ""} />
          </div>
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium mb-1"
            >
              Duração
            </label>
            <Input
              id="duration"
              defaultValue={podcast?.duration || ""}
              placeholder="Ex: 45 min"
            />
          </div>
        </div>

        <div>
          <label htmlFor="hosts" className="block text-sm font-medium mb-1">
            Apresentadores
          </label>
          <Input
            id="hosts"
            defaultValue={podcast?.hosts?.join(", ") || ""}
            placeholder="Ex: Maria Santos, João Lima"
          />
        </div>

        <div>
          <label htmlFor="guests" className="block text-sm font-medium mb-1">
            Convidados
          </label>
          <Input
            id="guests"
            defaultValue={podcast?.guests?.join(", ") || ""}
            placeholder="Ex: Dr. Carlos Silva, Ana Beatriz"
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
            placeholder="Digite a descrição do podcast"
            defaultValue={podcast?.description || ""}
          ></textarea>
        </div>

        <div>
          <label htmlFor="audioFile" className="block text-sm font-medium mb-1">
            Arquivo de Áudio
          </label>
          <Input id="audioFile" type="file" accept="audio/*" />
          {podcast?.audioUrl && (
            <div className="mt-2 text-sm text-gray-500">
              Arquivo atual: podcast-{podcast.id}.mp3
            </div>
          )}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            Imagem
          </label>
          <Input id="image" type="file" accept="image/*" />
          {podcast?.image && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Imagem atual:</p>
              <img
                src={podcast.image}
                alt="Preview"
                className="h-24 w-auto rounded-md"
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
          {podcast ? "Atualizar Podcast" : "Publicar Podcast"}
        </Button>
      </div>
    </form>
  );
};

const Podcasts = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Podcasts</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Novo Podcast
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar Novo Podcast</DialogTitle>
              </DialogHeader>
              <PodcastForm onSubmit={() => console.log("Form submitted")} />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Podcasts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex justify-between items-center">
              <div className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Buscar podcasts..." className="pl-8" />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Podcast</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Apresentadores</TableHead>
                    <TableHead>Estatísticas</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPodcasts.map((podcast) => (
                    <TableRow key={podcast.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <img
                            src={podcast.image}
                            alt={podcast.title}
                            className="h-10 w-10 object-cover rounded-md"
                          />
                          <span>{podcast.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                            <span>{podcast.date}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>{podcast.duration}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span>{podcast.hosts.join(", ")}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Headphones className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{podcast.listens} ouvintes</span>
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
                                <DialogTitle>Editar Podcast</DialogTitle>
                              </DialogHeader>
                              <PodcastForm
                                podcast={podcast}
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

export default Podcasts;
