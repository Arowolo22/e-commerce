import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase"; // adjust path to your firebase config

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
