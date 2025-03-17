
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, ChevronRight, Search } from 'lucide-react';

// Mock data for news items
const mockNews = [
  {
    id: 1,
    title: 'Evento de Integração na Praça Central',
    excerpt: 'ADACAIBS realizou um evento de integração que reuniu mais de 100 pessoas da comunidade surda e ouvinte.',
    date: '15 de maio de 2023',
    image: '/lovable-uploads/2c677ecc-7661-46d3-abee-3612a042a88d.png',
    category: 'Eventos'
  },
  {
    id: 2,
    title: 'Workshop de Língua de Sinais foi um Sucesso',
    excerpt: 'Workshop gratuito de LIBRAS oferecido pela associação contou com mais de 50 participantes.',
    date: '28 de abril de 2023',
    image: '/lovable-uploads/4f5be063-22d2-4152-a822-3eb9ff523206.png',
    category: 'Educação'
  },
  {
    id: 3,
    title: 'Campeonato Esportivo Inclusivo',
    excerpt: 'ADACAIBS organizou o primeiro campeonato esportivo inclusivo da região, promovendo integração através do esporte.',
    date: '10 de março de 2023',
    image: '/lovable-uploads/516afdeb-e44c-4cf0-81a2-d0951e9348f5.png', 
    category: 'Esportes'
  },
  {
    id: 4,
    title: 'Parceria com Secretaria Municipal de Educação',
    excerpt: 'Nova parceria permitirá levar oficinas de LIBRAS a todas as escolas municipais a partir do próximo semestre.',
    date: '22 de fevereiro de 2023',
    image: '/lovable-uploads/55944207-5569-43e4-8c5b-016801f47871.png',
    category: 'Parcerias'
  },
  {
    id: 5,
    title: 'Inauguração da Nova Sede da ADACAIBS',
    excerpt: 'Com instalações modernas e acessíveis, a nova sede permitirá ampliar as atividades da associação.',
    date: '05 de janeiro de 2023',
    image: '/lovable-uploads/9d2c2843-520b-4d4e-ae96-7c656883a10e.png',
    category: 'Institucional'
  },
];

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNews, setFilteredNews] = useState(mockNews);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredNews(mockNews);
    } else {
      const results = mockNews.filter(
        item => 
          item.title.toLowerCase().includes(term.toLowerCase()) || 
          item.excerpt.toLowerCase().includes(term.toLowerCase()) ||
          item.category.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredNews(results);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Notícias</h1>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar notícias..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredNews.length > 0 ? (
            filteredNews.map(news => (
              <Card key={news.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Calendar className="h-4 w-4 mr-1" /> 
                    <span>{news.date}</span>
                  </div>
                  <CardTitle className="line-clamp-2">{news.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">
                    {news.excerpt}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded-full">{news.category}</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/noticias/${news.id}`} className="flex items-center">
                      Leia mais <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-500">Nenhuma notícia encontrada.</p>
            </div>
          )}
        </div>
        
        {filteredNews.length > 0 && (
          <div className="flex justify-center">
            <Button>Carregar mais notícias</Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default News;
