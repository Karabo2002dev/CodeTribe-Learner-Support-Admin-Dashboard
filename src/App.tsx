import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store/store";
import { loadUserFromStorage } from "./store/authSlice";
import { Role } from "./types/role";

import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";

import DashboardLayout from "./components/layout/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Queries from "./pages/Queries";
import Faqs from "./pages/FaqsPage";
import Reports from "./pages/ReportsPage";
import Settings from "./pages/SettingsPage";
import Users from "./pages/UsersPage";

import AssignedQueries from "./pages/AssignedQueries";

import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

function RoleRoute({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles: Role[];
}) {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
}

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/login" element={<LogInPage />} />
     <Route
      path="/admin"
      element={
        <RoleRoute roles={[Role.Admin]}>
          <DashboardLayout />
        </RoleRoute>
      }
    >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="queries" element={<Queries />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="reports" element={<Reports />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route
        path="/facilitator"
        element={
          <RoleRoute roles={[Role.Facilitator]}>
            <DashboardLayout />
          </RoleRoute>
        }
      >
        <Route path="assigned-queries" element={<AssignedQueries />} />
      </Route>
    </Routes>
  );
}

export default App;