import { ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Loader from "../ui/Loader";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="flex h-[90vh] items-center justify-center">
        <Loader color="#ed4b74" size={70} />
      </div>
    );

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
