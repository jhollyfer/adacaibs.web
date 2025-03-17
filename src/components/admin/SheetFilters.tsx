
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Filter } from 'lucide-react';

interface SheetFiltersProps {
  title: string;
  description?: string;
  filters: {
    id: string;
    label: string;
    options?: { value: string; label: string }[];
    type: 'checkbox' | 'date' | 'text';
  }[];
  onApply: (filters: any) => void;
}

export const SheetFilters = ({
  title,
  description,
  filters,
  onApply,
}: SheetFiltersProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <Filter className="mr-2 h-4 w-4" /> Filtros Avançados
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="py-6 space-y-6">
          {filters.map((filter) => (
            <div key={filter.id} className="space-y-2">
              <h4 className="font-medium">{filter.label}</h4>
              
              {filter.type === 'checkbox' && filter.options && (
                <div className="space-y-2">
                  {filter.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox id={`${filter.id}-${option.value}`} />
                      <Label htmlFor={`${filter.id}-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </div>
              )}
              
              {filter.type === 'date' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${filter.id}-start`}>De</Label>
                    <Input type="date" id={`${filter.id}-start`} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${filter.id}-end`}>Até</Label>
                    <Input type="date" id={`${filter.id}-end`} />
                  </div>
                </div>
              )}
              
              {filter.type === 'text' && (
                <Input id={filter.id} placeholder={`Filtrar por ${filter.label.toLowerCase()}`} />
              )}
            </div>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Limpar Filtros
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button type="button" onClick={() => onApply({})}>
              Aplicar Filtros
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
