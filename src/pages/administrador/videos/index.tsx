import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
} from "lucide-react";
import React from "react";
import { Table } from "./components/table";
import type { Video } from "@/lib/model";
import { Sheet } from "./components/sheet";

// Mock data for videos
const mockVideos: Video[] = [
  {
    id: '1',
    title: "Aprenda Comunicação - Expressões Básicas",
    description: "Curso introdutório com as expressões mais utilizadas na Língua Brasileira de Sinais para iniciantes.",
    date: "20 de junho de 2023",
    duration: "15 min",
    instructor: "Ana Beatriz Santos",
    views: 3240,
    thumbnail: "/default.webp",
    url: "/videos/aprenda-comunicacao-expressoes-basicas",
  },
  {
    id: '2',
    title: "Dia Nacional do Surdo - Celebração",
    description: "Documentário sobre as comemorações e eventos do Dia Nacional do Surdo em diversas cidades brasileiras.",
    date: "26 de setembro de 2023",
    duration: "22 min",
    instructor: "Carlos Mendes",
    views: 1852,
    thumbnail: "/default.webp",
    url: "/videos/dia-nacional-do-surdo-celebracao",
  },
  {
    id: '3',
    title: "Entrevista com Líder da Comunidade Surda",
    description: "Entrevista exclusiva com João Silva, importante ativista pelos direitos da comunidade surda no Brasil.",
    date: "05 de abril de 2023",
    duration: "30 min",
    instructor: "Maria Santos",
    views: 2104,
    thumbnail: "/default.webp",
    url: "/videos/entrevista-lider-comunidade-surda",
  },
];

export function Video(): React.JSX.Element {
  const videoCreateButtonRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <React.Fragment>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Vídeos</h1>
          <Button onClick={() => videoCreateButtonRef.current?.click()}>
            <Plus className="mr-2 h-4 w-4" /> Novo Video
          </Button>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Buscar vídeos..." className="pl-8" />
          </div>
        </div>

        <div className="rounded-md border">
          <Table labels={[
            "Título",
            "Data",
            "Duração",
            "Instrutor",
            "Visualizações",
            "Postado em"
          ]}
            data={mockVideos}
          />
        </div>
      </div>
      <Sheet.Create ref={videoCreateButtonRef} />
    </React.Fragment>
  );
}
