
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockVideos = [
  {
    id: 1,
    title: 'Aprenda LIBRAS - Expressões Básicas',
    description: 'Neste vídeo, ensinamos expressões básicas em LIBRAS para iniciantes.',
    date: '20 de junho de 2023',
    duration: '15 min',
    thumbnail: '/lovable-uploads/516afdeb-e44c-4cf0-81a2-d0951e9348f5.png',
    tags: ['LIBRAS', 'Iniciante', 'Aprendizado']
  },
  {
    id: 2,
    title: 'Dia Nacional do Surdo - Celebração',
    description: 'Cobertura da nossa celebração do Dia Nacional do Surdo com depoimentos e apresentações.',
    date: '26 de setembro de 2023',
    duration: '22 min',
    thumbnail: '/lovable-uploads/9d2c2843-520b-4d4e-ae96-7c656883a10e.png',
    tags: ['Eventos', 'Celebração', 'Comunidade']
  },
  {
    id: 3,
    title: 'Entrevista com Líder da Comunidade Surda',
    description: 'Uma conversa inspiradora com Carlos Silva, líder ativo na comunidade surda de nossa região.',
    date: '05 de abril de 2023',
    duration: '30 min',
    thumbnail: '/lovable-uploads/4f5be063-22d2-4152-a822-3eb9ff523206.png',
    tags: ['Entrevista', 'Liderança', 'Inspiração']
  }
];

const Videos = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Nossos Vídeos</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Assista a tutoriais de LIBRAS, entrevistas, coberturas de eventos e muito mais.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockVideos.map((video) => (
            <Card key={video.id} className="overflow-hidden flex flex-col h-full">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <PlayCircle className="h-16 w-16 text-white opacity-80" />
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{video.date}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4" />
                  <span>{video.duration}</span>
                </div>
                <CardTitle className="text-xl">{video.title}</CardTitle>
                <CardDescription>{video.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mt-2">
                  {video.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button variant="default" className="w-full" asChild>
                  <Link to={`/videos/${video.id}`} className="flex items-center justify-center">
                    <PlayCircle className="mr-2 h-4 w-4" /> Assistir vídeo
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Videos;
