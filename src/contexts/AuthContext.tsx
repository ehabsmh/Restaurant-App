import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useState } from "react";

type AuthContextType = {
  currentUser: User | null;
  handleCurrentUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  function handleCurrentUser(user: User | null) {
    setCurrentUser(user);
  }
  const value = { handleCurrentUser, currentUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useSession() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("AuthContext were used outside the AuthProvider");

  return context;
}

export { AuthProvider, useSession };
