import { Navigate } from "react-router-dom";

// Clear token on every refresh
if (typeof window !== "undefined") {
  window.onbeforeunload = () => {
    localStorage.removeItem("authToken");
  };
}

export default function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return isAuthenticated ? children : <Navigate to="/login" />;
}
