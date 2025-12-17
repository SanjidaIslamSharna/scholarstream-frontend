import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard/profile');
  }, [user, navigate]);

  return null;
};

export default DashboardHome;
