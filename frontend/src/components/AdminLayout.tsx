import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { apiRequest } from "../lib/api";
import {
  AuthUser,
  clearAuth,
  getAuthHeader,
  getStoredAuth,
} from "../lib/auth";

export interface AdminOutletContext {
  adminUser: AuthUser | null;
  globalSearch: string;
  setGlobalSearch: React.Dispatch<React.SetStateAction<string>>;
}

export function useAdminContext() {
  return useOutletContext<AdminOutletContext>();
}

interface NavItem {
  to: string;
  label: string;
  icon: string;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: "dashboard", end: true },
  { to: "/admin/products", label: "Products", icon: "medical_services" },
  { to: "/admin/categories", label: "Categories", icon: "category" },
  { to: "/admin/inquiries", label: "Inquiries & RFQs", icon: "mail_outline" },
  { to: "/admin/email", label: "Email Center", icon: "send" },
  { to: "/admin/content", label: "Website Content", icon: "edit_document" },
  { to: "/admin/settings", label: "System Settings", icon: "settings" },
];

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [guardState, setGuardState] = useState<"checking" | "authorized" | "forbidden">("checking");
  const [adminUser, setAdminUser] = useState<AuthUser | null>(
    () => getStoredAuth()?.user || null
  );

  useEffect(() => {
    let isMounted = true;
    async function verify() {
      const stored = getStoredAuth();
      if (!stored?.token) {
        if (isMounted) navigate("/login?from=/admin", { replace: true });
        return;
      }
      try {
        const res = await apiRequest<{ user: AuthUser }>("/api/auth/me", {
          headers: getAuthHeader(),
        });
        if (!isMounted) return;
        if (res.user.role !== "admin") {
          setGuardState("forbidden");
        } else {
          setAdminUser(res.user);
          setGuardState("authorized");
        }
      } catch (err) {
        if (!isMounted) return;
        if (stored?.user?.role === "admin") {
          setGuardState("authorized");
        } else {
          clearAuth();
          navigate("/login?from=/admin", { replace: true });
        }
      }
    }
    verify();
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleLogout = () => {
    clearAuth();
    navigate("/login", { replace: true });
  };

  if (guardState === "checking") {
    return (
      <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#00274c] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase font-semibold text-[#00274c] tracking-widest">
            Authenticating Sialkot Admin Console...
          </span>
        </div>
      </div>
    );
  }

  if (guardState === "forbidden") {
    return (
      <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-xl shadow-md border border-red-200 max-w-md w-full text-center">
          <span className="material-symbols-outlined text-4xl text-red-500 mb-2">lock</span>
          <h2 className="text-xl font-bold text-[#00274c] mb-2">Administrative Privileges Required</h2>
          <p className="text-xs text-[#43474f] mb-6">
            Your account does not possess the administrative clearance required to manage hospital catalogue telemetry.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-[#00274c] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0f3d6c] transition-colors"
          >
            Return to Storefront
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex">
      {/* ==========================================
          FIXED LEFT SIDEBAR (w-72)
          ========================================== */}
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-72 bg-white border-r border-[#e5eeff] flex-col justify-between z-50">
        <div>
          {/* Logo & Portal Branding */}
          <div className="h-16 px-6 flex items-center gap-3 border-b border-[#e5eeff]">
            <div className="w-9 h-9 rounded-lg bg-[#00274c] flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-xl">medical_services</span>
            </div>
            <div className="flex flex-col">
              <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#00274c] leading-tight">
                BuleNeedle
              </span>
              <span className="text-[10px] text-[#006877] uppercase tracking-widest font-semibold">
                Admin Console • Sialkot
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#00274c] text-white shadow-sm"
                      : "text-[#43474f] hover:bg-[#eff4ff] hover:text-[#00274c]"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer Facility Metadata */}
        <div className="p-4 border-t border-[#e5eeff]">
          <div className="bg-[#eff4ff] p-3 rounded-lg border border-[#e5eeff]">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#006877] animate-pulse" />
              <span className="text-[11px] font-bold text-[#00274c]">Sialkot Manufacturing HQ</span>
            </div>
            <p className="text-[10px] text-[#43474f]">
              ISO 13485:2016 Certified | Plant v2.4.1
            </p>
          </div>
        </div>
      </aside>

      {/* ==========================================
          MAIN AREA (Offset by 72 in LG)
          ========================================== */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        {/* Fixed Top Command Bar */}
        <header className="sticky top-0 h-16 bg-white/95 backdrop-blur-md border-b border-[#e5eeff] z-40 flex items-center justify-between px-6 gap-4">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#00274c] hover:bg-[#eff4ff]"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          {/* Search bar & Live status pill */}
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex items-center w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 text-[#737780] text-lg pointer-events-none">
                search
              </span>
              <input
                ref={searchInputRef}
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search catalog, SKUs, inquiries, customers..."
                className="w-full bg-[#eff4ff] border border-transparent rounded-lg pl-9 pr-4 py-1.5 text-xs text-[#0b1c30] placeholder:text-[#737780] focus:outline-none focus:bg-white focus:border-[#006877] transition-all"
                type="text"
              />
            </div>
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#a3eeff]/40 text-[#00274c]">
              <span className="w-2 h-2 rounded-full bg-[#006877]" />
              <span className="text-[11px] font-semibold tracking-tight">
                Production API: Connected • Sialkot HQ
              </span>
            </div>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#00274c] hover:bg-[#e5eeff] text-xs font-semibold transition-colors border border-[#e5eeff]"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span>View Live Storefront</span>
            </Link>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-[#eff4ff] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#00274c] text-white flex items-center justify-center font-bold text-xs">
                  SA
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-[#00274c] leading-tight">
                    {adminUser?.fullName || "Super Admin"}
                  </span>
                  <span className="text-[10px] text-[#43474f]">Sialkot Facility</span>
                </div>
                <span className="material-symbols-outlined text-sm text-[#737780]">
                  expand_more
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#e5eeff] py-1 z-50">
                  <div className="px-4 py-2 border-b border-[#eff4ff]">
                    <p className="text-xs font-bold text-[#00274c]">{adminUser?.fullName || "Super Admin"}</p>
                    <p className="text-[10px] text-[#43474f] truncate">{adminUser?.email || "admin@buleneedle.com"}</p>
                  </div>
                  <Link
                    to="/admin/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-[#0b1c30] hover:bg-[#eff4ff]"
                  >
                    System Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            <div className="relative w-64 bg-white h-full flex flex-col justify-between p-4 z-10 border-r border-[#e5eeff]">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#e5eeff] mb-4">
                  <span className="font-bold text-[#00274c]">BuleNeedle Admin</span>
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <nav className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold ${
                          isActive
                            ? "bg-[#00274c] text-white"
                            : "text-[#43474f] hover:bg-[#eff4ff]"
                        }`
                      }
                    >
                      <span className="material-symbols-outlined text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </nav>
              </div>
              <button
                onClick={handleLogout}
                className="w-full py-2 bg-red-50 text-red-600 rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Outlet */}
        <main className="flex-1 p-6 md:p-8">
          <Outlet context={{ adminUser, globalSearch, setGlobalSearch }} />
        </main>
      </div>
    </div>
  );
};
