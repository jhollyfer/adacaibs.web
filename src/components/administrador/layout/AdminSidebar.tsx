import { Logo } from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Calendar,
  FileText,
  Headphones,
  Image,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Users,
  Video,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface AdminSidebarProps {
  children: React.ReactNode;
}

const AdminSidebar = ({ children }: AdminSidebarProps) => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      title: "Notícias",
      icon: FileText,
      path: "/admin/noticias",
    },
    {
      title: "Eventos",
      icon: Calendar,
      path: "/admin/eventos",
    },
    {
      title: "Podcasts",
      icon: Headphones,
      path: "/admin/podcasts",
    },
    {
      title: "Vídeos",
      icon: Video,
      path: "/admin/videos",
    },
    {
      title: "Galeria",
      icon: Image,
      path: "/admin/galeria",
    },
    {
      title: "Depoimentos",
      icon: MessageSquare,
      path: "/admin/depoimentos",
    },
    {
      title: "Usuários",
      icon: Users,
      path: "/admin/usuarios",
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-100">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-center p-4">
            <Link to="/" className="flex items-center space-x-2">
              {/* <img
                src="/lovable-uploads/8ab9495a-6e4e-4a6e-983e-adfcede7b8f7.png"
                alt="ADACAIBS Logo"
                className="h-8"
              /> */}
              {/* <span className="font-semibold text-lg">ADACAIBS CRM</span> */}
              <Logo className="w-full max-w-[300px] md:max-w-[400px] xl:max-w-[557px]" />
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <SidebarSeparator />
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/admin/configuracoes">
                    <Settings className="h-5 w-5" />
                    <span>Configurações</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/">
                    <LogOut className="h-5 w-5" />
                    <span>Sair</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 p-6 md:p-8 pt-16">
          <div className="h-full">
            <div className="absolute left-4 top-4">
              <SidebarTrigger />
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminSidebar;
