
import React from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Edit, Trash2, Calendar, Star } from 'lucide-react';

// Mock data for testimonials
const mockTestimonials = [
  {
    id: 1,
    name: 'Ana Silva',
    role: 'Estudante',
    content: 'Os cursos de LIBRAS da ADACAIBS transformaram minha vida. Agora posso me comunicar com meu irmão surdo de uma forma muito mais profunda.',
    rating: 5,
    date: '15 de maio de 2023',
    image: '/lovable-uploads/55944207-5569-43e4-8c5b-016801f47871.png',
    status: 'published'
  },
  {
    id: 2,
    name: 'Carlos Mendes',
    role: 'Professor',
    content: 'Como educador, o workshop de LIBRAS me ajudou a tornar minhas aulas mais inclusivas. Excelente iniciativa!',
    rating: 5,
    date: '22 de abril de 2023',
    image: '/lovable-uploads/9d2c2843-520b-4d4e-ae96-7c656883a10e.png',
    status: 'published'
  },
  {
    id: 3,
    name: 'Juliana Freitas',
    role: 'Mãe',
    content: 'Minha filha surda se sente acolhida e respeitada em todos os eventos. A ADACAIBS realiza um trabalho incrível com a comunidade surda.',
    rating: 4,
    date: '10 de março de 2023',
    image: '/lovable-uploads/4f5be063-22d2-4152-a822-3eb9ff523206.png',
    status: 'pending'
  }
];

const TestimonialForm = ({ testimonial = null, onSubmit }) => {
  // In a real app, this would handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nome
          </label>
          <Input id="name" defaultValue={testimonial?.name || ''} placeholder="Nome da pessoa" />
        </div>
        
        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-1">
            Cargo/Função
          </label>
          <Input id="role" defaultValue={testimonial?.role || ''} placeholder="Ex: Estudante, Professor, etc." />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Depoimento
          </label>
          <textarea
            id="content"
            rows={4}
            className="w-full border rounded-md p-2"
            placeholder="Digite o depoimento"
            defaultValue={testimonial?.content || ''}
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="rating" className="block text-sm font-medium mb-1">
            Avaliação (1-5)
          </label>
          <Input 
            id="rating" 
            type="number" 
            min="1" 
            max="5" 
            defaultValue={testimonial?.rating || 5} 
          />
        </div>
        
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            Foto
          </label>
          <Input id="image" type="file" accept="image/*" />
          {testimonial?.image && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Imagem atual:</p>
              <img 
                src={testimonial.image} 
                alt="Preview" 
                className="h-24 w-24 object-cover rounded-full"
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline">
          Cancelar
        </Button>
        <Button type="submit">
          {testimonial ? 'Atualizar Depoimento' : 'Adicionar Depoimento'}
        </Button>
      </div>
    </form>
  );
};

const Testimonials = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Depoimentos</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Novo Depoimento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Depoimento</DialogTitle>
              </DialogHeader>
              <TestimonialForm onSubmit={() => console.log("Form submitted")} />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Depoimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex justify-between items-center">
              <div className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar depoimentos..."
                  className="pl-8"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pessoa</TableHead>
                    <TableHead>Depoimento</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTestimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="h-10 w-10 object-cover rounded-full" 
                          />
                          <div>
                            <div>{testimonial.name}</div>
                            <div className="text-sm text-gray-500">{testimonial.role}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="truncate max-w-xs">{testimonial.content}</p>
                        <div className="text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          {testimonial.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`h-4 w-4 ${
                                index < testimonial.rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            testimonial.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {testimonial.status === 'published' ? 'Publicado' : 'Pendente'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Editar Depoimento</DialogTitle>
                              </DialogHeader>
                              <TestimonialForm 
                                testimonial={testimonial}
                                onSubmit={() => console.log("Form submitted")}
                              />
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Testimonials;
