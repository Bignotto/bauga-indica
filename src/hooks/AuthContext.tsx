import { ReactNode, createContext, useContext } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

type IAuthContextData = {
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  userId: string;
  isLoading: boolean;
};
const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  //implement type functions
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider };
