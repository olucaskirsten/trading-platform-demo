import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import BackgroundFX from "../components/BackgroundFX.jsx";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <BackgroundFX />
      <Sidebar />
      <main className="main-panel">
        <Topbar />
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
