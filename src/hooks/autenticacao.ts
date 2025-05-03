import {
  AuthenticationContext,
  AuthenticationContextType,
} from "@/context/autenticacao";
import React from "react";

export function useAuthentication(): AuthenticationContextType {
  const context = React.useContext(AuthenticationContext);

  if (context === undefined)
    throw new Error(
      "useAuthentication must be used within a AuthenticationContext"
    );

  return context;
}
