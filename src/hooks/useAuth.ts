import { useContext } from "react";
import { AuthContextType } from "../contexts/AuthContext";

function useAuth(AuthContext: React.Context<AuthContextType | null>) {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("AuthContext were used outside the AuthProvider");

  return context;
}

export default useAuth;
