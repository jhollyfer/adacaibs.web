import { ArrowUp, Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { LogoHorizontal } from "../horizontal-logo";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & Info */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center mb-4">
              <LogoHorizontal className="w-[200px] h-16" />
            </Link>
            <p className="text-sm text-gray-300 max-w-xs">
              Associação de Desenvolvimento Artístico e Cultural da Aldeia
              Indígena de Belém do Solimões
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-500 transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-500 transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Acesse</h3>
              <nav className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Início
                </Link>
                <Link
                  to="/sobre"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Sobre nós
                </Link>
                <Link
                  to="/noticias"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Notícias
                </Link>
                <Link
                  to="/eventos"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Eventos
                </Link>
                <Link
                  to="/contato"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Contato
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Atividades</h3>
              <nav className="flex flex-col space-y-2">
                <Link
                  to="/calendario"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Calendário
                </Link>
                <Link
                  to="/programacao"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Programação
                </Link>
                <Link
                  to="/podcasts"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Podcasts
                </Link>
                <Link
                  to="/videos"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Vídeos
                </Link>
                <Link
                  to="/galeria"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Galeria
                </Link>
              </nav>
            </div>
          </div>

          {/* Contact & Back to top */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <p className="text-sm text-gray-300">
              Email: contato@adacaibs.org.br
            </p>
            <p className="text-sm text-gray-300">Telefone: (92) 3123-4567</p>
            <p className="text-sm text-gray-300">
              Endereço: Aldeia Indígena de Belém do Solimões, Tabatinga - AM
            </p>
            <button
              onClick={scrollToTop}
              className="flex items-center justify-center mt-4 w-10 h-10 rounded-full bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
              aria-label="Voltar ao topo"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col-reverse md:flex-row md:justify-between md:items-center">
          <p className="text-xs text-gray-400 mt-4 md:mt-0">
            © 2024 Todos os Direitos Reservados. <br />
            ADACAIBS - Associação de Desenvolvimento Artístico e Cultural da
            Aldeia Indígena de Belém do Solimões
          </p>
          <div className="flex space-x-4 text-sm text-gray-400">
            <Link
              to="/privacidade"
              className="hover:text-yellow-500 transition-colors"
            >
              Políticas de Privacidade
            </Link>
            <Link
              to="/termos"
              className="hover:text-yellow-500 transition-colors"
            >
              Termos e Condições
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
