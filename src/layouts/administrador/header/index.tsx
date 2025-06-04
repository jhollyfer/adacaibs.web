import { Search } from "@/components/search";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { Profile } from "./profile";

export function Header(): React.JSX.Element {
  const location = useLocation();
  const exibirPesquisa = !["/administrador"].includes(location.pathname);

  return (
    <header className="w-full py-4 inline-flex gap-2 px-4 justify-center border-b ">
      <nav className="container max-w-full items-center inline-flex justify-between gap-4 h-8">
        <SidebarTrigger
          className="cursor-pointer rounded-sm shadow-none h-full w-8"
          variant="outline"
          size="icon"
        />
        <div className="inline-flex gap-2 w-full items-center">
          {exibirPesquisa && <Search />}
        </div>
        <div className="inline-flex gap-2">
          <ThemeToggle />
          <Profile />
        </div>
      </nav>
    </header>
  );
}
