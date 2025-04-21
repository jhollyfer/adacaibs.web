import { Badge as Root } from "@/components/ui/badge";

export function Badge(
  props: React.ComponentProps<typeof Root>
): React.JSX.Element {
  return <Root className="rounded-full px-1 py-0 text-xs" {...props} />;
}
