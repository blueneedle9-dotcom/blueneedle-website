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

interface NavItem {
  to: string;
  label: string;
  icon: string;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/admin', label: 'Dashboard', icon: 'grid_view', end: true },
  { to: '/admin/products', label: 'Products', icon: 'inventory_2' },
  { to: '/admin/categories', label: 'Categories', icon: 'account_tree' },
  { to: '/admin/inquiries', label: 'Inquiries', icon: 'mail' },
  { to: '/admin/email', label: 'Email Sender', icon: 'outgoing_mail' },
  { to: '/admin/content', label: 'Website Content', icon: 'web' },
];

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col items-center gap-3 text-center max-w-sm w-full border border-surface-container-high">
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary animate-pulse">
            <span className="material-symbols-outlined text-[22px]">
              precision_manufacturing
            </span>
          </div>
          <p className="font-headline-sm text-headline-sm text-primary font-semibold">
            Verifying Regulatory Session
          </p>
          <p className="font-body-default text-body-default text-on-surface-variant">
            Authenticating BLUENEEDLE Enterprise clearance...
          </p>
        </div>
      </div>
    );
  }

  if (guardState === 'forbidden') {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-space-lg">
        <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col items-center gap-4 text-center max-w-md w-full border border-surface-container-high">
          <div className="w-12 h-12 rounded-xl bg-error-container flex items-center justify-center text-on-error-container">
            <span className="material-symbols-outlined text-[26px]">
              gpp_maybe
            </span>
          </div>
          <div className="space-y-1">
            <span className="font-caption-bold text-caption-bold text-error uppercase tracking-wider">
              403 • Restricted Administrative Gateway
            </span>
            <h1 className="font-headline-md text-headline-md text-primary font-bold">
              Administrator Privileges Required
            </h1>
            <p className="font-body-default text-body-default text-on-surface-variant">
              Signed in as <span className="font-semibold text-primary">{adminUser?.email}</span>{' '}
              (role: <span className="font-mono text-xs">{adminUser?.role || 'buyer'}</span>).
              Only authorized Blueneedle administrators can access the Enterprise Regulatory Suite.
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg bg-surface-container-low text-secondary hover:bg-surface-container-high font-button-text text-button-text transition-colors"
            >
              Return to Storefront
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="px-4 py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-button-text text-button-text transition-colors"
            >
              Sign Out &amp; Switch Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  const displayName = adminUser?.fullName || 'Tariq Mehmood';
  const displayRole = adminUser?.email === 'admin123@gmail.com' ? 'Lead Admin' : 'Catalog Admin';

  return (
    <div className="bg-surface font-body-default text-body-default text-on-surface antialiased min-h-screen flex flex-col">
      {/* Fixed Top Header (Enterprise Stitch Shell) */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest border-b border-surface-container-high shadow-sm">
        <div className="h-16 w-full px-gutter flex items-center justify-between gap-space-md">
          {/* Logo & Brand Badge */}
          <div className="flex items-center gap-space-md">
            <Link to="/admin" className="flex items-center gap-space-sm group">
              <img
                alt="BLUENEEDLE Enterprise Logo"
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida/ALJJyrBfr-0h63A1iLrMZjDtDesHKBCdcbC86pGjEJz38wgoghuXrahVoLBssWG3VJNucFOK4H2EVS5ZQl2ZaGr4npRk7wzrV90RcGYyJUBdDARjEsUF18aP-tJPCZE74vuAfIwR4cozcHQY-h2f8pG4MoYAcnMVR-BBsG1v-6tfzi--OQ23gtjve064sYDBI-9l8p-VNTVvmmTnQ-Z-1mYMIYYbL1A2rlVwlTQ8XQed2HV1"
              />
              <span className="px-space-xs py-0.5 rounded bg-primary-container text-on-primary font-caption-bold text-caption-bold tracking-wider">
                ADMIN
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-space-xs">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive
                    ? 'px-space-md py-space-sm transition-colors bg-surface-container text-primary font-body-strong rounded-lg flex items-center gap-1.5'
                    : 'px-space-md py-space-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors font-nav-label text-nav-label flex items-center gap-1.5'
                }
              >
                <span className="material-symbols-outlined text-[18px]">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right Header Action Tools */}
          <div className="flex items-center gap-space-sm sm:gap-space-md">
            {/* Quick Search */}
            <div className="hidden md:flex items-center h-9 px-space-md rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface-variant w-56 sm:w-64 justify-between focus-within:ring-1 focus-within:ring-primary focus-within:bg-surface-container-lowest transition-all">
              <span className="flex items-center gap-space-xs text-on-surface-variant font-caption text-caption">
                <span className="material-symbols-outlined text-base">search</span>
                <input
                  ref={searchInputRef}
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && globalSearch.trim()) {
                      navigate('/admin/products');
                    }
                  }}
                  placeholder="Quick Search..."
                  className="bg-transparent text-on-surface placeholder:text-on-surface-variant outline-none font-caption text-caption w-28 sm:w-36"
                />
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">
                ⌘K
              </span>
            </div>

            {/* Live Storefront Link */}
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors hidden sm:flex items-center justify-center"
              title="Open Public Storefront"
            >
              <span className="material-symbols-outlined text-xl">open_in_new</span>
            </Link>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen((prev) => !prev)}
                className="relative p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors flex items-center justify-center"
                aria-label="Notifications"
              >
                <span className="material-symbols-outlined text-xl">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error animate-pulse"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-xl shadow-lg border border-surface-container-high py-2 z-50">
                  <div className="px-4 py-2 border-b border-surface-container-high flex items-center justify-between">
                    <span className="font-caption-bold text-caption-bold text-primary">
                      Unread Procurement Inquiries
                    </span>
                    <Link
                      to="/admin/inquiries"
                      onClick={() => setNotificationsOpen(false)}
                      className="font-caption text-caption text-secondary hover:underline"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="divide-y divide-surface-container-high max-h-64 overflow-y-auto">
                    <Link
                      to="/admin/inquiries"
                      onClick={() => setNotificationsOpen(false)}
                      className="block px-4 py-2.5 hover:bg-surface-container-low transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-body-strong text-body-strong text-primary text-xs">
                          Dr. Julian Vogel (Charité)
                        </span>
                        <span className="font-caption text-[10px] text-on-surface-variant">
                          Just now
                        </span>
                      </div>
                      <p className="font-caption text-caption text-secondary truncate mt-0.5">
                        Urgent quotation requested: 1,200x TC Mayo Scissors
                      </p>
                    </Link>
                    <Link
                      to="/admin/inquiries"
                      onClick={() => setNotificationsOpen(false)}
                      className="block px-4 py-2.5 hover:bg-surface-container-low transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-body-strong text-body-strong text-primary text-xs">
                          NHS Procurement Lead
                        </span>
                        <span className="font-caption text-[10px] text-on-surface-variant">
                          2h ago
                        </span>
                      </div>
                      <p className="font-caption text-caption text-secondary truncate mt-0.5">
                        Titanium Micro-Forceps Tender Batch
                      </p>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Settings Gear */}
            <Link
              to="/admin/settings"
              className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors hidden sm:flex items-center justify-center"
              title="System Settings"
            >
              <span className="material-symbols-outlined text-xl">settings</span>
            </Link>

            <div className="h-6 w-px bg-surface-container-high hidden sm:block"></div>

            {/* User Profile Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-space-sm pl-space-xs hover:opacity-90 transition-opacity"
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border border-surface-container-high"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbbw9yUJ3V2_k9pAGJPxKgRdIwcwVPlY4kTQYXhZ5Z1PSIo_V2oiy6orS0uf_msoukCgNil4KewoquCBTVMljzspQXOclPv-yCWTb6ni36vNaZlXC1v1m_Vh1iDh4f2-HBgzsasj4VopONqpLnZ2kj10WdxZUVqLL1phwnyRzXfs-BB9hgKVQRKhoT3UaBxaazJx2BvekUvdbgGcMDxctIghObnC60QyUwDJ5CX9c"
                />
                <div className="hidden lg:flex flex-col text-left">
                  <span className="font-button-text text-button-text text-on-surface leading-tight">
                    {displayName}
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    {displayRole}
                  </span>
                </div>
                <span className="material-symbols-outlined text-base text-on-surface-variant">
                  keyboard_arrow_down
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-lg border border-surface-container-high py-2 z-50">
                  <div className="px-4 py-2 border-b border-surface-container-high">
                    <p className="font-body-strong text-body-strong text-primary text-sm truncate">
                      {displayName}
                    </p>
                    <p className="font-caption text-caption text-on-surface-variant truncate">
                      {adminUser?.email || 'admin@blueneedle.com'}
                    </p>
                  </div>
                  <Link
                    to="/admin/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-on-surface hover:bg-surface-container-low transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary">
                      settings
                    </span>
                    <span>Admin Settings</span>
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-on-surface hover:bg-surface-container-low transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary">
                      public
                    </span>
                    <span>Live Storefront</span>
                  </Link>
                  <div className="border-t border-surface-container-high my-1"></div>
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      handleSignOut();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-error hover:bg-error-container/20 transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      logout
                    </span>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="xl:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-surface-container-high bg-surface-container-lowest px-gutter py-space-md shadow-lg flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'px-space-md py-space-sm bg-surface-container text-primary font-body-strong rounded-lg flex items-center gap-2'
                    : 'px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container-low rounded-lg flex items-center gap-2 font-nav-label text-nav-label'
                }
              >
                <span className="material-symbols-outlined text-lg">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            ))}
            <div className="border-t border-surface-container-high pt-2 mt-2 flex flex-col gap-1">
              <Link
                to="/admin/settings"
                onClick={() => setMobileMenuOpen(false)}
                className="px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container-low rounded-lg flex items-center gap-2 text-sm"
              >
                <span className="material-symbols-outlined text-lg">settings</span>
                <span>Settings</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="px-space-md py-space-sm text-error hover:bg-error-container/20 rounded-lg flex items-center gap-2 text-sm text-left"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="w-full pt-16 bg-surface min-h-[calc(100vh-64px)] flex-1">
        <Outlet context={{ adminUser, globalSearch, setGlobalSearch }} />
      </main>

      {/* Enterprise Footer */}
      <footer className="w-full bg-surface-container-lowest border-t border-surface-container-high py-space-md">
        <div className="w-full px-gutter flex flex-col sm:flex-row items-center justify-between text-on-surface-variant font-caption text-caption gap-space-xs">
          <span>© 2025 BLUENEEDLE Surgical Instruments. Enterprise Regulatory Suite.</span>
          <div className="flex items-center gap-space-md">
            <span className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              System Operational
            </span>
            <span>v4.12.0-reg</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
