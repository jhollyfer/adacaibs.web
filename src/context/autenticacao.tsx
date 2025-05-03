/* eslint-disable react-refresh/only-export-components */
export const AUTHENTICATION_ID = "@ADACAIBS:AUTHENTICATION:V1";
import React from "react";

interface AuthenticationSignInResponse {
  token: string;
}

export interface AuthenticationContextType {
  isAuthenticated: boolean;
  signIn: (payload: AuthenticationSignInResponse) => void;
  signOut: () => void;
}

export const AuthenticationContext = React.createContext<
  AuthenticationContextType | undefined
>(undefined);

type AuthenticationContextProps = {
  children: React.ReactNode;
};

export const AuthenticationProvider = ({
  children,
}: AuthenticationContextProps): React.JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    const _string = sessionStorage.getItem(AUTHENTICATION_ID);
    if (!_string || _string === null) return false;

    const _json = JSON.parse(_string);
    if (!_json?.token) return false;

    return true;
  });

  const signIn = React.useCallback((payload: AuthenticationSignInResponse) => {
    sessionStorage.setItem(AUTHENTICATION_ID, JSON.stringify(payload));
    setIsAuthenticated(true);
  }, []);

  const signOut = React.useCallback(() => {
    setIsAuthenticated(false);
    sessionStorage.clear();
    window.location.reload();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        signIn,
        isAuthenticated,
        signOut,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
