import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const NAV = [
  { to: "/", label: "Dashboard", icon: "◧" },
  { to: "/leads", label: "Lead Management", icon: "☎" },
  { to: "/inventory", label: "Vehicle Inventory", icon: "▭" },
  { to: "/test-rides", label: "Test Rides", icon: "➤" },
  { to: "/service", label: "Service Center", icon: "✚" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="bg-charcoal text-white w-60 min-h-screen flex flex-col shrink-0">
      <div className="px-5 pt-7 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full border-2 border-redline flex items-center justify-center font-display font-bold text-sm">
            SM
          </div>
          <div>
            <p className="font-display text-sm font-semibold leading-tight tracking-wide">
              SANGAM MOTORS
            </p>
            <p className="text-[10px] text-white/50 uppercase tracking-widest">
              Dealership CRM
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`
            }
          >
            <span className="w-5 text-center text-redline">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {user && (
        <div className="px-5 py-4 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-medium text-white truncate">{user.name}</p>
            <p className="text-[10px] text-white/40 uppercase tracking-widest">
              {user.role}
            </p>
          </div>
          <button
            onClick={logout}
            className="text-[11px] text-white/50 hover:text-redline transition-colors shrink-0"
          >
            Log out
          </button>
        </div>
      )}

      <div className="px-5 py-5 border-t border-white/10">
        <p className="text-[10px] text-white/40 leading-relaxed">
          Sangam Motors Pvt. Ltd.
          <br />
          Showroom &amp; Service · Jaipur
        </p>
      </div>
    </aside>
  );
}
