// src/hooks/useRole.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useRole = () => {
  const { user } = useContext(AuthContext);
  return user?.role || "Student";
};

export default useRole;
