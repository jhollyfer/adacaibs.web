import AdminLayout from "@/components/admin/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Edit, Plus, Search, Star, Trash2 } from "lucide-react";

// Mock data for testimonials
const mockTestimonials = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Estudante",
    date: "10 de junho de 2023",
    rating: 5,
    testimony:
      "Os cursos de LIBRAS oferecidos pela ADACAIBS mudaram minha vida. Agora posso me comunicar melhor com meu irmão surdo.",
    avatar: "/default.webp",
    status: "published",
  },
  {
    id: 2,
    name: "João Oliveira",
    role: "Professor",
    date: "26 de setembro de 2023",
    rating: 4,
    testimony:
      "A associação realiza um trabalho incrível de conscientização. Os materiais educativos são de excelente qualidade.",
    avatar: "/default.webp",
    status: "published",
  },
  {
    id: 3,
    name: "Ana Beatriz",
    role: "Voluntária",
    date: "15 de abril de 2023",
    rating: 5,
    testimony:
      "Fazer parte da ADACAIBS como voluntária tem sido uma experiência enriquecedora. Vejo o impacto positivo na comunidade todos os dias.",
    avatar: "/default.webp",
    status: "pending",
  },
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
          <Input
            id="name"
            defaultValue={testimonial?.name || ""}
            placeholder="Nome completo"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-1">
            Cargo/Ocupação
          </label>
          <Input
            id="role"
            defaultValue={testimonial?.role || ""}
            placeholder="Ex: Estudante, Professor, etc."
          />
        </div>

        <div>
          <label htmlFor="rating" className="block text-sm font-medium mb-1">
            Avaliação
          </label>
          <select
            id="rating"
            className="w-full border rounded-md p-2"
            defaultValue={testimonial?.rating || 5}
          >
            <option value="5">5 estrelas</option>
            <option value="4">4 estrelas</option>
            <option value="3">3 estrelas</option>
            <option value="2">2 estrelas</option>
            <option value="1">1 estrela</option>
          </select>
        </div>

        <div>
          <label htmlFor="testimony" className="block text-sm font-medium mb-1">
            Depoimento
          </label>
          <textarea
            id="testimony"
            rows={4}
            className="w-full border rounded-md p-2"
            placeholder="Digite o depoimento"
            defaultValue={testimonial?.testimony || ""}
          ></textarea>
        </div>

        <div>
          <label htmlFor="avatar" className="block text-sm font-medium mb-1">
            Foto de Perfil
          </label>
          <Input id="avatar" type="file" accept="image/*" />
          {testimonial?.avatar && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Imagem atual:</p>
              <img
                src={testimonial.avatar}
                alt="Preview"
                className="h-16 w-16 object-cover rounded-full"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            id="status"
            className="w-full border rounded-md p-2"
            defaultValue={testimonial?.status || "pending"}
          >
            <option value="published">Publicado</option>
            <option value="pending">Pendente</option>
            <option value="rejected">Rejeitado</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline">
          Cancelar
        </Button>
        <Button type="submit">
          {testimonial ? "Atualizar Depoimento" : "Adicionar Depoimento"}
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
                <Input placeholder="Buscar depoimentos..." className="pl-8" />
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
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTestimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="h-8 w-8 object-cover rounded-full"
                          />
                          <div>
                            <div>{testimonial.name}</div>
                            <div className="text-xs text-gray-500">
                              {testimonial.role}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="truncate max-w-xs">
                          {testimonial.testimony}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            testimonial.status === "published"
                              ? "bg-green-100 text-green-800"
                              : testimonial.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {testimonial.status === "published"
                            ? "Publicado"
                            : testimonial.status === "pending"
                            ? "Pendente"
                            : "Rejeitado"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                          <span>{testimonial.date}</span>
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
                                <DialogTitle>Editar Depoimento</DialogTitle>
                              </DialogHeader>
                              <TestimonialForm
                                testimonial={testimonial}
                                onSubmit={() => console.log("Form submitted")}
                              />
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500"
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
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Testimonials;
