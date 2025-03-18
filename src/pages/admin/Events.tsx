
import React from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Edit, Trash2, Calendar, Clock, MapPin, Users } from 'lucide-react';

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: 'Workshop de LIBRAS para Iniciantes',
    date: '10 de junho de 2023',
    time: '14:00 - 18:00',
    location: 'Sede da ADACAIBS',
    capacity: 30,
    registrations: 18,
    status: 'upcoming',
    image: '/lovable-uploads/2c677ecc-7661-46d3-abee-3612a042a88d.png'
  },
  {
    id: 2,
    title: 'Palestra sobre Inclusão na Educação',
    date: '25 de julho de 2023',
    time: '19:00 - 21:00',
    location: 'Auditório Municipal',
    capacity: 100,
    registrations: 62,
    status: 'upcoming',
    image: '/lovable-uploads/55944207-5569-43e4-8c5b-016801f47871.png'
  },
  {
    id: 3,
    title: 'Curso Básico de LIBRAS - Módulo 1',
    date: '15 de março de 2023',
    time: '18:30 - 20:30',
    location: 'Sede da ADACAIBS',
    capacity: 25,
    registrations: 25,
    status: 'past',
    image: '/lovable-uploads/516afdeb-e44c-4cf0-81a2-d0951e9348f5.png'
  },
  {
    id: 4,
    title: 'Encontro da Comunidade Surda',
    date: '10 de abril de 2023',
    time: '10:00 - 16:00',
    location: 'Parque Central',
    capacity: 150,
    registrations: 87,
    status: 'past',
    image: '/lovable-uploads/9d2c2843-520b-4d4e-ae96-7c656883a10e.png'
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
            <Input id="time" type="time" defaultValue={event?.time || ''} />
          </div>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Local
          </label>
          <Input id="location" defaultValue={event?.location || ''} placeholder="Digite o local do evento" />
        </div>
        
        <div>
          <label htmlFor="capacity" className="block text-sm font-medium mb-1">
            Capacidade
          </label>
          <Input id="capacity" type="number" defaultValue={event?.capacity || ''} placeholder="Quantidade de vagas" />
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
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            Imagem
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
            </div>

            <Tabs defaultValue="upcoming">
              <TabsList className="mb-6">
                <TabsTrigger value="upcoming">Próximos</TabsTrigger>
                <TabsTrigger value="past">Passados</TabsTrigger>
                <TabsTrigger value="all">Todos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                <EventsTable events={mockEvents.filter(event => event.status === 'upcoming')} />
              </TabsContent>
              
              <TabsContent value="past">
                <EventsTable events={mockEvents.filter(event => event.status === 'past')} />
              </TabsContent>
              
              <TabsContent value="all">
                <EventsTable events={mockEvents} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

const EventsTable = ({ events }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Evento</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Local</TableHead>
            <TableHead>Inscrições</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="h-10 w-16 object-cover rounded-md" 
                  />
                  <span>{event.title}</span>
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
                  <span>
                    {event.registrations}/{event.capacity}
                  </span>
                </div>
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
  );
};

export default Events;
