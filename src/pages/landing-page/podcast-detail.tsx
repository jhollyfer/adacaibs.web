import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  Headphones,
  Share,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

// Mock data for a single podcast
const mockPodcast = {
  id: 1,
  title: "Acessibilidade na Educação",
  description:
    "Conversamos com especialistas sobre os desafios da acessibilidade no ambiente escolar e como superá-los.",
  content: `
    <p>Neste episódio, discutimos os desafios enfrentados por estudantes surdos no ambiente escolar e como educadores, instituições e a sociedade podem trabalhar juntos para criar um ambiente mais inclusivo.</p>
    
    <p>Nossa convidada especial é a Dra. Ana Silva, professora e pesquisadora na área de educação inclusiva, que compartilha sua vasta experiência e pesquisas sobre o tema.</p>
    
    <h3>Tópicos abordados:</h3>
    
    <ul>
      <li>O papel das escolas na promoção da inclusão</li>
      <li>Formação de professores para atender alunos com deficiência auditiva</li>
      <li>Recursos e tecnologias que auxiliam na aprendizagem</li>
      <li>A importância da Comunicação no ambiente educacional</li>
      <li>Experiências bem-sucedidas de inclusão escolar</li>
    </ul>
    
    <p>Além da Dra. Ana Silva, contamos também com a participação de Carlos Mendes, ex-aluno da rede pública que compartilha sua experiência pessoal como estudante surdo.</p>
  `,
  date: "15 de maio de 2023",
  duration: "45 min",
  hosts: ["Maria Santos", "João Lima"],
  guests: ["Dra. Ana Silva", "Carlos Mendes"],
  audioUrl: "https://example.com/podcast1.mp3",
  image: "/default.webp",
  tags: ["Educação", "Acessibilidade", "Inclusão"],
};

export function PodcastDetail(): React.JSX.Element {
  // In a real app, you would fetch the podcast based on the ID
  // For now, we'll just use our mock data
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-24">
      <Button variant="ghost" className="mb-6" asChild>
        <Link to="/podcasts" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para podcasts
        </Link>
      </Button>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{mockPodcast.title}</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-700">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              <span>{mockPodcast.date}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              <span>{mockPodcast.duration}</span>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <p className="text-gray-700">
              <strong>Apresentadores:</strong> {mockPodcast.hosts.join(", ")}
            </p>
          </div>

          <div className="flex items-center mb-6">
            <p className="text-gray-700">
              <strong>Convidados:</strong> {mockPodcast.guests.join(", ")}
            </p>
          </div>
        </header>

        <div className="mb-8">
          <img
            src={mockPodcast.image}
            alt={mockPodcast.title}
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <div className="flex justify-between items-center">
            <Button size="lg" className="flex items-center">
              <Headphones className="mr-2 h-5 w-5" /> Ouvir agora
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Download className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: mockPodcast.content }}
        />

        <div className="border-t pt-6 mb-8">
          <h4 className="font-medium mb-2">Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {mockPodcast.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">
            Compartilhar este podcast
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
