import { Navigate } from "react-router-dom";

const ProtectedRouteLoginAndRegister = ({ children, loggedIn }) => {
  if (!loggedIn) {
    return children;
  }

  return <Navigate to="/movies-explorer-frontend" />;
};

export default ProtectedRouteLoginAndRegister;
