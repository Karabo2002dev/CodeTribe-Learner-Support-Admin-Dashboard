import { Routes, Route } from "react-router-dom";

import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./components/layout/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Queries from "./pages/Queries";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/login" element={<LogInPage />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/queries" element={<Queries />} />
      </Route>
    </Routes>
  )
}

export default App;