import { MenuRoute } from "@/components/sidebar-menu/types";
import {
  FileTextIcon,
  HeadphonesIcon,
  HomeIcon,
  ImageIcon,
  MessageSquareIcon,
  SettingsIcon,
  UsersIcon,
  VideoIcon,
} from "lucide-react";

export const MenuRouteMap: MenuRoute = [
  {
    title: "Menu",
    items: [
      {
        title: "Inicio",
        url: "/",
        icon: HomeIcon,
      },
      {
        title: "Notícias",
        url: "/administrador/noticias",
        icon: FileTextIcon,
      },
      {
        title: "Podcasts",
        url: "/administrador/podcasts",
        icon: HeadphonesIcon,
      },
      {
        title: "Vídeos",
        url: "/administrador/videos",
        icon: VideoIcon,
      },
      {
        title: "Galeria",
        url: "/administrador/galeria",
        icon: ImageIcon,
      },
      {
        title: "Depoimentos",
        url: "/administrador/depoimentos",
        icon: MessageSquareIcon,
      },
    ],
  },

  {
    title: "Configurações",
    items: [
      {
        title: "Usuários",
        url: "/administrador/usuarios",
        icon: UsersIcon,
      },
      {
        title: "Sistema",
        url: "/administrador/sistema",
        icon: SettingsIcon,
      },
    ],
  },
];
