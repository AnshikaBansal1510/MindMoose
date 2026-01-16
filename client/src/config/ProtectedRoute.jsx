import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";

const ProtectedRoute = ({ authUser, isLoading }) => {
  if (isLoading) {
    return <Loader />
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
