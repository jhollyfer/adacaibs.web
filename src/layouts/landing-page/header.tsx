import { LogoHorizontal } from "@/components/horizontal-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export function Header(): React.JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const navigationItems = [
    { name: "Início", path: "/" },
    { name: "Sobre nós", path: "/sobre" },
    { name: "Notícias", path: "/noticias" },
    // { name: "Eventos", path: "/eventos" },
    // { name: "Podcasts", path: "/podcasts" },
    // { name: "Vídeos", path: "/videos" },
    // { name: "Galeria", path: "/galeria" },
    { name: "Contato", path: "/contato" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-black/95 backdrop-blur-md py-4 shadow-md"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <LogoHorizontal className="w-[200px] h-16" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "text-white hover:text-yellow-500 transition-all",
                isActive(item.path) && "menu-active"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white hover:text-yellow-500"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md shadow-lg"
          >
            <nav className="container mx-auto py-4 px-4 flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "text-white hover:text-yellow-500 py-2 transition-all",
                    isActive(item.path) && "text-yellow-500"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
