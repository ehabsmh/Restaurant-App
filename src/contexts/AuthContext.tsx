import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getCurrentUser } from "../services/apiAuth";
import { getUserCartByUserId } from "../services/apiCart";

export type AuthContextType = {
  currentUser: User | null;
  isAuthenticated: boolean;
  userCartId: number | null;
  handleCurrentUser: (user: User | null) => void;
  handleUserCartId: (cartId: number) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userCartId, setUserCartId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = currentUser?.role === "authenticated" || false;
  console.log(isAuthenticated);

  function handleUserCartId(cartId: number) {
    setUserCartId(cartId);
  }

  function handleCurrentUser(user: User | null) {
    setCurrentUser(user);
  }

  useEffect(
    function () {
      async function getUser() {
        setIsLoading(true);
        const userData = await getCurrentUser();
        if (userData) {
          const userCart = await getUserCartByUserId(userData?.id);
          setUserCartId(userCart?.id);
          setCurrentUser(userData);
        }

        setIsLoading(false);
      }
      getUser();
    },
    [isAuthenticated],
  );

  const value = {
    handleCurrentUser,
    currentUser,
    isAuthenticated,
    userCartId,
    handleUserCartId,
    isLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
export default AuthContext;
