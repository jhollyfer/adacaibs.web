import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { MOCK_NEWS } from "./mock";

export function NoticeDetail(): React.JSX.Element {
  const params = useParams();

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const mockNewsItem = MOCK_NEWS.find((item) => item.slug === params.slug);

  return (
    <div className="container mx-auto px-4 py-24">
      <Button variant="ghost" className="mb-6" asChild>
        <Link to="/noticias" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para notícias
        </Link>
      </Button>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{mockNewsItem?.title}</h1>
          <div className="flex flex-wrap items-center text-gray-500 gap-4 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{mockNewsItem?.date}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {/* <span>{mockNewsItem?.author}</span> */}
              <span>Equipe ADACAIBS</span>
            </div>
            {/* <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              <span>{mockNewsItem?.category}</span>
            </div> */}
          </div>
        </header>

        <div className="mb-8">
          <img
            src={mockNewsItem?.image}
            alt={mockNewsItem?.title}
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: mockNewsItem?.content ?? "" }}
        />

        {mockNewsItem?.gallery && mockNewsItem?.gallery?.length > 0 && (
          <div className="border-t border-gray-200 pt-8 mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Galeria de Imagens
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockNewsItem?.gallery?.map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={image}
                    alt={`${mockNewsItem?.title} - Imagem ${index + 1}`}
                    loading="lazy"
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* <div className="border-t pt-6">
          <h4 className="font-medium mb-2">Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {mockNewsItem.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div> */}
      </article>
    </div>
  );
}
