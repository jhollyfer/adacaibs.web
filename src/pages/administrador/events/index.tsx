import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
} from "lucide-react";
import React from "react";
import { Table } from "./components/table";
import type { Events } from "@/lib/model";
import { EventCategory } from "@/lib/model";
import { Sheet } from "./components/sheet";

// Mock data for events
const mockEvents: Events[] = [
  {
    id: '1',
    title: "Workshop de Comunicação para Iniciantes",
    date: "10 de junho de 2023",
    hour: "14:00 - 18:00",
    location: "Sede da ADACAIBS",
    address: "Rua das Flores, 123, Centro",
    capacity: 30,
    description: "Workshop introdutório para pessoas que desejam aprender comunicação básica em Libras.",
    detailedContent: "<p>Neste workshop, os participantes irão aprender:</p><ul><li>Alfabeto em Libras</li><li>Saudações básicas</li><li>Expressões cotidianas</li></ul><p>O evento é gratuito e aberto para todos os níveis de experiência.</p>",
    cover: "/default.webp",
    category: EventCategory.WORKSHOP,
  },
  {
    id: '2',
    title: "Torneio Esportivo Inclusivo",
    date: "25 de junho de 2023",
    hour: "09:00 - 17:00",
    location: "Quadra Municipal",
    address: "Av. dos Esportes, 500, Jardim América",
    capacity: 50,
    description: "Torneio esportivo com modalidades adaptadas para pessoas surdas e ouvintes.",
    detailedContent: "<p>O torneio contará com as seguintes modalidades:</p><ul><li>Vôlei</li><li>Futsal</li><li>Basquete</li></ul><p>Todos os jogos terão sinalização visual e intérpretes.</p>",
    cover: "/default.webp",
    category: EventCategory.SPORT,
  },
  {
    id: '3',
    title: "Encontro de Famílias",
    date: "05 de maio de 2023",
    hour: "15:00 - 19:00",
    location: "Parque Municipal",
    address: "Rua dos Ipês, 200, Jardim Botânico",
    capacity: 40,
    description: "Encontro de famílias de pessoas surdas para compartilhar experiências e fortalecer a comunidade.",
    detailedContent: "<p>Programação do encontro:</p><ul><li>15:00 - Recepção e lanche</li><li>16:00 - Roda de conversa</li><li>17:30 - Atividades recreativas</li><li>19:00 - Encerramento</li></ul>",
    cover: "/default.webp",
    category: EventCategory.COMMUNITY,
  },
];

export function Events(): React.JSX.Element {
  const eventCreateButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const [filter, setFilter] = React.useState<string>("all");

  const filteredEvents = React.useMemo(() => {
    if (filter === "upcoming") {
      return mockEvents.filter(event => new Date(event.date) >= new Date());
    } else if (filter === "past") {
      return mockEvents.filter(event => new Date(event.date) < new Date());
    }
    return mockEvents;
  }, [filter]);

  return (
    <React.Fragment>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Eventos</h1>
          <Button onClick={() => eventCreateButtonRef.current?.click()}>
            <Plus className="mr-2 h-4 w-4" /> Novo Evento
          </Button>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Buscar eventos..." className="pl-8" />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              Todos
            </Button>
            <Button
              variant={filter === "upcoming" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("upcoming")}
            >
              Próximos
            </Button>
            <Button
              variant={filter === "past" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("past")}
            >
              Passados
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table
            labels={[
              "Evento",
              "Data e Hora",
              "Local",
              "Inscrições",
              "Status"
            ]}
            data={filteredEvents}
          />
        </div>
      </div>
      <Sheet.Create ref={eventCreateButtonRef} />
    </React.Fragment>
  );
}