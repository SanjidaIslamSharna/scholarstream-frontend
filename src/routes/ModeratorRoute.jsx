import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ModeratorRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user?.role !== "Moderator") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ModeratorRoute;