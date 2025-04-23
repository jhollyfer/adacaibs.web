import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

// Mock data for a single news item
const mockNewsItem = {
  id: 1,
  title: "Evento de Integração na Praça Central",
  content: `
    <p>No último final de semana, a ADACAIBS realizou um evento de integração que reuniu mais de 100 pessoas da comunidade surda e ouvinte na Praça Central da cidade. O evento, que contou com diversas atividades inclusivas, teve como objetivo promover a interação entre pessoas surdas e ouvintes, além de divulgar o trabalho da associação.</p>
    
    <p>Durante o dia, foram oferecidas oficinas de Língua Brasileira de Sinais (Comunicação), apresentações culturais e atividades recreativas. Um dos momentos mais marcantes foi a apresentação do grupo de dança da ADACAIBS, que emocionou o público com uma coreografia que mesclava dança e língua de sinais.</p>
    
    <h3>Participação da comunidade</h3>
    
    <p>O evento contou com a participação de pessoas de todas as idades, incluindo crianças, jovens e idosos. "Foi uma experiência incrível ver pessoas surdas e ouvintes interagindo e aprendendo umas com as outras", afirmou Maria Silva, presidente da ADACAIBS. "Nosso objetivo era justamente criar esse espaço de troca e acreditamos que conseguimos atingir esse propósito."</p>
    
    <p>Além das atividades culturais e educativas, o evento também ofereceu serviços gratuitos à comunidade, como orientação jurídica e atendimento de saúde básico, com profissionais capacitados em Comunicação.</p>
    
    <h3>Impacto positivo</h3>
    
    <p>O feedback dos participantes foi extremamente positivo. "Nunca tinha participado de um evento assim antes", comentou João Oliveira, que participou da oficina de Comunicação. "Foi uma oportunidade única de aprender mais sobre a cultura surda e sobre como podemos construir uma sociedade mais inclusiva."</p>
    
    <p>Diante do sucesso do evento, a ADACAIBS já planeja realizar novas edições em outros bairros da cidade, com o objetivo de ampliar o alcance de suas ações e promover a inclusão social em diferentes comunidades.</p>
  `,
  date: "15 de maio de 2023",
  author: "Equipe ADACAIBS",
  image:
    "https://pub-26f491708de845d2a89c0c5ff5131187.r2.dev/7e3d9e71-73ef-4e9b-81be-81d4c0f576a3.webp",
  category: "Eventos",
  tags: ["Inclusão", "Evento Comunitário", "Comunicação"],
};

export function NoticeDetail(): React.JSX.Element {
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-24">
      <Button variant="ghost" className="mb-6" asChild>
        <Link to="/noticias" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para notícias
        </Link>
      </Button>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{mockNewsItem.title}</h1>
          <div className="flex flex-wrap items-center text-gray-500 gap-4 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{mockNewsItem.date}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{mockNewsItem.author}</span>
            </div>
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              <span>{mockNewsItem.category}</span>
            </div>
          </div>
        </header>

        <div className="mb-8">
          <img
            src={mockNewsItem.image}
            alt={mockNewsItem.title}
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: mockNewsItem.content }}
        />

        <div className="border-t pt-6">
          <h4 className="font-medium mb-2">Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {mockNewsItem.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
