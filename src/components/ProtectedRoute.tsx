import { ReactNode } from "react";
import { useSession } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser } = useSession();
  // const navigate = useNavigate();
  console.log(currentUser);

  if (!currentUser) return <Navigate to="/login" />;
  if (currentUser) return <>{children}</>;
}

export default ProtectedRoute;
