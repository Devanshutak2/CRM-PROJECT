import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, checking } = useAuth();
  const location = useLocation();

  if (checking) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-paper">
        <p className="text-sm text-mute">Loading…</p>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
