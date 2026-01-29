import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  const isAuthenticated = true

  return (
    <>
      <CssBaseline />

      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LogInPage />} />

        <Route
          path="/dashboard"
          element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;