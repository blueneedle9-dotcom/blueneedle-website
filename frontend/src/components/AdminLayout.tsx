import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { apiRequest } from '../lib/api';
import {
  AuthUser,
  clearAuth,
  getAuthHeader,
  getStoredAuth,
} from '../lib/auth';

export interface AdminOutletContext {
  adminUser: AuthUser | null;
  globalSearch: string;
  setGlobalSearch: React.Dispatch<React.SetStateAction<string>>;
}

export function useAdminContext() {
  return useOutletContext<AdminOutletContext>();
}

interface SidebarNavItem {
  to: string;
  label: string;
  icon: string;
  badge?: string;
  end?: boolean;
}

const SIDEBAR_NAV: SidebarNavItem[] = [
  { to: '/admin', label: 'Dashboard', icon: 'grid_view', end: true },
  { to: '/admin/products', label: 'Products', icon: 'inventory_2' },
  { to: '/admin/categories', label: 'Categories', icon: 'account_tree' },
  { to: '/admin/inquiries', label: 'Inquiries', icon: 'mail', badge: '12' },
  { to: '/admin/content', label: 'Website Content', icon: 'web' },
  { to: '/admin/profile', label: 'Admin Profile', icon: 'account_circle' },
  { to: '/admin/settings', label: 'Settings', icon: 'settings' },
];

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [guardState, setGuardState] = useState<
    'checking' | 'authorized' | 'forbidden'
  >('checking');
  const [adminUser, setAdminUser] = useState<AuthUser | null>(
    () => getStoredAuth()?.user || null
  );

  useEffect(() => {
    let active = true;
    const stored = getStoredAuth();

    if (!stored?.token) {
      navigate('/login?redirect=/admin', { replace: true });
      return;
    }

    apiRequest<{ user: AuthUser }>('/api/auth/me', {
      headers: getAuthHeader(),
    })
      .then((res) => {
        if (!active) return;
        setAdminUser(res.user);
        if (res.user.role === 'admin') {
          setGuardState('authorized');
        } else {
          setGuardState('forbidden');
        }
      })
      .catch(() => {
        if (!active) return;
        clearAuth();
        navigate('/login?redirect=/admin', { replace: true });
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSignOut = () => {
    clearAuth();
    navigate('/login', { replace: true });
  };

  if (guardState === 'checking') {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-space-lg">
        <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col items-center gap-3 text-center max-w-sm w-full">
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary animate-pulse">
            <span className="material-symbols-outlined text-[22px]">
              precision_manufacturing
            </span>
          </div>
          <p className="font-headline-sm text-headline-sm text-primary font-semibold">
            Verifying Executive Session
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Authenticating Blueneedle Catalog &amp; Content CMS clearance...
          </p>
        </div>
      </div>
    );
  }

  if (guardState === 'forbidden') {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-space-lg">
        <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col items-center gap-4 text-center max-w-md w-full">
          <div className="w-12 h-12 rounded-xl bg-error-container flex items-center justify-center text-on-error-container">
            <span className="material-symbols-outlined text-[26px]">
              gpp_maybe
            </span>
          </div>
          <div className="space-y-1">
            <span className="font-label-code text-label-code text-error uppercase tracking-wider font-semibold">
              403 • Restricted Administrative Gateway
            </span>
            <h1 className="font-headline-sm text-headline-sm text-primary font-bold">
              Administrator Privileges Required
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Signed in as <span className="font-semibold text-primary">{adminUser?.email}</span>{' '}
              (role: <span className="font-label-code">{adminUser?.role || 'buyer'}</span>).
              Only authorized Blueneedle administrators can access this console.
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg bg-surface-container-low text-secondary hover:bg-surface-container-high font-label-lg text-label-lg transition-colors"
            >
              Return to Storefront
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="px-4 py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-lg text-label-lg transition-colors"
            >
              Sign Out &amp; Switch Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  const displayName = adminUser?.fullName || 'Tariq Mehmood';
  const displayRole =
    adminUser?.email === 'admin123@gmail.com'
      ? 'Lead Catalog Admin'
      : adminUser?.email || 'Lead Catalog Admin';

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen">
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Fixed Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col overflow-y-auto">
          <div className="h-16 px-space-lg flex items-center justify-between bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] shrink-0">
            <Link
              to="/admin"
              className="flex items-center gap-space-sm"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-primary-fixed text-[20px]">
                  precision_manufacturing
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary font-bold tracking-tight uppercase leading-none">
                  BLUENEEDLE
                </span>
                <span className="font-label-technical text-label-technical text-secondary tracking-wider uppercase mt-1 leading-none">
                  CATALOG &amp; CONTENT CMS
                </span>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded text-on-surface-variant hover:bg-surface-container-high"
              aria-label="Close sidebar"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="px-space-md py-space-sm">
            <span className="font-label-code text-label-code text-on-surface-variant uppercase tracking-wider px-space-sm">
              Operations &amp; Catalog
            </span>
          </div>

          <nav className="flex flex-col gap-1 px-space-md">
            {SIDEBAR_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileSidebarOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center gap-space-sm px-space-sm py-2 rounded-lg transition-colors bg-primary-container text-on-primary font-semibold shadow-sm font-label-lg text-label-lg'
                    : 'flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg'
                }
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-code text-label-code">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-space-md flex flex-col gap-space-sm bg-surface-container-low shrink-0">
          <div className="flex items-center justify-between px-space-sm py-space-xs rounded bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="font-label-code text-label-code text-secondary font-medium">
                BLUENEEDLE v2.4
              </span>
            </div>
            <span className="font-label-technical text-label-technical text-on-surface-variant uppercase">
              LIVE
            </span>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors font-label-lg text-label-lg text-left"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Shell */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-md lg:px-space-lg">
          <div className="flex items-center gap-space-sm">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-primary hover:bg-surface-container-high transition-colors"
              aria-label="Open navigation"
            >
              <span className="material-symbols-outlined text-[22px]">menu</span>
            </button>
            <span className="font-label-technical text-label-technical text-secondary uppercase tracking-widest hidden sm:inline">
              SYSTEM CORE
            </span>
            <span className="font-label-md text-label-md text-outline hidden sm:inline">
              /
            </span>
            <span className="font-headline-sm text-headline-sm text-primary font-semibold tracking-tight">
              Admin Console
            </span>
          </div>

          <div className="flex-1 max-w-md mx-space-sm md:mx-space-lg">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-secondary text-[18px]">
                search
              </span>
              <input
                ref={searchInputRef}
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && globalSearch.trim()) {
                    navigate('/admin/products');
                  }
                }}
                className="w-full pl-9 pr-14 py-1.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary transition-all"
                placeholder="Search products, categories, inquiries..."
                type="text"
              />
              <kbd className="hidden sm:inline-block absolute right-3 px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-code text-label-code">
                Ctrl K
              </kbd>
            </div>
          </div>

          <div className="flex items-center gap-space-sm md:gap-space-md relative">
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-secondary hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-technical text-label-technical"
              title="View Live Storefront"
            >
              <span className="material-symbols-outlined text-[16px]">
                open_in_new
              </span>
              <span className="hidden sm:inline">Live Site</span>
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotificationsOpen((prev) => !prev);
                  setUserMenuOpen(false);
                }}
                className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
                aria-label="Notifications"
              >
                <span className="material-symbols-outlined text-[20px]">
                  notifications
                </span>
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-error text-on-error font-label-code text-[10px] leading-4 text-center font-bold">
                  3
                </span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/20 p-3 z-50 space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                    <span className="font-label-technical text-label-technical uppercase text-primary font-semibold">
                      System Alerts (3)
                    </span>
                    <button
                      type="button"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-on-surface-variant hover:text-primary font-label-code text-[11px]"
                    >
                      Close
                    </button>
                  </div>
                  <Link
                    to="/admin/inquiries"
                    onClick={() => setNotificationsOpen(false)}
                    className="block p-2 rounded-lg hover:bg-surface-container-low transition-colors"
                  >
                    <p className="font-label-lg text-label-lg text-primary font-semibold">
                      New RFQ: Charité Universitätsmedizin
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      350 Units DIN 1.4021 requested by Dr. Julian Vogel
                    </p>
                  </Link>
                  <Link
                    to="/admin/products"
                    onClick={() => setNotificationsOpen(false)}
                    className="block p-2 rounded-lg hover:bg-surface-container-low transition-colors"
                  >
                    <p className="font-label-lg text-label-lg text-primary font-semibold">
                      QA Review: Kerrison Bone Rongeur
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      BN-OR-6120 awaiting final metallurgy sign-off
                    </p>
                  </Link>
                  <Link
                    to="/admin/content"
                    onClick={() => setNotificationsOpen(false)}
                    className="block p-2 rounded-lg hover:bg-surface-container-low transition-colors"
                  >
                    <p className="font-label-lg text-label-lg text-primary font-semibold">
                      Website Sync Synchronized
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Cluster Frankfurt-04 index latency 24ms
                    </p>
                  </Link>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setUserMenuOpen((prev) => !prev);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-space-sm pl-space-sm rounded-lg hover:bg-surface-container-low py-1 pr-1.5 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-primary text-[18px]">
                    person
                  </span>
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold leading-tight">
                    {displayName}
                  </span>
                  <span className="font-label-technical text-label-technical text-secondary leading-tight">
                    {displayRole}
                  </span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                  arrow_drop_down
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/20 p-2 z-50 space-y-1">
                  <div className="px-3 py-2 border-b border-surface-container">
                    <p className="font-label-lg text-label-lg text-primary font-semibold truncate">
                      {displayName}
                    </p>
                    <p className="font-label-code text-[11px] text-secondary truncate">
                      {adminUser?.email}
                    </p>
                  </div>
                  <Link
                    to="/admin/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-primary font-body-sm text-body-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      account_circle
                    </span>
                    <span>Admin Profile</span>
                  </Link>
                  <Link
                    to="/admin/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-primary font-body-sm text-body-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      settings
                    </span>
                    <span>Security &amp; Settings</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-error hover:bg-error-container hover:text-on-error-container font-body-sm text-body-sm text-left"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      logout
                    </span>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="w-full pt-20 bg-surface flex-1 px-space-md lg:px-space-lg pb-space-lg">
          <Outlet
            context={{
              adminUser,
              globalSearch,
              setGlobalSearch,
            }}
          />
        </main>
      </div>
    </div>
  );
};
