import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ChevronRight, Clock, MapPin, Search } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type EventType = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  status: string;
};

// Mock data for events
const mockEvents: EventType[] = [
  {
    id: 1,
    title: "Workshop de Comunicação para Iniciantes",
    description:
      "Aprenda os fundamentos da Língua Brasileira de Sinais neste workshop destinado a iniciantes.",
    date: "10 de junho de 2023",
    time: "14:00 - 18:00",
    location: "Sede da ADACAIBS",
    image: "/default.webp",
    category: "Workshop",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Torneio Esportivo Inclusivo",
    description:
      "Participe do nosso torneio esportivo inclusivo com modalidades adaptadas para pessoas surdas e ouvintes.",
    date: "25 de junho de 2023",
    time: "09:00 - 17:00",
    location: "Quadra Municipal",
    image: "/default.webp",
    category: "Esporte",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Exposição de Arte em Comunicação",
    description:
      "Visite nossa exposição de arte que explora a expressão visual da Língua Brasileira de Sinais.",
    date: "15 de julho de 2023",
    time: "10:00 - 20:00",
    location: "Galeria Central",
    image: "/default.webp",
    category: "Arte",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Encontro de Famílias",
    description:
      "Um evento dedicado às famílias com membros surdos, oferecendo suporte, informação e atividades recreativas.",
    date: "05 de maio de 2023",
    time: "15:00 - 19:00",
    location: "Parque Municipal",
    image: "/default.webp",
    category: "Comunidade",
    status: "past",
  },
  {
    id: 5,
    title: "Palestra sobre Acessibilidade Digital",
    description:
      "Discussão sobre como tornar conteúdos digitais mais acessíveis para pessoas surdas.",
    date: "20 de abril de 2023",
    time: "19:00 - 21:00",
    location: "Auditório Central",
    image: "/default.webp",
    category: "Palestra",
    status: "past",
  },
];

export function Event(): React.JSX.Element {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");
  const [filteredEvents, setFilteredEvents] = React.useState(mockEvents);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>): void {
    const term = event.target.value;
    setSearchTerm(term);
    filterEvents(term, activeTab);
  }

  function handleTabChange(value: string): void {
    setActiveTab(value);
    filterEvents(searchTerm, value);
  }

  function filterEvents(term: string, tab: string): void {
    let results = mockEvents;

    // Filter by tab
    if (tab !== "all") {
      results = results.filter((event) => event.status === tab);
    }

    // Filter by search term
    if (term.trim() !== "") {
      results = results.filter(
        (event) =>
          event.title.toLowerCase().includes(term.toLowerCase()) ||
          event.description.toLowerCase().includes(term.toLowerCase()) ||
          event.category.toLowerCase().includes(term.toLowerCase()) ||
          event.location.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredEvents(results);
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8 text-center">Eventos</h1>

      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar eventos..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={handleTabChange}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="upcoming">Próximos</TabsTrigger>
          <TabsTrigger value="past">Passados</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length > 0
              ? renderEventCards(filteredEvents)
              : renderNoEvents()}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length > 0
              ? renderEventCards(filteredEvents)
              : renderNoEvents()}
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length > 0
              ? renderEventCards(filteredEvents)
              : renderNoEvents()}
          </div>
        </TabsContent>
      </Tabs>

      {filteredEvents.length > 0 && (
        <div className="flex justify-center">
          <Button>Carregar mais eventos</Button>
        </div>
      )}
    </div>
  );
}

function renderEventCards(events: EventType[]): React.JSX.Element[] {
  return events.map((event) => (
    <Card
      key={event.id}
      className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{event.date}</span>
        </div>
        <CardTitle className="line-clamp-2">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-gray-700 line-clamp-2">{event.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{event.location}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded-full">
          {event.category}
        </span>
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/eventos/${event.id}`} className="flex items-center">
            Saiba mais <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  ));
}

function renderNoEvents(): React.JSX.Element {
  return (
    <div className="col-span-full text-center py-12">
      <p className="text-xl text-gray-500">Nenhum evento encontrado.</p>
    </div>
  );
}
