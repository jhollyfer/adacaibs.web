import { SearchIcon } from "lucide-react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";

export function Search(): React.JSX.Element {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(location.search);

  return (
    <div className="flex-1 inline-flex items-center relative h-8 w-full gap-4">
      <SearchIcon
        className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
        strokeWidth={1.5}
      />
      <Input
        defaultValue={searchParams?.get("search") || undefined}
        placeholder="Pesquise aqui"
        className="pl-9 h-full shadow-none rounded-sm"
        onKeyDown={(event) => {
          if (
            event.key === "Backspace" &&
            event?.currentTarget?.value?.length === 1
          ) {
            searchParams.delete("search");
            setSearchParams(searchParams);
          }

          if (event.key === "Enter") {
            searchParams.set("search", event.currentTarget.value);
            setSearchParams(searchParams);
          }
        }}
      />
    </div>
  );
}
