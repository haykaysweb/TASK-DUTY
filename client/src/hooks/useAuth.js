import { useContext, createContext } from "react";

const initialState = {
  user: null,
  setUser: () => null,
  accessToken: null,
  setAccessToken: () => null,
  isAuthenticating: false,
  setIsAuthenticating: () => null,
};

// create the store
export const AuthProviderContext = createContext(initialState);


export const useAuth = () => {
  const context = useContext(AuthProviderContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};