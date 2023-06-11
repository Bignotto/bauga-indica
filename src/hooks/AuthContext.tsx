import { ReactNode, createContext, useContext, useState } from "react";

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
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //implement type functions
  async function signIn(email: string, password: string) {
    console.log({
      page: "login",
      where: "AuthHook signIn",
      email,
      password,
    });
  }

  async function signOut() {}

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        userId,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
