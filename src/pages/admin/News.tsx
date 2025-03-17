
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2, Eye, Calendar, Filter } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { NewsForm } from '@/components/admin/forms/NewsForm';

// Mock data for news
const mockNewsItems = [
  {
    id: 1,
    title: 'Evento de Integração na Praça Central',
    category: 'Eventos',
    status: 'Publicado',
    date: '15/05/2023',
    author: 'Admin',
    views: 342
  },
  {
    id: 2,
    title: 'Workshop de Língua de Sinais foi um Sucesso',
    category: 'Educação',
    status: 'Publicado',
    date: '28/04/2023',
    author: 'Admin',
    views: 256
  },
  {
    id: 3,
    title: 'Campeonato Esportivo Inclusivo',
    category: 'Esportes',
    status: 'Publicado',
    date: '10/03/2023',
    author: 'Admin',
    views: 198
  },
  {
    id: 4,
    title: 'Parceria com Secretaria Municipal de Educação',
    category: 'Parcerias',
    status: 'Rascunho',
    date: '22/02/2023',
    author: 'Editor',
    views: 0
  },
  {
    id: 5,
    title: 'Inauguração da Nova Sede da ADACAIBS',
    category: 'Institucional',
    status: 'Publicado',
    date: '05/01/2023',
    author: 'Admin',
    views: 421
  },
];

const AdminNews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNews, setFilteredNews] = useState(mockNewsItems);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredNews(mockNewsItems);
    } else {
      const results = mockNewsItems.filter(
        item => 
          item.title.toLowerCase().includes(term.toLowerCase()) || 
          item.category.toLowerCase().includes(term.toLowerCase()) ||
          item.status.toLowerCase().includes(term.toLowerCase()) ||
          item.author.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredNews(results);
    }
  };

  const handleEdit = (news: any) => {
    setSelectedNews(news);
    setIsEditOpen(true);
  };

  const handleView = (news: any) => {
    setSelectedNews(news);
    setIsViewOpen(true);
  };

  const handleDelete = (news: any) => {
    setSelectedNews(news);
    setIsDeleteOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gerenciar Notícias</h1>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Plus className="mr-2 h-4 w-4" /> Nova Notícia
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Criar Nova Notícia</DialogTitle>
              </DialogHeader>
              <NewsForm onSubmit={() => setIsCreateOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar notícias..."
              className="pl-10 w-full sm:w-80"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" /> Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Todas as notícias</DropdownMenuItem>
              <DropdownMenuItem>Publicadas</DropdownMenuItem>
              <DropdownMenuItem>Rascunhos</DropdownMenuItem>
              <DropdownMenuItem>Mais recentes</DropdownMenuItem>
              <DropdownMenuItem>Mais visualizadas</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Visualizações</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNews.map((news) => (
                <TableRow key={news.id}>
                  <TableCell className="font-medium">{news.title}</TableCell>
                  <TableCell>{news.category}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      news.status === 'Publicado' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {news.status}
                    </span>
                  </TableCell>
                  <TableCell>{news.date}</TableCell>
                  <TableCell>{news.author}</TableCell>
                  <TableCell>{news.views}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(news)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(news)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(news)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Edit Dialog */}
      {selectedNews && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Editar Notícia</DialogTitle>
            </DialogHeader>
            <NewsForm 
              initialData={selectedNews} 
              onSubmit={() => setIsEditOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      )}
      
      {/* View Drawer */}
      {selectedNews && (
        <Drawer open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{selectedNews.title}</DrawerTitle>
              <DrawerDescription>
                <div className="flex items-center gap-4 text-sm mt-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{selectedNews.date}</span>
                  </div>
                  <div>Autor: {selectedNews.author}</div>
                  <div>Categoria: {selectedNews.category}</div>
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 md:p-6">
              <p className="text-gray-700">
                Conteúdo da notícia {selectedNews.id} iria aparecer aqui em uma implementação real...
              </p>
            </div>
            <DrawerFooter>
              <Button variant="outline" onClick={() => handleEdit(selectedNews)}>
                Editar esta notícia
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Fechar</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
      
      {/* Delete Confirmation Dialog */}
      {selectedNews && (
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Tem certeza que deseja excluir a notícia "{selectedNews.title}"?</p>
              <p className="text-gray-500 mt-2">Esta ação não pode ser desfeita.</p>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  // Delete logic would go here in a real implementation
                  setIsDeleteOpen(false);
                }}
              >
                Excluir
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
};

export default AdminNews;
