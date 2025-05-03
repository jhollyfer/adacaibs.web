import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
} from "lucide-react";
import React from "react";
import type { Testimonial } from "@/lib/model";
import { TestimonialStatus } from "@/lib/model";
import { Table } from "./components/table";
import { Sheet } from "./components/sheet";

// Mock data for testimonials
const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: "Maria Silva",
    position: "Estudante",
    rating: '5',
    testimonial: "Os cursos de Comunicação oferecidos pela ADACAIBS mudaram minha vida. Agora posso me comunicar melhor com meu irmão surdo.",
    photo: "/default.webp",
    status: TestimonialStatus.APPROVED,
  },
  {
    id: '2',
    name: "João Oliveira",
    position: "Professor",
    rating: '4',
    testimonial: "A associação realiza um trabalho incrível de conscientização. Os materiais educativos são de excelente qualidade.",
    photo: "/default.webp",
    status: TestimonialStatus.PENDING,
  },
  {
    id: '3',
    name: "Ana Beatriz",
    position: "Voluntária",
    rating: '5',
    testimonial: "Fazer parte da ADACAIBS como voluntária tem sido uma experiência enriquecedora. Vejo o impacto positivo na comunidade todos os dias.",
    photo: "/default.webp",
    status: TestimonialStatus.REJECTED,
  },
];

export function Testimonials(): React.JSX.Element {
  const testimonialCreateButtonRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <React.Fragment>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Depoimentos</h1>
          <Button onClick={() => testimonialCreateButtonRef.current?.click()}>
            <Plus className="mr-2 h-4 w-4" /> Novo Depoimento
          </Button>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Buscar depoimentos..." className="pl-8" />
          </div>
        </div>

        <div className="rounded-md border">
          <Table
            labels={[
              "Pessoa",
              "Depoimento",
              "Avaliação",
              "Status",
              "Data"
            ]}
            data={mockTestimonials}
          />
        </div>
      </div>
      <Sheet.Create ref={testimonialCreateButtonRef} />
    </React.Fragment>
  );
}