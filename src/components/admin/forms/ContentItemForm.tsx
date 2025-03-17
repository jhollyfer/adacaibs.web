
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ContentItemFormProps {
  title: string;
  type: 'event' | 'podcast' | 'video' | 'gallery' | 'testimonial';
  initialData?: any;
  onSubmit: () => void;
  onCancel: () => void;
}

export const ContentItemForm = ({
  title,
  type,
  initialData,
  onSubmit,
  onCancel,
}: ContentItemFormProps) => {
  const [date, setDate] = React.useState<Date | undefined>(
    initialData?.date ? new Date(initialData.date) : undefined
  );
  
  const isEditing = !!initialData;
  
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
          placeholder={`Digite o título ${
            type === 'event' ? 'do evento' :
            type === 'podcast' ? 'do podcast' :
            type === 'video' ? 'do vídeo' :
            type === 'gallery' ? 'da galeria' : 'do depoimento'
          }`}
          defaultValue={initialData?.title || ''}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          placeholder="Digite uma descrição"
          defaultValue={initialData?.description || ''}
          rows={3}
          required
        />
      </div>
      
      {(type === 'event' || type === 'podcast' || type === 'video') && (
        <div className="space-y-2">
          <Label>Data</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Selecione uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
      
      {type === 'event' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="time">Horário</Label>
              <Input
                id="time"
                type="time"
                defaultValue={initialData?.time || ''}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Local</Label>
              <Input
                id="location"
                placeholder="Digite o local do evento"
                defaultValue={initialData?.location || ''}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              placeholder="Digite o endereço completo"
              defaultValue={initialData?.address || ''}
              required
            />
          </div>
        </>
      )}
      
      {type === 'podcast' && (
        <div className="space-y-2">
          <Label htmlFor="audioUrl">URL do Áudio</Label>
          <Input
            id="audioUrl"
            placeholder="Cole o link do podcast"
            defaultValue={initialData?.audioUrl || ''}
            required
          />
        </div>
      )}
      
      {type === 'video' && (
        <div className="space-y-2">
          <Label htmlFor="videoUrl">URL do Vídeo</Label>
          <Input
            id="videoUrl"
            placeholder="Cole o link do vídeo (YouTube, Vimeo, etc.)"
            defaultValue={initialData?.videoUrl || ''}
            required
          />
        </div>
      )}
      
      {type === 'testimonial' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="author">Autor</Label>
            <Input
              id="author"
              placeholder="Nome do autor do depoimento"
              defaultValue={initialData?.author || ''}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Cargo/Função</Label>
            <Input
              id="role"
              placeholder="Cargo ou função do autor"
              defaultValue={initialData?.role || ''}
            />
          </div>
        </>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="image">Imagem</Label>
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
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {isEditing ? 'Salvar alterações' : `Criar ${
            type === 'event' ? 'evento' :
            type === 'podcast' ? 'podcast' :
            type === 'video' ? 'vídeo' :
            type === 'gallery' ? 'galeria' : 'depoimento'
          }`}
        </Button>
      </div>
    </form>
  );
};
