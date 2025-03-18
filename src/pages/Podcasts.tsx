
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Headphones, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockPodcasts = [
  {
    id: 1,
    title: 'Acessibilidade na Educação',
    description: 'Conversamos com especialistas sobre os desafios da acessibilidade no ambiente escolar.',
    date: '15 de maio de 2023',
    duration: '45 min',
    image: '/lovable-uploads/8ab9495a-6e4e-4a6e-983e-adfcede7b8f7.png',
    tags: ['Educação', 'Acessibilidade', 'Inclusão']
  },
  {
    id: 2,
    title: 'LIBRAS no Cotidiano',
    description: 'A importância da Língua Brasileira de Sinais na comunicação diária e como aprendê-la.',
    date: '22 de abril de 2023',
    duration: '38 min',
    image: '/lovable-uploads/516afdeb-e44c-4cf0-81a2-d0951e9348f5.png',
    tags: ['LIBRAS', 'Comunicação', 'Inclusão']
  },
  {
    id: 3,
    title: 'Tecnologias Assistivas',
    description: 'Exploramos as novas tecnologias que estão revolucionando a vida das pessoas com deficiência auditiva.',
    date: '10 de março de 2023',
    duration: '52 min',
    image: '/lovable-uploads/9d2c2843-520b-4d4e-ae96-7c656883a10e.png',
    tags: ['Tecnologia', 'Acessibilidade', 'Inovação']
  }
];

const Podcasts = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Nossos Podcasts</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ouça nossas conversas sobre temas relevantes para a comunidade surda e a sociedade em geral.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockPodcasts.map((podcast) => (
            <Card key={podcast.id} className="overflow-hidden flex flex-col h-full">
              <div className="aspect-video overflow-hidden">
                <img
                  src={podcast.image}
                  alt={podcast.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{podcast.date}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4" />
                  <span>{podcast.duration}</span>
                </div>
                <CardTitle className="text-xl">{podcast.title}</CardTitle>
                <CardDescription>{podcast.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mt-2">
                  {podcast.tags.map(tag => (
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
                  <Link to={`/podcasts/${podcast.id}`} className="flex items-center justify-center">
                    <Headphones className="mr-2 h-4 w-4" /> Ouvir podcast
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

export default Podcasts;
