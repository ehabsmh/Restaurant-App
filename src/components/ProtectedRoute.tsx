import { ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Loader from "../ui/Loader";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, currentUser } = useAuth();

  if (currentUser === null)
    return (
      <div className="flex h-[90vh] items-center justify-center">
        <Loader color="#ed4b74" size={70} />
      </div>
    ); // Prevent redirect during auth check

  if (!isAuthenticated) return <Navigate to="/login" />;
  return <>{children}</>;
}

export default ProtectedRoute;
