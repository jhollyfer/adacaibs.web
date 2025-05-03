import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
} from "lucide-react";
import React from "react";
import type { Album } from "@/lib/model";
import { Table } from "./components/table";
import { Sheet } from "./components/sheet";

// Mock data for albums
const mockAlbums: Album[] = [
  {
    id: '1',
    title: "Workshop de Comunicação",
    description: "Registro fotográfico do workshop de comunicação em Libras realizado na Universidade Federal.",
    date: "10 de junho de 2023",
    cover: "/default.webp",
    images: ["/img1.jpg", "/img2.jpg", "/img3.jpg"],
    imageCount: 24
  },
  {
    id: '2',
    title: "Dia Nacional do Surdo",
    description: "Fotos da celebração do Dia Nacional do Surdo com diversas atividades culturais e educativas.",
    date: "26 de setembro de 2023",
    cover: "/default.webp",
    images: ["/img1.jpg", "/img2.jpg"],
    imageCount: 36
  },
  {
    id: '3',
    title: "Palestra sobre Inclusão",
    description: "Imagens da palestra sobre inclusão na comunicação e acessibilidade no ambiente de trabalho.",
    date: "15 de abril de 2023",
    cover: "/default.webp",
    images: ["/img1.jpg"],
    imageCount: 18
  },
  {
    id: '4',
    title: "Curso de Comunicação para Professores",
    description: "Fotos do treinamento especial para professores aprenderem técnicas de comunicação inclusiva.",
    date: "20 de março de 2023",
    cover: "/default.webp",
    images: ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"],
    imageCount: 42
  },
];

export function Gallery(): React.JSX.Element {
  const albumCreateButtonRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <React.Fragment>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Galeria de Fotos</h1>
          <Button onClick={() => albumCreateButtonRef.current?.click()}>
            <Plus className="mr-2 h-4 w-4" /> Novo Álbum
          </Button>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Buscar álbuns..." className="pl-8" />
          </div>
        </div>

        <div className="rounded-md border">
          <Table
            labels={[
              "Álbum",
              "Data",
              "Descrição",
              "Imagens",
              "Ações"
            ]}
            data={mockAlbums}
          />
        </div>
      </div>
      <Sheet.Create ref={albumCreateButtonRef} />
    </React.Fragment>
  );
}