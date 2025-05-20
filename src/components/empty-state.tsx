import React from "react";
import { XCircle } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  message = "Nenhum item encontrado",
  icon = <XCircle strokeWidth={1.5} className="h-16 w-16 text-gray-400" />,
}: EmptyStateProps): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center py-12 border rounded-md bg-gray-50">
      <div className="mb-2">{icon}</div>
      <p className="text-lg text-gray-500 font-medium">{message}</p>
    </div>
  );
}