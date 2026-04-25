import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// ─── Role Config ──────────────────────────────────────────────────────────────
const ROLE_CONFIG = {
  ADMIN: { label: "Admin", color: "#8b5cf6", bg: "#8b5cf620" },
  NATIONAL: { label: "National", color: "#f59e0b", bg: "#f59e0b20" },
  STATE: { label: "State", color: "#06b6d4", bg: "#06b6d420" },
  REGIONAL: { label: "Regional", color: "#10b981", bg: "#10b98120" },
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, hasPermission } = useAuth();

  const navItems = [
    { icon: "🏠", label: "Dashboard", path: "/dashboard", always: true },
    { icon: "👥", label: "Members", path: "/members", module: "MEMBERS", action: "LIST_MEMBERS" },
    { icon: "🪪", label: "KYC", path: "/kyc", module: "KYC", action: "PROFILE_KYC" },
    { icon: "💸", label: "Payout", path: "/payout", module: "PAYOUT", action: "ACCOUNT_APPROVAL_REQUEST" },
    { icon: "💰", label: "Wallet", path: "/wallet", module: "WALLET", action: "WALLET" },
    { icon: "📊", label: "Transactions", path: "/transactions", module: "TRANSACTIONS", action: "WALLET_TRANSACTIONS" },
    { icon: "🎫", label: "Support", path: "/support", module: "SUPPORT_TICKET", action: "SUPPORT_TICKET" },
    { icon: "⚙️", label: "Settings", path: "/settings", module: "SETTINGS", action: "MAIN_SETTINGS" },
    { icon: "🔧", label: "Services", path: "/services", module: "OTHER_SERVICES", action: "LIST_SERVICE" },
    { icon: "🏦", label: "Manage", path: "/manage", module: "MANAGE", action: "COMPANY_BANKS" },
    { icon: "👔", label: "Employees", path: "/employees", module: "EMPLOYEE_MANAGEMENT", action: "VIEW_EMPLOYEE" },
    { icon: "🗺️", label: "Live Map", path: "/live-map", module: "DASHBOARD", action: "VIEW_LIVE_LOCATION" },
  ];

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{
      position: "fixed", left: 0, top: 0, bottom: 0,
      width: collapsed ? 64 : 220,
      background: "#0a0f1e",
      borderRight: "1px solid #1e293b",
      display: "flex", flexDirection: "column",
      zIndex: 100, transition: "width 0.3s ease",
      overflowY: "auto", overflowX: "hidden"
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? "20px 14px" : "20px 16px",
        borderBottom: "1px solid #1e293b",
        display: "flex", alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, boxShadow: "0 0 15px #6366f140"
          }}>₹</div>
          {!collapsed && (
            <span style={{ color: "#e2e8f0", fontWeight: 800, fontSize: 16, fontFamily: "DM Sans" }}>
              UjjwalPay
            </span>
          )}
        </div>
        {!collapsed && (
          <button onClick={() => setCollapsed(true)} style={{
            background: "none", border: "none", color: "#475569",
            cursor: "pointer", fontSize: 14, padding: 4
          }}>◀</button>
        )}
      </div>

      {collapsed && (
        <button onClick={() => setCollapsed(false)} style={{
          background: "none", border: "none", color: "#475569",
          cursor: "pointer", fontSize: 14, padding: "8px 0", textAlign: "center"
        }}>▶</button>
      )}

      {/* User Info */}
      {!collapsed && user && (
        <div style={{ padding: "14px 16px", borderBottom: "1px solid #1e293b" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>
            {user.name || user.username}
          </div>
          <div style={{
            display: "inline-block", fontSize: 10, fontWeight: 700,
            padding: "2px 8px", borderRadius: 20,
            background: ROLE_CONFIG[user.role]?.bg || "#33415522",
            color: ROLE_CONFIG[user.role]?.color || "#94a3b8",
            border: `1px solid ${ROLE_CONFIG[user.role]?.color || "#475569"}44`
          }}>
            {ROLE_CONFIG[user.role]?.label || user.role}
          </div>
          {user.territory && (
            <div style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>
              📍 {user.territory}
            </div>
          )}
        </div>
      )}

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: "8px 0" }}>
        {navItems.map(({ icon, label, path, always, module, action }) => {
          if (!always && module && action && !hasPermission(module, action)) return null;
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              title={collapsed ? label : ""}
              style={{
                width: "100%", display: "flex", alignItems: "center",
                gap: 12, padding: collapsed ? "10px 0" : "10px 16px",
                justifyContent: collapsed ? "center" : "flex-start",
                background: isActive ? "#6366f120" : "transparent",
                border: "none", cursor: "pointer",
                color: isActive ? "#818cf8" : "#64748b",
                fontSize: 13, fontFamily: "DM Sans", fontWeight: isActive ? 600 : 400,
                borderLeft: isActive ? "3px solid #6366f1" : "3px solid transparent",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "#6366f110"; e.currentTarget.style.color = "#94a3b8"; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b"; } }}
            >
              <span style={{ fontSize: 16 }}>{icon}</span>
              {!collapsed && label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "12px", borderTop: "1px solid #1e293b" }}>
        <button
          onClick={() => { logout(); window.location.href = "/login"; }}
          style={{
            width: "100%", padding: "9px", background: "#ef444415",
            border: "1px solid #ef444430", borderRadius: 8, color: "#f87171",
            cursor: "pointer", fontSize: 13, fontFamily: "DM Sans",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8
          }}
        >
          <span>🚪</span>
          {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );
}

// ─── TopBar ───────────────────────────────────────────────────────────────────
export function TopBar({ stats, sidebarWidth = 220 }) {
  const { user } = useAuth();
  const [time, setTime] = useState(new Date());
  const roleConf = ROLE_CONFIG[user?.role] || ROLE_CONFIG.ADMIN;

  useState(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  });

  const timeStr = time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div style={{
      position: "fixed", top: 0, left: sidebarWidth, right: 0,
      height: 60, background: "#020817",
      borderBottom: "1px solid #1e293b",
      display: "flex", alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px", zIndex: 99,
      transition: "left 0.3s ease"
    }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "#475569", fontSize: 13 }}>UjjwalPay</span>
        <span style={{ color: "#334155" }}>/</span>
        <span style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>Dashboard</span>
        {user?.territory && (
          <>
            <span style={{ color: "#334155" }}>/</span>
            <span style={{ color: roleConf.color, fontSize: 12, fontWeight: 600 }}>
              📍 {user.territory}
            </span>
          </>
        )}
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Live indicator */}
        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#4ade80", fontWeight: 600 }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%", background: "#4ade80",
            boxShadow: "0 0 6px #4ade80",
            animation: "livePulse 1.4s ease-in-out infinite"
          }} />
          LIVE
        </span>

        <span style={{ fontSize: 11, color: "#475569", fontFamily: "monospace" }}>{timeStr}</span>

        {/* Stats pills */}
        {stats && [
          { label: "Charges", value: stats.charges, color: "#f59e0b" },
          { label: "Commission", value: stats.commission, color: "#10b981" },
          { label: "Wallet", value: stats.wallet, color: "#6366f1" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            background: `${color}15`, border: `1px solid ${color}33`,
            borderRadius: 8, padding: "4px 10px",
            display: "flex", gap: 6, alignItems: "center"
          }}>
            <span style={{ fontSize: 10, color: "#64748b" }}>{label}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color, fontVariantNumeric: "tabular-nums" }}>
              {typeof value === "number" ? value.toLocaleString("en-IN") : value || "—"}
            </span>
          </div>
        ))}

        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 8 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0" }}>
              {user?.name || user?.username || "USER"}
            </div>
            <div style={{
              fontSize: 10, fontWeight: 700,
              color: roleConf.color,
            }}>
              {roleConf.label}
            </div>
          </div>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: roleConf.bg,
            border: `1px solid ${roleConf.color}44`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15
          }}>
            {user?.photo ? <img src={user.photo} alt="" style={{ width: "100%", borderRadius: 10 }} /> : "👤"}
          </div>
        </div>
      </div>

      <style>{`@keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
