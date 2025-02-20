import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("AuthContext were used outside the AuthProvider");

  return context;
}

export default useAuth;
