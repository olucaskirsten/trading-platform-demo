import {
  Activity,
  BarChart3,
  Briefcase,
  History,
  LineChart,
  Radar,
  ShieldCheck
} from "lucide-react";

export const navigation = [
  { label: "Live Trading", path: "/dashboard", icon: Activity },
  { label: "Portfolio", path: "/portfolio", icon: Briefcase },
  { label: "Markets", path: "/markets", icon: BarChart3 },
  { label: "Orders", path: "/orders", icon: History },
  { label: "Watchlist", path: "/watchlist", icon: LineChart },
  { label: "Insights", path: "/insights", icon: Radar },
  { label: "Risk Settings", path: "/risk-settings", icon: ShieldCheck }
];
