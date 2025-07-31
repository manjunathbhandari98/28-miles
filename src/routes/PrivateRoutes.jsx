import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // or use a proper auth context
  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
