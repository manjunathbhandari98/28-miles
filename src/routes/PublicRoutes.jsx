import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If user is already logged in, redirect to home or account
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Else allow access to the public route
  return children;
};

export default PublicRoute;
