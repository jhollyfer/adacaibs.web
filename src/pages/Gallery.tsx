import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Image as ImageIcon } from "lucide-react";

const mockGallery = [
  {
    id: 1,
    title: "Workshop de LIBRAS",
    date: "10 de junho de 2023",
    thumbnail: "/default.webp",
    images: ["/default.webp", "/default.webp", "/default.webp"],
  },
  {
    id: 2,
    title: "Dia Nacional do Surdo",
    date: "26 de setembro de 2023",
    thumbnail: "/default.webp",
    images: ["/default.webp", "/default.webp", "/default.webp"],
  },
  {
    id: 3,
    title: "Palestra sobre Inclusão",
    date: "15 de abril de 2023",
    thumbnail: "/default.webp",
    images: ["/default.webp", "/default.webp", "/default.webp"],
  },
  {
    id: 4,
    title: "Curso de LIBRAS para Professores",
    date: "20 de março de 2023",
    thumbnail: "/default.webp",
    images: ["/default.webp", "/default.webp", "/default.webp"],
  },
];

const Gallery = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Galeria de Fotos</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Confira os momentos especiais de nossos eventos, workshops e
            atividades.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockGallery.map((album) => (
            <div key={album.id} className="flex flex-col">
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={album.thumbnail}
                  alt={album.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-medium">{album.title}</h3>
                  <div className="flex items-center text-white/80 text-sm mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{album.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex p-4 bg-gray-100 rounded-b-lg">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="default">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Ver {album.images.length} fotos
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <div className="py-4">
                      <h2 className="text-2xl font-bold mb-2">{album.title}</h2>
                      <p className="text-gray-500 mb-4">{album.date}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {album.images.map((image, index) => (
                          <div
                            key={index}
                            className="relative aspect-video overflow-hidden rounded-lg"
                          >
                            <img
                              src={image}
                              alt={`${album.title} - Imagem ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
