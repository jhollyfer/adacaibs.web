
import React from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Edit, Trash2, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: 'Workshop de LIBRAS para Iniciantes',
    date: '10 de junho de 2023',
    time: '14:00 - 18:00',
    location: 'Sede da ADACAIBS',
    capacity: 30,
    registeredCount: 18,
    category: 'Workshop',
    status: 'upcoming',
    image: '/lovable-uploads/2c677ecc-7661-46d3-abee-3612a042a88d.png'
  },
  {
    id: 2,
    title: 'Torneio Esportivo Inclusivo',
    date: '25 de junho de 2023',
    time: '09:00 - 17:00',
    location: 'Quadra Municipal',
    capacity: 50,
    registeredCount: 32,
    category: 'Esporte',
    status: 'upcoming',
    image: '/lovable-uploads/516afdeb-e44c-4cf0-81a2-d0951e9348f5.png'
  },
  {
    id: 3,
    title: 'Encontro de Famílias',
    date: '05 de maio de 2023',
    time: '15:00 - 19:00',
    location: 'Parque Municipal',
    capacity: 40,
    registeredCount: 40,
    category: 'Comunidade',
    status: 'past',
    image: '/lovable-uploads/4f5be063-22d2-4152-a822-3eb9ff523206.png'
  }
];

const EventForm = ({ event = null, onSubmit }) => {
  // In a real app, this would handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Título do Evento
          </label>
          <Input id="title" defaultValue={event?.title || ''} placeholder="Digite o título do evento" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Data
            </label>
            <Input id="date" type="date" defaultValue={event?.date || ''} />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium mb-1">
              Horário
            </label>
            <Input id="time" defaultValue={event?.time || ''} placeholder="Ex: 14:00 - 18:00" />
          </div>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Local
          </label>
          <Input id="location" defaultValue={event?.location || ''} placeholder="Nome do local" />
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Endereço
          </label>
          <Input id="address" defaultValue={event?.address || ''} placeholder="Endereço completo" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Categoria
            </label>
            <select 
              id="category" 
              className="w-full border rounded-md p-2"
              defaultValue={event?.category || ''}
            >
              <option value="">Selecione uma categoria</option>
              <option value="Workshop">Workshop</option>
              <option value="Palestra">Palestra</option>
              <option value="Curso">Curso</option>
              <option value="Esporte">Esporte</option>
              <option value="Comunidade">Comunidade</option>
              <option value="Arte">Arte</option>
            </select>
          </div>
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium mb-1">
              Capacidade
            </label>
            <Input 
              id="capacity" 
              type="number" 
              defaultValue={event?.capacity || ''} 
              placeholder="Número máximo de participantes" 
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Descrição
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full border rounded-md p-2"
            placeholder="Digite a descrição do evento"
            defaultValue={event?.description || ''}
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Conteúdo Detalhado
          </label>
          <textarea
            id="content"
            rows={6}
            className="w-full border rounded-md p-2"
            placeholder="Conteúdo detalhado do evento (pode usar HTML)"
            defaultValue={event?.content || ''}
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            Imagem do Evento
          </label>
          <Input id="image" type="file" accept="image/*" />
          {event?.image && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Imagem atual:</p>
              <img 
                src={event.image} 
                alt="Preview" 
                className="h-24 w-auto rounded-md"
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
          {event ? 'Atualizar Evento' : 'Criar Evento'}
        </Button>
      </div>
    </form>
  );
};

const Events = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Eventos</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Novo Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar Novo Evento</DialogTitle>
              </DialogHeader>
              <EventForm onSubmit={() => console.log("Form submitted")} />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex justify-between items-center">
              <div className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar eventos..."
                  className="pl-8"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Todos</Button>
                <Button variant="outline" size="sm">Próximos</Button>
                <Button variant="outline" size="sm">Passados</Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evento</TableHead>
                    <TableHead>Data e Hora</TableHead>
                    <TableHead>Local</TableHead>
                    <TableHead>Inscrições</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <img 
                            src={event.image} 
                            alt={event.title} 
                            className="h-12 w-20 object-cover rounded-md" 
                          />
                          <div>
                            <div>{event.title}</div>
                            <Badge variant="outline" className="mt-1">{event.category}</Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{event.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{event.registeredCount}/{event.capacity}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            event.status === 'upcoming'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {event.status === 'upcoming' ? 'Próximo' : 'Passado'}
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
                                <DialogTitle>Editar Evento</DialogTitle>
                              </DialogHeader>
                              <EventForm 
                                event={event}
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

export default Events;
