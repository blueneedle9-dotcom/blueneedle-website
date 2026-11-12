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
  { to: "/admin", label: "Dashboard", icon: "grid_view", end: true },
  { to: "/admin/products", label: "Products", icon: "inventory_2" },
  { to: "/admin/categories", label: "Categories", icon: "category" },
  { to: "/admin/inquiries", label: "Customer Inquiries", icon: "contact_support" },
  { to: "/admin/email", label: "Email Sender", icon: "forward_to_inbox" },
  { to: "/admin/content", label: "Website Content", icon: "web" },
  { to: "/admin/settings", label: "Settings", icon: "tune" },
];

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [guardState, setGuardState] = useState<"checking" | "authorized" | "forbidden">("checking");
  const [adminUser, setAdminUser] = useState<AuthUser | null>(
    () => getStoredAuth()?.user || null
  );

  useEffect(() => {
    let active = true;
    const stored = getStoredAuth();

    if (!stored?.token) {
      navigate("/login?redirect=/admin", { replace: true });
      return;
    }

    apiRequest<{ user: AuthUser }>("/api/auth/me", {
      headers: getAuthHeader(),
    })
      .then((res) => {
        if (!active) return;
        setAdminUser(res.user);
        if (res.user.role === "admin") {
          setGuardState("authorized");
        } else {
          setGuardState("forbidden");
        }
      })
      .catch(() => {
        if (!active) return;
        clearAuth();
        navigate("/login?redirect=/admin", { replace: true });
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSignOut = () => {
    clearAuth();
    navigate("/login", { replace: true });
  };

  if (guardState === "checking") {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-space-lg">
        <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col items-center gap-3 text-center max-w-sm w-full border border-outline-variant/30">
          <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center text-on-primary animate-pulse">
            <span className="material-symbols-outlined text-[24px]">
              precision_manufacturing
            </span>
          </div>
          <p className="font-headline-sm text-headline-sm text-primary font-semibold">
            Verifying Operations Clearance
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Validating Vanguard Swiss Master Node session...
          </p>
        </div>
      </div>
    );
  }

  if (guardState === "forbidden") {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-space-lg">
        <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col items-center gap-4 text-center max-w-md w-full border border-outline-variant/30">
          <div className="w-12 h-12 rounded-xl bg-error-container flex items-center justify-center text-on-error-container">
            <span className="material-symbols-outlined text-[26px]">
              gpp_maybe
            </span>
          </div>
          <div className="space-y-1">
            <span className="font-label-sm text-label-sm text-error uppercase tracking-wider font-semibold">
              403 • Restricted Administrative Gateway
            </span>
            <h1 className="font-headline-md text-headline-md text-primary font-bold">
              Administrator Privileges Required
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Signed in as <span className="font-semibold text-primary">{adminUser?.email}</span>{" "}
              (role: <span className="font-mono text-xs">{adminUser?.role || "buyer"}</span>).
              Only authorized Vanguard Surgical Precision administrators can access this portal.
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high font-semibold text-sm transition-colors"
            >
              Return to Storefront
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-semibold text-sm transition-colors"
            >
              Sign Out &amp; Switch Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  const displayName = adminUser?.fullName || "Dr. Erik Vance";
  const displayRole = adminUser?.role === "admin" ? "Catalog Admin" : "Auditor";

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex">
      {/* Sidebar - Desktop Left Column */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-outline-variant/20">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand header */}
          <div className="px-space-lg pt-space-lg pb-space-md flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">
                precision_manufacturing
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm font-semibold tracking-tight text-on-surface uppercase leading-none">
                VANGUARD
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline mt-0.5">
                Surgical Admin Portal
              </span>
            </div>
          </div>

          <div className="px-space-md py-space-xs">
            <div className="h-[1px] bg-surface-container-highest w-full"></div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-space-md py-space-sm space-y-space-xs flex flex-col">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-space-sm px-space-md py-space-sm transition-colors bg-primary-container text-on-primary font-semibold rounded-lg text-sm"
                    : "flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg"
                }
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer System Status & Logout */}
        <div className="p-space-md bg-surface-container flex flex-col gap-space-sm border-t border-outline-variant/20">
          <div className="flex items-center justify-between px-space-sm py-space-xs rounded bg-surface-container-lowest">
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-wide text-on-surface font-semibold">
                System Online
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-outline font-mono">
              ISO 13485
            </span>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-error hover:bg-error-container hover:text-on-error-container transition-colors font-label-lg text-label-lg w-full text-left"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-72 w-full flex flex-col min-h-screen">
        {/* Fixed Topbar */}
        <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface/80 backdrop-blur-xl z-40 flex items-center justify-between px-space-md lg:px-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/20">
          <div className="flex items-center gap-space-md">
            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-1.5 rounded-lg text-primary hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-space-xs font-label-md text-label-md text-outline">
              <span className="hover:text-on-surface cursor-pointer">Operations</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <span className="text-on-surface font-semibold">Console</span>
            </div>

            {/* Search Input */}
            <div className="hidden md:flex items-center bg-surface-container-lowest px-space-md py-space-xs rounded-lg gap-space-xs text-outline border border-outline-variant/20 focus-within:border-primary-container">
              <span className="material-symbols-outlined text-[18px]">search</span>
              <input
                ref={searchInputRef}
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Global Search [SKU, PO, Lot #]..."
                className="bg-transparent border-none outline-none font-body-sm text-body-sm text-on-surface placeholder:text-outline w-56"
              />
              <span className="font-label-sm text-label-sm px-space-xs bg-surface-container rounded text-outline font-mono">
                ⌘K
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-md">
            <Link
              to="/admin/products"
              className="hidden sm:flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container hover:bg-surface-container-high rounded-lg text-on-surface font-label-md text-label-md transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Quick Action</span>
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen((prev) => !prev)}
                className="relative flex items-center justify-center p-space-xs rounded-lg hover:bg-surface-container-high cursor-pointer text-on-surface-variant"
                aria-label="Notifications"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                <span className="absolute top-1 right-1 w-4 h-4 bg-error text-on-error rounded-full flex items-center justify-center text-[10px] font-bold">
                  4
                </span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20 mb-2">
                    <span className="font-label-md text-label-md font-semibold text-primary">
                      Operations Notifications
                    </span>
                    <span className="text-[11px] font-mono text-outline">4 New</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-surface-container-low rounded">
                      <p className="font-semibold text-primary">New EU Tender RFQ received</p>
                      <p className="text-outline">Karolinska University Hospital (150x Metzenbaum)</p>
                    </div>
                    <div className="p-2 bg-surface-container-low rounded">
                      <p className="font-semibold text-primary">Batch #2025-VSP-719 Released</p>
                      <p className="text-outline">Passivation and Rockwell 54 HRC verified</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-[1px] bg-surface-container-highest"></div>

            {/* User Profile */}
            <div className="relative">
              <div
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-space-sm cursor-pointer select-none"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                    EV
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-2 ring-surface-container-lowest"></span>
                </div>
                <div className="hidden xl:flex flex-col text-left">
                  <span className="font-label-md text-label-md font-semibold text-on-surface leading-tight">
                    {displayName}
                  </span>
                  <span className="font-label-sm text-label-sm text-outline leading-tight">
                    Chief Operating Officer &amp; {displayRole}
                  </span>
                </div>
                <span className="hidden xl:inline-block font-label-sm text-label-sm px-space-xs py-0.5 bg-surface-container-high text-on-surface rounded font-semibold">
                  Admin
                </span>
                <span className="material-symbols-outlined text-outline text-[18px]">
                  expand_more
                </span>
              </div>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 py-2 z-50">
                  <div className="px-4 py-2 border-b border-outline-variant/20">
                    <p className="font-semibold text-sm text-primary">{displayName}</p>
                    <p className="text-xs text-outline truncate">{adminUser?.email}</p>
                  </div>
                  <Link
                    to="/"
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-on-surface hover:bg-surface-container"
                  >
                    <span className="material-symbols-outlined text-base">open_in_new</span>
                    View Public Storefront
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-error hover:bg-error-container/20"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex">
            <div className="w-72 bg-surface-container-low h-full flex flex-col justify-between p-4 shadow-2xl animate-fadeIn">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
                    </div>
                    <span className="font-bold text-primary">VANGUARD ADMIN</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded text-outline hover:text-primary"
                  >
                    ✕
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
                        isActive
                          ? "flex items-center gap-2 px-3 py-2 bg-primary-container text-on-primary font-semibold rounded-lg text-sm"
                          : "flex items-center gap-2 px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container text-sm"
                      }
                    >
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </nav>
              </div>

              <div className="pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-3 py-2 text-error text-sm font-semibold w-full"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Log Out
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
          </div>
        )}

        {/* Outlet Main Page Area */}
        <main className="w-full pt-16 bg-surface flex-1">
          <Outlet context={{ adminUser, globalSearch, setGlobalSearch }} />
        </main>
      </div>
    </div>
  );
};
