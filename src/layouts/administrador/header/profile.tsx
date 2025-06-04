import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthentication } from "@/hooks/autenticacao";
import { Link } from "react-router-dom";

export function Profile(): React.JSX.Element {
  const { signOut } = useAuthentication();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-sm px-2 py-0  border h-auto">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/avatars/01.png" alt="Perfil do usuário" />
            <AvatarFallback className="text-xs">
              {/* {autenticado?.nome?.split(" ")[0][0] ?? "EB"} */}
              AC
            </AvatarFallback>
          </Avatar>
          <div className="hidden lg:flex flex-col gap-1 justify-center items-start">
            <p className="text-xs leading-none font-medium">
              {/* {autenticado?.nome?.split(" ")[0] ?? ""} */}
              Administrador
            </p>
            {/* <p className="text-muted-foreground text-xs leading-none">
              {autenticado?.email ?? ""}
            </p> */}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/perfil">Perfil</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
