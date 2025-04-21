import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Podcast as PodcastModel } from "@/lib/model";
import { Plus, Search } from "lucide-react";
import React from "react";
import { Sheet } from "./components/sheet";
import { Table } from "./components/table";

// Mock data for podcasts
const mockPodcasts: PodcastModel[] = [
  {
    id: "1",
    content: "Conteúdo do podcast 1",
    cover: null,
    date: new Date().toString(),
    description: "Descrição do podcast 1",
    duration: "45 min",
    guests: ["Maria Santos", "João Lima"],
    presenters: ["Maria Santos", "João Lima"],
    title: "Podcast 1",
    createdAt: new Date(),
  },
  {
    id: "2",
    content: "Conteúdo do podcast 1",
    cover: null,
    date: new Date().toString(),
    description: "Descrição do podcast 1",
    duration: "45 min",
    guests: ["Maria Santos", "João Lima"],
    presenters: ["Maria Santos", "João Lima"],
    title: "Podcast 1",
    createdAt: new Date(),
  },
  {
    id: "3",
    content: "Conteúdo do podcast 1",
    cover: null,
    date: new Date().toString(),
    description: "Descrição do podcast 1",
    duration: "45 min",
    guests: ["Maria Santos", "João Lima"],
    presenters: ["Maria Santos", "João Lima"],
    title: "Podcast 1",
    createdAt: new Date(),
  },
  {
    id: "4",
    content: "Conteúdo do podcast 1",
    cover: null,
    date: new Date().toString(),
    description: "Descrição do podcast 1",
    duration: "45 min",
    guests: ["Maria Santos", "João Lima"],
    presenters: ["Maria Santos", "João Lima"],
    title: "Podcast 1",
    createdAt: new Date(),
  },
  {
    id: "5",
    content: "Conteúdo do podcast 1",
    cover: null,
    date: new Date().toString(),
    description: "Descrição do podcast 1",
    duration: "45 min",
    guests: ["Maria Santos", "João Lima"],
    presenters: ["Maria Santos", "João Lima"],
    title: "Podcast 1",
    createdAt: new Date(),
  },
];

export function Podcast(): React.JSX.Element {
  const noticeCreateButtonRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <React.Fragment>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Podcasts</h1>
          <Button onClick={() => noticeCreateButtonRef.current?.click()}>
            <Plus className="mr-2 h-4 w-4" /> Novo Podcast
          </Button>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Buscar podcasts..." className="pl-8" />
          </div>
        </div>

        <div className="border rounded-lg">
          <Table
            labels={[
              "Título",
              "Apresentadores",
              "Estatísticas",
              "Data de submissão",
            ]}
            data={mockPodcasts}
          />
        </div>
      </div>
      <Sheet.Create ref={noticeCreateButtonRef} />
    </React.Fragment>
  );
}
