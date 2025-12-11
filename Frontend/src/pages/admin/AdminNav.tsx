import React from "react";
import { Link, useLocation } from "react-router";
import { Package, Users, BarChart3, Settings, ShoppingBag } from "lucide-react";

export default function AdminNav() {
  const location = useLocation();

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: BarChart3 },
    { to: "/admin/shopping", label: "shopping", icon: Package },

  ];

  return (
    <div className="w-64 border-r border-accent h-screen flex flex-col bg-primary">
      <div className="p-6 border-b border-accent flex items-center justify-center">
        <h2 className="text-2xl font-bold text-secondary">Admin Panel</h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;

            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-accent text-white"
                      : "text-secondary hover:bg-accent"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
