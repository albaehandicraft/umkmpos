import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSupabase } from "../../contexts/SupabaseContext";

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: "admin" | "cashier" | "inventory";
}

const AuthGuard = ({ children, requiredRole }: AuthGuardProps) => {
  const { user, loading } = useSupabase();

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check for required role if specified
  if (requiredRole && user.role !== requiredRole && user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
