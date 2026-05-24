import { Link } from "react-router-dom";
import { Cpu } from "lucide-react";
import { navigation } from "../data/navigation.js";

export default function AppFooter() {
  const footerNavigation = [
    ...navigation.filter((item) => item.path === "/account"),
    ...navigation.filter((item) => item.path !== "/account")
  ];

  return (
    <footer className="app-footer">
      <div className="footer-brand">
        <div className="brand-mark footer-brand-mark">
          <Cpu size={20} />
        </div>

        <div>
          <strong>QuantumTrade Simulator</strong>
          <p>
            A React and Node.js portfolio demo for simulated trading dashboards,
            mock market data and fintech-style interfaces.
          </p>
        </div>
      </div>

      <nav className="footer-links" aria-label="Footer navigation">
        {footerNavigation.map((item) => (
          <Link key={item.path} to={item.path}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="footer-bottom">
        <span>Portfolio project only. No real trades are executed.</span>
        <span>Built with React, Node.js and Vercel-ready APIs.</span>
      </div>
    </footer>
  );
}