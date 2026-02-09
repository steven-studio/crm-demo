import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedLayout = () => {
  const { userData } = useSelector((state) => state.userReducer);
  if (!userData) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export const AuthProtectedLayout = () => {
  const { userData } = useSelector((state) => state.userReducer);
  if (userData) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
