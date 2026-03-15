import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { Role } from "./types/role";

import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";

import DashboardLayout from "./components/layout/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Queries from "./pages/Queries";
import AdminDocEditor from "./pages/AdminDocEditor";
import Reports from "./pages/ReportsPage";
import Settings from "./pages/SettingsPage";
import Users from "./pages/UsersPage";
import ContactUs from "./pages/ContactUs";
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
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  if (!roles.includes(user.role)) return <Navigate to="/login" replace />;

  return children;
}

function App() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to={user.role === Role.Admin ? "/admin/dashboard" : "/facilitator/assigned-queries"} replace /> : <RegisterPage />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to={user.role === Role.Admin ? "/admin/dashboard" : "/facilitator/assigned-queries"} replace /> : <LogInPage />}
      />

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
        <Route path="documents" element={<AdminDocEditor />} />
        <Route path="reports" element={<Reports />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
        <Route path="ContactUs" element={<ContactUs />} />
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
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;