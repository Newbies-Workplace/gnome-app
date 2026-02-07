import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore.ts";

interface Props {
  children?: React.ReactNode;
}

export const RequireAuth: React.FC<Props> = ({ children }) => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
