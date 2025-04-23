import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

// Mock data for a single event
const mockEvent = {
  id: 1,
  title: "Workshop de Comunicação para Iniciantes",
  description:
    "Aprenda os fundamentos da Língua Brasileira de Sinais neste workshop destinado a iniciantes.",
  content: `
    <p>Você tem interesse em aprender Comunicação e não sabe por onde começar? Este workshop é perfeito para você!</p>
    
    <p>A ADACAIBS promoverá um workshop introdutório de Língua Brasileira de Sinais (Comunicação), destinado a pessoas que desejam iniciar seus estudos nesta língua tão importante para a comunicação com a comunidade surda.</p>
    
    <h3>O que você aprenderá:</h3>
    
    <ul>
      <li>Alfabeto manual</li>
      <li>Números</li>
      <li>Cumprimentos básicos</li>
      <li>Expressões faciais e corporais na comunicação</li>
      <li>Vocabulário inicial para conversas do dia a dia</li>
    </ul>
    
    <h3>Informações importantes:</h3>
    
    <p>O workshop será ministrado por professores surdos fluentes em Comunicação e contará com o apoio de intérpretes para garantir a comunicação eficaz com todos os participantes.</p>
    
    <p>Não é necessário ter conhecimento prévio em Comunicação. O workshop é destinado a iniciantes e abordará os conceitos básicos da língua de forma didática e interativa.</p>
    
    <p>Ao final do workshop, os participantes receberão um certificado de participação e material complementar para continuar seus estudos.</p>
    
    <h3>Vagas limitadas!</h3>
    
    <p>Para garantir a qualidade do aprendizado, o workshop terá vagas limitadas. Faça sua inscrição o quanto antes para assegurar sua participação nesta experiência enriquecedora.</p>
  `,
  date: "10 de junho de 2023",
  time: "14:00 - 18:00",
  location: "Sede da ADACAIBS",
  address: "Rua das Flores, 123 - Centro",
  image:
    "https://pub-26f491708de845d2a89c0c5ff5131187.r2.dev/7e3d9e71-73ef-4e9b-81be-81d4c0f576a3.webp",
  category: "Workshop",
  status: "upcoming",
  capacity: 30,
  registeredCount: 18,
  tags: ["Comunicação", "Educação", "Inclusão"],
};

export function EventDetail(): React.JSX.Element {
  // In a real app, you would fetch the event based on the ID
  // For now, we'll just use our mock data

  const isPastEvent = new Date(mockEvent.date) < new Date();

  return (
    <div className="container mx-auto px-4 py-24">
      <Button variant="ghost" className="mb-6" asChild>
        <Link to="/eventos" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para eventos
        </Link>
      </Button>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{mockEvent.title}</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-700">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              <span>{mockEvent.date}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              <span>{mockEvent.time}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              <span>{mockEvent.location}</span>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <Users className="h-5 w-5 mr-2 text-primary" />
            <span className="text-gray-700">
              {mockEvent.registeredCount} inscritos de {mockEvent.capacity}{" "}
              vagas disponíveis
            </span>
          </div>
        </header>

        <div className="mb-8">
          <img
            src={mockEvent.image}
            alt={mockEvent.title}
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: mockEvent.content }}
        />

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Localização</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="mb-2">{mockEvent.location}</p>
            <p>{mockEvent.address}</p>
            {/* In a real app, you might include an embedded map here */}
          </div>
        </div>

        <div className="border-t pt-6 mb-8">
          <h4 className="font-medium mb-2">Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {mockEvent.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {!isPastEvent && (
          <div className="flex justify-center mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg">Inscrever-se neste evento</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Inscrição para o evento</DialogTitle>
                </DialogHeader>

                <form className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Nome completo
                    </label>
                    <Input id="name" placeholder="Seu nome completo" required />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium"
                    >
                      E-mail
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium"
                    >
                      Telefone
                    </label>
                    <Input id="phone" placeholder="(00) 00000-0000" required />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full">
                      Confirmar inscrição
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {isPastEvent && (
          <div className="bg-gray-100 p-4 rounded-lg text-center mb-8">
            <p className="text-lg">Este evento já ocorreu.</p>
          </div>
        )}

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">
            Compartilhar este evento
          </h3>
          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              Compartilhar no Facebook
            </Button>
            <Button variant="outline" size="sm">
              Compartilhar no Twitter
            </Button>
            <Button variant="outline" size="sm">
              Compartilhar no WhatsApp
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
