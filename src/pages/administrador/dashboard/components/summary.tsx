import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStatsQuery } from "@/lib/tanstack/query/dashboard/stats";
import {
  Calendar,
  Eye,
  FileText,
  Headphones,
  Image,
  MessageSquare,
  Users,
  Video,
} from "lucide-react";
import React from "react";

export function Summary(): React.JSX.Element {
  const { data: stats, isLoading } = useDashboardStatsQuery();

  const summaryItems = [
    {
      title: "Notícias",
      value: stats?.noticias?.toString() || "0",
      icon: FileText,
      color: "bg-blue-100 text-blue-500",
    },
    {
      title: "Eventos",
      value: stats?.eventos?.toString() || "0",
      icon: Calendar,
      color: "bg-purple-100 text-purple-500",
    },
    {
      title: "Vídeos",
      value: stats?.videos?.toString() || "0",
      icon: Video,
      color: "bg-red-100 text-red-500",
    },
    {
      title: "Podcasts",
      value: stats?.podcasts?.toString() || "0",
      icon: Headphones,
      color: "bg-green-100 text-green-500",
    },
    {
      title: "Galeria",
      value: stats?.galeria?.toString() || "0",
      icon: Image,
      color: "bg-amber-100 text-amber-500",
    },
    {
      title: "Depoimentos",
      value: stats?.depoimentos?.toString() || "0",
      icon: MessageSquare,
      color: "bg-teal-100 text-teal-500",
    },
    {
      title: "Visitantes",
      value: "0",
      icon: Eye,
      color: "bg-indigo-100 text-indigo-500",
    },
    {
      title: "Usuários",
      value: stats?.usuarios?.toString() || "0",
      icon: Users,
      color: "bg-gray-100 text-gray-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {summaryItems.map((item, index) => (
        <Card
          key={index}
          className="shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-500">
              {item.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${item.color}`}>
              <item.icon size={18} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading && (
                <div className="animate-pulse bg-gray-200 h-8 w-12 rounded"></div>
              )}
              {!isLoading && item.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
