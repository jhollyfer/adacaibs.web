
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface NewsFormProps {
  initialData?: any;
  onSubmit: () => void;
}

export const NewsForm = ({ initialData, onSubmit }: NewsFormProps) => {
  const isEditing = !!initialData;
  
  // Form handling would be implemented with react-hook-form in a real app
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic would go here
    onSubmit();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          placeholder="Digite o título da notícia"
          defaultValue={initialData?.title || ''}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Select defaultValue={initialData?.category || "Eventos"}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Eventos">Eventos</SelectItem>
              <SelectItem value="Educação">Educação</SelectItem>
              <SelectItem value="Esportes">Esportes</SelectItem>
              <SelectItem value="Parcerias">Parcerias</SelectItem>
              <SelectItem value="Institucional">Institucional</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select defaultValue={initialData?.status || "Rascunho"}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Selecione um status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Rascunho">Rascunho</SelectItem>
              <SelectItem value="Publicado">Publicado</SelectItem>
              <SelectItem value="Agendado">Agendado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="excerpt">Resumo</Label>
        <Textarea
          id="excerpt"
          placeholder="Digite um breve resumo da notícia"
          defaultValue={initialData?.excerpt || ''}
          rows={3}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Conteúdo</Label>
        <Textarea
          id="content"
          placeholder="Digite o conteúdo completo da notícia"
          defaultValue={initialData?.content || ''}
          rows={10}
          required
        />
        <p className="text-sm text-gray-500">
          Dica: Você pode usar tags HTML básicas para formatação do texto.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Imagem de capa</Label>
        <div className="flex items-center gap-4">
          <Button type="button" variant="outline">
            Selecionar imagem
          </Button>
          <span className="text-sm text-gray-500">
            {initialData?.image ? 'Imagem selecionada' : 'Nenhuma imagem selecionada'}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          placeholder="Digite as tags separadas por vírgula"
          defaultValue={initialData?.tags ? initialData.tags.join(', ') : ''}
        />
      </div>
      
      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onSubmit}>
          Cancelar
        </Button>
        <Button type="submit">
          {isEditing ? 'Salvar alterações' : 'Criar notícia'}
        </Button>
      </div>
    </form>
  );
};
