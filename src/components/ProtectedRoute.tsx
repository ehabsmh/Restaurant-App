import { ReactNode } from "react";
import { useSession } from "../contexts/AuthContext";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser } = useSession();
  if (currentUser) return null;
  return { children };
}

export default ProtectedRoute;
