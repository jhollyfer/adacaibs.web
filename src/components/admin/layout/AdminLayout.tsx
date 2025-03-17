
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Podcast, 
  Video, 
  Image, 
  Users, 
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    content: true,
    settings: false
  });
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    toast.success('Você foi desconectado com sucesso');
    navigate('/admin/login');
  };

  const navItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin',
      exact: true
    },
    {
      title: 'Conteúdo',
      icon: FileText,
      children: [
        {
          title: 'Notícias',
          path: '/admin/noticias',
          icon: FileText
        },
        {
          title: 'Eventos',
          path: '/admin/eventos',
          icon: Calendar
        },
        {
          title: 'Podcasts',
          path: '/admin/podcasts',
          icon: Podcast
        },
        {
          title: 'Vídeos',
          path: '/admin/videos',
          icon: Video
        },
        {
          title: 'Galeria',
          path: '/admin/galeria',
          icon: Image
        }
      ]
    },
    {
      title: 'Usuários',
      icon: Users,
      path: '/admin/usuarios'
    },
    {
      title: 'Depoimentos',
      icon: MessageSquare,
      path: '/admin/depoimentos'
    },
    {
      title: 'Configurações',
      icon: Settings,
      path: '/admin/configuracoes'
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-adacaibs-black text-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0',
          !isSidebarOpen && '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <Link to="/admin" className="flex items-center">
              <img 
                src="/lovable-uploads/8ab9495a-6e4e-4a6e-983e-adfcede7b8f7.png" 
                alt="ADACAIBS Logo" 
                className="h-8 mr-2"
              />
              <span className="font-bold text-lg">ADACAIBS</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-white hover:text-adacaibs-yellow"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={20} />
            </Button>
          </div>

          {/* User info */}
          <div className="flex items-center space-x-3 p-4 border-b border-gray-800">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-adacaibs-yellow text-adacaibs-black">AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Administrador</p>
              <p className="text-sm text-gray-400">admin@adacaibs.org</p>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 py-4">
            <nav className="px-2 space-y-1">
              {navItems.map((item, index) => (
                item.children ? (
                  <Collapsible 
                    key={index}
                    open={openMenus[item.title.toLowerCase()]} 
                    onOpenChange={() => toggleMenu(item.title.toLowerCase())}
                    className="w-full"
                  >
                    <CollapsibleTrigger asChild>
                      <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                        <div className="flex items-center">
                          <item.icon size={18} className="mr-3" />
                          <span>{item.title}</span>
                        </div>
                        {openMenus[item.title.toLowerCase()] ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-10 space-y-1 mt-1">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          to={child.path}
                          className={cn(
                            "flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-800 transition-colors",
                            isActive(child.path) ? "bg-gray-800 text-adacaibs-yellow" : "text-gray-300"
                          )}
                        >
                          <child.icon size={16} className="mr-3" />
                          <span>{child.title}</span>
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    key={index}
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-800 transition-colors",
                      isActive(item.path) ? "bg-gray-800 text-adacaibs-yellow" : "text-gray-300"
                    )}
                  >
                    <item.icon size={18} className="mr-3" />
                    <span>{item.title}</span>
                  </Link>
                )
              ))}
            </nav>
          </ScrollArea>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-800">
            <Button 
              variant="ghost" 
              className="flex items-center justify-start w-full text-white hover:text-adacaibs-yellow hover:bg-gray-800"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-3" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow z-10">
          <div className="flex items-center justify-between h-16 px-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </Button>
            <div className="flex items-center space-x-4 ml-auto">
              <Button variant="outline" asChild>
                <Link to="/" target="_blank">Ver site</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
