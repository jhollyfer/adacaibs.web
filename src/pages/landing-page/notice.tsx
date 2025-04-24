import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, ChevronRight, Search } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { MOCK_NEWS } from "./mock";

export function Notice(): React.JSX.Element {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredNews, setFilteredNews] = React.useState(MOCK_NEWS);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>): void {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredNews(MOCK_NEWS);
    } else {
      const results = MOCK_NEWS.filter(
        (item) => item.title.toLowerCase().includes(term.toLowerCase())
        // item.excerpt.toLowerCase().includes(term.toLowerCase()) ||
        // item.category.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredNews(results);
    }
  }

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8 text-center">Notícias</h1>

      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar notícias..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredNews.length > 0 ? (
          filteredNews.map((news) => (
            <Card
              key={news.id}
              className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{news.date}</span>
                </div>
                <CardTitle className="line-clamp-2">{news.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3">
                  {news.excerpt}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-end">
                {/* <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded-full">
                  {news.category}
                </span> */}
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    to={`/noticias/${news.slug}`}
                    className="flex items-center"
                  >
                    Leia mais <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-gray-500">Nenhuma notícia encontrada.</p>
          </div>
        )}
      </div>

      {/* {filteredNews.length > 0 && (
        <div className="flex justify-center">
          <Button>Carregar mais notícias</Button>
        </div>
      )} */}
    </div>
  );
}
