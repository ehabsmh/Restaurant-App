import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthContext from "../contexts/AuthContext";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth(AuthContext);
  // const navigate = useNavigate();
  console.log(currentUser);

  if (currentUser?.role !== "authenticated") return <Navigate to="/login" />;
  return <>{children}</>;
}

export default ProtectedRoute;
