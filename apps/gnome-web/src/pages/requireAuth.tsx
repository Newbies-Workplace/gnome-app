import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

interface Props {
  children?: React.ReactNode;
}
export const RequireAuth: React.FC<Props> = ({ children }) => {
  const { user, isLoading } = useAuthStore();

  if (user) {
    return <>{children}</>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
};
