import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LOGO_URL } from "../data/catalog";
import {
  AUTH_CHANGE_EVENT,
  AuthUser,
  clearAuth,
  getStoredAuth,
} from "../lib/auth";

interface HeaderProps {
  onOpenRfq: (targetLabel?: string) => void;
  manifestCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenRfq, manifestCount }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(
    () => getStoredAuth()?.user || null
  );

  useEffect(() => {
    const syncAuth = () => {
      setCurrentUser(getStoredAuth()?.user || null);
    };
    window.addEventListener(AUTH_CHANGE_EVENT, syncAuth);
    window.addEventListener("storage", syncAuth);
    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const handleLogout = () => {
    clearAuth();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "px-space-sm py-space-xs transition-colors bg-surface-container text-primary font-semibold rounded-lg font-label-lg text-label-lg"
      : "px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors";

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-md border-b border-[#E5E8E5] transition-colors">
      <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-margin h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-space-md group">
          <img
            alt="Vanguard Surgical Instruments Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src={LOGO_URL}
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary leading-none font-semibold">
              Vanguard Surgical
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline mt-0.5">
              Precision Instrumentation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-space-lg">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about-us" className={navLinkClass}>
            About Us
          </NavLink>
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
          <a
            href="/#manufacturing"
            className="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Manufacturing
          </a>
          <a
            href="/#quality-assurance"
            className="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Quality Assurance
          </a>
          <a
            href="/#inquiry-section"
            className="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Contact Us
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-space-md">
          {/* RFQ Quote Button */}
          <button
            type="button"
            onClick={() => onOpenRfq()}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 bg-primary-container text-on-primary font-label-lg text-label-lg px-space-lg py-space-sm rounded-lg hover:brightness-110 active:brightness-95 transition-all shadow-sm"
          >
            <span>Request a Quote</span>
            {manifestCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold flex items-center justify-center ml-1">
                {manifestCount}
              </span>
            )}
          </button>

          {/* User Account / Admin Menu */}
          <div className="relative">
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center hover:opacity-90 transition-opacity font-semibold text-sm"
                  title={currentUser.email}
                >
                  {currentUser.fullName
                    ? currentUser.fullName.charAt(0).toUpperCase()
                    : currentUser.email.charAt(0).toUpperCase()}
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 py-2 z-50">
                    <div className="px-4 py-2 border-b border-outline-variant/20">
                      <p className="font-label-md text-label-md font-semibold text-primary truncate">
                        {currentUser.fullName || currentUser.email}
                      </p>
                      <p className="font-label-sm text-label-sm text-outline truncate">
                        {currentUser.email}
                      </p>
                      <span className="inline-block mt-1 font-label-sm text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-primary-fixed text-primary">
                        {currentUser.role}
                      </span>
                    </div>

                    {currentUser.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-on-surface hover:bg-surface-container font-label-md text-label-md transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px] text-primary">
                          admin_panel_settings
                        </span>
                        Admin Operations Portal
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-error hover:bg-error-container/20 font-label-md text-label-md transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        logout
                      </span>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0 hover:brightness-110 transition-all text-on-primary"
                title="Client & Staff Portal Login"
              >
                <span className="material-symbols-outlined text-[18px]">
                  person
                </span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="xl:hidden p-2 rounded-lg text-primary hover:bg-surface-container transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest border-b border-outline-variant/30 px-gutter-mobile py-space-md shadow-lg animate-fadeIn">
          <nav className="flex flex-col gap-space-xs font-label-lg text-label-lg">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-surface-container text-on-surface"
            >
              Home
            </Link>
            <Link
              to="/about-us"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-surface-container text-on-surface"
            >
              About Us
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-surface-container text-on-surface"
            >
              Products Catalog
            </Link>
            <a
              href="/#manufacturing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-surface-container text-on-surface"
            >
              Manufacturing
            </a>
            <a
              href="/#quality-assurance"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-surface-container text-on-surface"
            >
              Quality Assurance
            </a>
            <a
              href="/#inquiry-section"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-surface-container text-on-surface"
            >
              Contact Us
            </a>

            <div className="pt-space-sm border-t border-outline-variant/20 flex flex-col gap-space-sm mt-space-xs">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRfq();
                }}
                className="w-full py-2.5 rounded-lg bg-primary-container text-on-primary font-semibold text-center"
              >
                Request a Quote ({manifestCount})
              </button>
              {currentUser?.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 rounded-lg bg-surface-container text-primary font-semibold text-center"
                >
                  Go to Admin Portal
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
