import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { apiRequest } from '../lib/api';
import {
  AuthUser,
  clearAuth,
  getAuthHeader,
  getStoredAuth,
} from '../lib/auth';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalLookup, setGlobalLookup] = useState('');
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

  const handleSignOut = () => {
    clearAuth();
    navigate('/login', { replace: true });
  };

  if (guardState === 'checking') {
    return (
      <div className="min-h-screen bg-surface text-on-surface flex items-center justify-center p-6">
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-6 py-5 flex items-center gap-3 shadow-sm">
          <span className="material-symbols-outlined text-secondary animate-spin text-[22px]">
            progress_activity
          </span>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            Verifying Operations Admin Session...
          </span>
        </div>
      </div>
    );
  }

  if (guardState === 'forbidden') {
    return (
      <div className="min-h-screen bg-surface text-on-surface flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-surface-container-lowest border border-red-300 rounded-lg p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2.5 text-red-700">
            <span className="material-symbols-outlined text-[24px]">gpp_bad</span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              403 // Admin Clearance Required
            </span>
          </div>
          <h1 className="font-headline text-2xl font-bold text-on-surface">
            Restricted Operations Area
          </h1>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Signed in as <span className="font-mono font-semibold">{adminUser?.email}</span>.
            Administrator privileges are required to access Sialkot Operations Command.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/"
              className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2.5 rounded text-xs font-semibold transition-colors"
            >
              Return to Portal Home
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="bg-surface-container-low hover:bg-surface-container border border-outline-variant/40 text-on-surface px-4 py-2.5 rounded text-xs font-semibold transition-colors"
            >
              Sign In with Admin Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'flex items-center gap-space-sm px-space-md py-2.5 transition-all bg-primary-container text-on-primary font-medium rounded-lg shadow-sm'
      : 'flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all';

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Left Fixed Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between select-none transition-transform duration-200 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col overflow-y-auto">
          <div className="h-16 px-space-md flex items-center justify-between bg-surface-container-lowest">
            <Link to="/admin" className="flex items-center gap-space-sm">
              <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">
                  precision_manufacturing
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm font-semibold tracking-tight text-primary leading-none">
                  BLUENEEDLE
                </span>
                <span className="font-label-code text-label-code uppercase tracking-wider text-secondary mt-0.5">
                  Sialkot Operations
                </span>
              </div>
            </Link>
            <span className="font-label-code text-label-code px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface font-medium">
              v4.2-MDR
            </span>
          </div>

          <div className="px-space-md py-space-sm bg-surface-container-low">
            <div className="flex items-center justify-between text-secondary mb-1">
              <span className="font-label-technical text-label-technical uppercase">
                Plant Facility
              </span>
              <span className="font-label-code text-label-code font-medium text-on-surface">
                SKT-FAC-01
              </span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-secondary-container ring-2 ring-primary-container animate-pulse" />
              <span className="font-label-technical text-label-technical text-on-surface">
                Zone A: Forging &amp; Forging Die Lab
              </span>
            </div>
          </div>

          <div className="px-space-md pt-space-md pb-space-xs">
            <span className="font-label-code text-label-code uppercase text-on-surface-variant tracking-wider font-semibold">
              Operations Command
            </span>
          </div>

          <nav className="flex flex-col gap-1 px-space-sm">
            <NavLink
              to="/admin"
              end
              className={navLinkClass}
              onClick={() => setMobileSidebarOpen(false)}
            >
              <span className="material-symbols-outlined text-[20px]">
                grid_view
              </span>
              <span className="font-label-lg text-label-lg">
                Dashboard &amp; Production
              </span>
            </NavLink>

            <NavLink
              to="/admin/patterns"
              className={navLinkClass}
              onClick={() => setMobileSidebarOpen(false)}
            >
              <span className="material-symbols-outlined text-[20px]">
                architecture
              </span>
              <span className="font-label-lg text-label-lg">
                Catalog &amp; DIN Patterns
              </span>
            </NavLink>

            <NavLink
              to="/admin/rfq"
              className={navLinkClass}
              onClick={() => setMobileSidebarOpen(false)}
            >
              <span className="material-symbols-outlined text-[20px]">
                request_quote
              </span>
              <span className="font-label-lg text-label-lg">
                RFQ &amp; Tender Matrix
              </span>
            </NavLink>

            <Link
              to="/admin#logistics"
              className="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <span className="material-symbols-outlined text-[20px]">
                local_shipping
              </span>
              <span className="font-label-lg text-label-lg">
                Export Logistics (SKT)
              </span>
            </Link>

            <NavLink
              to="/admin/qa"
              className={navLinkClass}
              onClick={() => setMobileSidebarOpen(false)}
            >
              <span className="material-symbols-outlined text-[20px]">
                verified
              </span>
              <span className="font-label-lg text-label-lg">
                QA &amp; ISO/MDR Heat Lots
              </span>
            </NavLink>
          </nav>

          <div className="px-space-md pt-space-lg pb-space-xs">
            <span className="font-label-code text-label-code uppercase text-on-surface-variant tracking-wider font-semibold">
              Administration
            </span>
          </div>

          <nav className="flex flex-col gap-1 px-space-sm">
            <Link
              to="/admin/qa#audit-vault"
              className="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <span className="material-symbols-outlined text-[20px]">
                admin_panel_settings
              </span>
              <span className="font-label-lg text-label-lg">
                Access &amp; Master Config
              </span>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-secondary hover:bg-surface-container-high hover:text-primary transition-all"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <span className="material-symbols-outlined text-[20px]">
                public
              </span>
              <span className="font-label-lg text-label-lg">
                Public Export Portal
              </span>
            </Link>
          </nav>
        </div>

        <div className="p-space-md bg-surface-container-low flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-technical text-label-technical text-secondary">
              Metallurgical Lab
            </span>
            <span className="font-label-code text-label-code px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface">
              AISI 420B / 440C
            </span>
          </div>
          <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-secondary h-full rounded-full"
              style={{ width: '88%' }}
            />
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
            <span>Vacuum Furnace Q3</span>
            <span className="font-semibold text-on-surface">
              54 HRC Calibrated
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-72">
        <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-space-md lg:px-space-lg flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm flex-1 max-w-xl">
            <button
              type="button"
              aria-label="Toggle Admin Navigation"
              onClick={() => setMobileSidebarOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded bg-surface-container-low text-primary"
            >
              <span className="material-symbols-outlined text-[20px]">
                menu
              </span>
            </button>
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                search
              </span>
              <input
                value={globalLookup}
                onChange={(e) => setGlobalLookup(e.target.value)}
                className="w-full h-10 pl-10 pr-space-md bg-surface-container-low rounded font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest"
                placeholder="Lookup DIN code, Tender RFQ, Heat Lot #, or SKU..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="hidden xl:flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container-low">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="font-label-technical text-label-technical text-on-surface font-medium">
                SAP ERP Sync:
              </span>
              <span className="font-label-code text-label-code text-secondary">
                Active (2m ago)
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container">
              <span className="material-symbols-outlined text-[18px] text-primary">
                schedule
              </span>
              <span className="font-label-technical text-label-technical text-on-surface font-semibold uppercase">
                Shift B (Evening)
              </span>
              <span className="font-label-code text-label-code text-on-surface-variant">
                | Crew: 142
              </span>
            </div>
            <button
              aria-label="Tender alerts"
              type="button"
              className="relative p-2 rounded hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">
                notifications
              </span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error" />
            </button>
            <div className="h-6 w-px bg-surface-container-high hidden sm:block" />
            <div className="flex items-center gap-space-sm pl-space-xs">
              <div className="hidden md:flex flex-col text-right">
                <span className="font-label-lg text-label-lg font-semibold text-on-surface leading-tight">
                  {adminUser?.fullName || 'BLUENEEDLE Admin'}
                </span>
                <span className="font-label-technical text-label-technical text-secondary">
                  {adminUser?.email || 'Operations Administrator'}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">
                  person
                </span>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                title="Sign Out"
                className="ml-1 px-2.5 py-1.5 rounded bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 text-[11px] font-mono font-semibold text-on-surface-variant hover:text-on-surface inline-flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">logout</span>
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        <main className="w-full pt-20 bg-surface min-h-screen px-space-md lg:px-space-lg pb-space-lg">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
