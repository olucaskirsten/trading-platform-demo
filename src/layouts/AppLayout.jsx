import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import BackgroundFX from "../components/BackgroundFX.jsx";
import MobileNavigation from "../components/MobileNavigation.jsx";
import AppFooter from "../components/AppFooter.jsx";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <BackgroundFX />

      <Sidebar />

      <main className="main-panel">
        <MobileNavigation />
        <Topbar />

        <div className="page-container">
          <Outlet />
          <AppFooter />
        </div>
      </main>
    </div>
  );
}