import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth";

export default function ProtectedRoute({ path, element, ...props }) {
  const { login } = useAuth();

  return login ? (
    <Route {...props} element={element} path={path} />
  ) : (
    <Navigate replace to="/login" state={{ from: path }} />
  );
}
