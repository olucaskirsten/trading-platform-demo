import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AppLayout from "./layouts/AppLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login/index.jsx";
import Register from "./pages/Register/index.jsx";
import Dashboard from "./pages/Dashboard/index.jsx";
import Portfolio from "./pages/Portfolio/index.jsx";
import Markets from "./pages/Markets/index.jsx";
import Orders from "./pages/Orders/index.jsx";
import Watchlist from "./pages/Watchlist/index.jsx";
import Insights from "./pages/Insights/index.jsx";
import RiskSettings from "./pages/RiskSettings/index.jsx";
import NotFound from "./pages/NotFound/index.jsx";
import Account from "./pages/Account/index.jsx";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/risk-settings" element={<RiskSettings />} />
          <Route path="/account" element={<Account />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}
