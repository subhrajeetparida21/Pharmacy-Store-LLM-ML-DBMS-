import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children, role }) {
  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) {
    return <h2>Access Denied</h2>;
  }

  return children;
}

export default ProtectedRoute;