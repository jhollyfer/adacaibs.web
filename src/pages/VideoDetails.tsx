import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  Share,
  ThumbsUp,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for a single video
const mockVideo = {
  id: 1,
  title: "Aprenda LIBRAS - Expressões Básicas",
  description:
    "Neste vídeo, ensinamos expressões básicas em LIBRAS para iniciantes.",
  content: `
    <p>Este vídeo tutorial é ideal para quem está começando a aprender LIBRAS e deseja conhecer as expressões mais básicas e utilizadas no dia a dia.</p>
    
    <p>Nossa instrutora Ana Beatriz, surda e professora de LIBRAS há mais de 10 anos, guiará você pelos primeiros passos nesta língua tão rica e expressiva.</p>
    
    <h3>O que você aprenderá neste vídeo:</h3>
    
    <ul>
      <li>Saudações (Olá, Bom dia, Boa tarde, Boa noite)</li>
      <li>Apresentações (Meu nome é..., Prazer em conhecê-lo)</li>
      <li>Expressões de cortesia (Por favor, Obrigado, De nada)</li>
      <li>Perguntas simples (Como vai você?, Tudo bem?)</li>
      <li>A importância das expressões faciais na comunicação em LIBRAS</li>
    </ul>
    
    <p>Este é o primeiro vídeo de nossa série "Aprenda LIBRAS", que tem como objetivo tornar a Língua Brasileira de Sinais acessível a todos, contribuindo para uma sociedade mais inclusiva e conectada.</p>
  `,
  date: "20 de junho de 2023",
  duration: "15 min",
  instructor: "Ana Beatriz Santos",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  thumbnail: "/lovable-uploads/516afdeb-e44c-4cf0-81a2-d0951e9348f5.png",
  views: 3240,
  likes: 287,
  tags: ["LIBRAS", "Iniciante", "Aprendizado"],
  related: [2, 3],
};

const VideoDetails = () => {
  // In a real app, you would fetch the video based on the ID
  // For now, we'll just use our mock data

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/videos" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para vídeos
          </Link>
        </Button>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{mockVideo.title}</h1>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-gray-700">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                <span>{mockVideo.date}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                <span>{mockVideo.duration}</span>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <p className="text-gray-700">
                <strong>Instrutor:</strong> {mockVideo.instructor}
              </p>
            </div>

            <div className="flex items-center mb-6 gap-4">
              <div className="flex items-center">
                <span className="text-gray-700 mr-1">Visualizações:</span>
                <span className="font-medium">{mockVideo.views}</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="h-5 w-5 mr-1 text-primary" />
                <span className="font-medium">{mockVideo.likes}</span>
              </div>
            </div>
          </header>

          <div className="mb-8 aspect-video">
            <iframe
              src={mockVideo.videoUrl}
              className="w-full h-full rounded-lg"
              title={mockVideo.title}
              allowFullScreen
            ></iframe>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg mb-8">
            <div className="flex justify-between items-center">
              <Button size="lg" className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5" /> Curtir
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
            dangerouslySetInnerHTML={{ __html: mockVideo.content }}
          />

          <div className="border-t pt-6 mb-8">
            <h4 className="font-medium mb-2">Tags:</h4>
            <div className="flex flex-wrap gap-2">
              {mockVideo.tags.map((tag) => (
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
              Compartilhar este vídeo
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
    </Layout>
  );
};

export default VideoDetails;
