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
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "transition-colors py-space-sm text-primary font-bold font-label-lg text-label-lg"
      : "font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-space-sm";

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Utility Bar */}
      <div className="bg-primary-container text-on-primary py-space-xs">
        <div className="w-full px-gutter-desktop max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-space-xs text-label-technical font-label-technical">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-[14px] text-primary-fixed">
              precision_manufacturing
            </span>
            <span>
              Sialkot, Pakistan • Global Medical Device Manufacturing &amp; Export
            </span>
          </div>
          <div className="flex items-center gap-space-md">
            <a
              className="hover:text-primary-fixed transition-colors flex items-center gap-1"
              href="mailto:info@blueneedle.com"
            >
              <span className="material-symbols-outlined text-[14px]">mail</span>
              info@blueneedle.com
            </a>
            <span className="text-on-primary-container">|</span>
            <a
              className="hover:text-primary-fixed transition-colors flex items-center gap-1"
              href="tel:+92524589201"
            >
              <span className="material-symbols-outlined text-[14px]">call</span>
              +92 52 4589201
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="h-20 w-full px-margin md:px-gutter-desktop max-w-[1440px] mx-auto flex items-center justify-between">
        <Link className="flex items-center gap-space-md" to="/">
          <img
            alt="BLUENEEDLE Logo"
            className="h-8 w-auto object-contain"
            src={LOGO_URL}
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary">
              BLUENEEDLE
            </span>
            <span className="font-label-code text-label-code uppercase tracking-widest text-secondary">
              Surgical Instruments
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-space-lg">
          <NavLink className={navLinkClass} end to="/">
            Home
          </NavLink>

          <div className="group relative py-space-sm">
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-primary font-bold"
                    : "text-on-surface-variant hover:text-on-surface"
                } font-label-lg text-label-lg transition-colors flex items-center gap-1`
              }
              to="/products"
            >
              <span>Products</span>
              <span className="material-symbols-outlined text-[16px]">
                expand_more
              </span>
            </NavLink>

            {/* Mega Menu Dropdown */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[620px] bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_20px_40px_-8px_rgba(20,43,69,0.16)] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 mt-2 z-50">
              <div className="flex items-center justify-between pb-space-sm mb-space-sm bg-surface-container-low px-space-sm py-space-xs rounded-lg">
                <span className="font-label-technical text-label-technical uppercase tracking-wider text-secondary">
                  DIN/ISO Medical Standards
                </span>
                <span className="font-label-technical text-label-technical text-on-surface-variant">
                  Surgical Grade Martensitic Steel
                </span>
              </div>
              <div className="grid grid-cols-2 gap-space-sm">
                <Link
                  className="p-space-sm rounded-lg hover:bg-surface-container-low hover:text-on-surface transition-colors block"
                  to="/products?category=Surgical+Instruments"
                >
                  <div className="font-label-lg text-label-lg text-primary">
                    Surgical Instruments
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    General surgery, clamps &amp; retractors
                  </div>
                </Link>
                <Link
                  className="p-space-sm rounded-lg hover:bg-surface-container-low hover:text-on-surface transition-colors block"
                  to="/products?category=Dental+Instruments"
                >
                  <div className="font-label-lg text-label-lg text-primary">
                    Dental Instruments
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    Periodontal, extraction &amp; probe sets
                  </div>
                </Link>
                <Link
                  className="p-space-sm rounded-lg hover:bg-surface-container-low hover:text-on-surface transition-colors block"
                  to="/products?category=Orthopedic+Instruments"
                >
                  <div className="font-label-lg text-label-lg text-primary">
                    Orthopedic
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    Rongeurs, bone cutters &amp; osteotomes
                  </div>
                </Link>
                <Link
                  className="p-space-sm rounded-lg hover:bg-surface-container-low hover:text-on-surface transition-colors block"
                  to="/products?category=Ophthalmic+Instruments"
                >
                  <div className="font-label-lg text-label-lg text-primary">
                    Ophthalmic
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    Microsurgical forceps &amp; speculums
                  </div>
                </Link>
                <Link
                  className="p-space-sm rounded-lg hover:bg-surface-container-low hover:text-on-surface transition-colors block"
                  to="/products?category=Scissors+%26+Shears"
                >
                  <div className="font-label-lg text-label-lg text-primary">
                    Scissors &amp; Forceps
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    Tungsten carbide inserts &amp; SuperCut
                  </div>
                </Link>
                <Link
                  className="p-space-sm rounded-lg hover:bg-surface-container-low hover:text-on-surface transition-colors block"
                  to="/products?category=Needle+Holders"
                >
                  <div className="font-label-lg text-label-lg text-primary">
                    Needle Holders
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    Castroviejo, Mayo-Hegar &amp; Mathieu
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <NavLink className={navLinkClass} to="/about-us">
            About Us
          </NavLink>
          <button
            className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-space-sm"
            onClick={() => onOpenRfq("General B2B Contact & Export Inquiry")}
            type="button"
          >
            Contact
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-space-sm md:gap-space-md">
          {currentUser ? (
            <>
              {currentUser.role === "admin" && (
                <Link
                  className="hidden sm:inline-flex items-center gap-1 font-label-lg text-label-lg text-secondary hover:text-primary transition-colors px-space-sm py-space-xs"
                  to="/admin"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    admin_panel_settings
                  </span>
                  Admin
                </Link>
              )}
              <span
                className="hidden xl:inline-block font-label-technical text-label-technical text-on-surface-variant px-space-xs"
                title={currentUser.email}
              >
                {currentUser.fullName}
              </span>
              <button
                className="hidden sm:inline-block font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors px-space-sm py-space-xs"
                onClick={handleLogout}
                type="button"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                className="hidden sm:inline-block font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors px-space-sm py-space-xs"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="hidden xl:inline-block font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors px-space-sm py-space-xs"
                to="/create-account"
              >
                Create Account
              </Link>
            </>
          )}
          <button
            className="relative bg-primary-container text-on-primary hover:bg-primary transition-colors font-label-lg text-label-lg px-space-md py-space-sm rounded-lg tracking-wide uppercase shadow-[0_4px_12px_-2px_rgba(20,43,69,0.06)]"
            onClick={() => onOpenRfq()}
            type="button"
          >
            Request an Inquiry
            {manifestCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-label-code bg-tertiary-fixed text-primary rounded-full">
                {manifestCount}
              </span>
            )}
          </button>
          <Link
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-primary-container transition-colors shrink-0"
            title="Hospital Portal / Account Access"
            to="/login"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">
              person
            </span>
          </Link>
          <button
            aria-label="Toggle Menu"
            className="lg:hidden p-1.5 rounded bg-surface-container text-primary"
            onClick={() => setMobileMenuOpen((v) => !v)}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-t border-surface-container px-margin py-space-md flex flex-col gap-space-xs shadow-lg">
          <Link
            className="py-2 font-label-lg text-primary"
            onClick={() => setMobileMenuOpen(false)}
            to="/"
          >
            Home
          </Link>
          <Link
            className="py-2 font-label-lg text-primary"
            onClick={() => setMobileMenuOpen(false)}
            to="/products"
          >
            Products Catalogue
          </Link>
          <Link
            className="py-2 font-label-lg text-primary"
            onClick={() => setMobileMenuOpen(false)}
            to="/products/BN-SC-1021-TC"
          >
            Mayo Dissecting Scissors (Detail)
          </Link>
          <Link
            className="py-2 font-label-lg text-primary"
            onClick={() => setMobileMenuOpen(false)}
            to="/about-us"
          >
            About Us
          </Link>
          {currentUser ? (
            <>
              {currentUser.role === "admin" && (
                <Link
                  className="py-2 font-label-lg text-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                  to="/admin"
                >
                  Operations Admin Console
                </Link>
              )}
              <button
                className="py-2 font-label-lg text-primary text-left"
                onClick={handleLogout}
                type="button"
              >
                Sign Out ({currentUser.fullName})
              </button>
            </>
          ) : (
            <>
              <Link
                className="py-2 font-label-lg text-primary"
                onClick={() => setMobileMenuOpen(false)}
                to="/login"
              >
                Login
              </Link>
              <Link
                className="py-2 font-label-lg text-primary"
                onClick={() => setMobileMenuOpen(false)}
                to="/create-account"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};
