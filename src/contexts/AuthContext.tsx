import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getCurrentUser } from "../services/apiAuth";

export type AuthContextType = {
  currentUser: User | null;
  handleCurrentUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  function handleCurrentUser(user: User | null) {
    setCurrentUser(user);
  }

  useEffect(function () {
    async function getUser() {
      const userData = await getCurrentUser();

      setCurrentUser(userData);
    }
    getUser();
  }, []);

  const value = { handleCurrentUser, currentUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
export default AuthContext;
