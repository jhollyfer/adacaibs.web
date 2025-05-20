import { Loader2 } from "lucide-react";

export function Loading(): React.JSX.Element {
  return (
    <div className="flex justify-center items-center py-10">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      <span className="ml-2 text-muted-foreground">Carregando...</span>
    </div>
  );
}
