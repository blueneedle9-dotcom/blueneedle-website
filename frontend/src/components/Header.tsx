import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
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

export const Header: React.FC<HeaderProps> = ({ onOpenRfq }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
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

  useEffect(() => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileProductsOpen(false);
  }, [location.pathname, location.search]);

  const handleLogout = () => {
    clearAuth();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_1px_8px_rgba(15,61,108,0.06)] border-b border-outline-variant/30">
      <div className="h-20 max-w-[1360px] mx-auto px-gutter flex items-center justify-between gap-space-md">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-space-lg">
          <Link to="/" className="flex items-center gap-space-sm group">
            <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-headline-sm font-bold shadow-sm">
              <span className="material-symbols-outlined text-lg">medical_services</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">
                BuleNeedle
              </span>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
                Surgical Precision
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-space-md">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors py-space-sm font-label-lg text-label-lg ${
                  isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `transition-colors py-space-sm font-label-lg text-label-lg ${
                  isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
                }`
              }
            >
              About Us
            </NavLink>

            {/* Products Dropdown (2-Column Grid) */}
            <div className="relative group">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `transition-colors py-space-sm font-label-lg text-label-lg inline-flex items-center gap-1 ${
                    isActive ? "text-primary font-bold" : "text-on-surface-variant group-hover:text-primary"
                  }`
                }
              >
                <span>Products</span>
                <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">
                  expand_more
                </span>
              </NavLink>

              <div className="absolute left-0 top-full pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 w-[540px] z-50">
                <div className="bg-surface-container-lowest rounded-xl shadow-[0_8px_24px_-4px_rgba(15,61,108,0.12),0_2px_6px_-1px_rgba(0,155,176,0.08)] p-space-lg grid grid-cols-2 gap-space-md border border-outline-variant/40">
                  <div className="space-y-space-xs">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold block mb-1">
                      General &amp; Specialty
                    </span>
                    <Link
                      to="/products?category=general-surgery"
                      className="block px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors font-body-sm text-body-sm"
                    >
                      General Surgical
                    </Link>
                    <Link
                      to="/products?category=orthopedic"
                      className="block px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors font-body-sm text-body-sm"
                    >
                      Orthopedic Instruments
                    </Link>
                    <Link
                      to="/products?category=dental-maxillofacial"
                      className="block px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors font-body-sm text-body-sm"
                    >
                      Dental Instruments
                    </Link>
                    <Link
                      to="/products?category=surgical-kits"
                      className="block px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors font-body-sm text-body-sm"
                    >
                      Surgical Kits
                    </Link>
                    <Link
                      to="/products?category=needle-holders"
                      className="block px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors font-body-sm text-body-sm"
                    >
                      Needle Holders
                    </Link>
                  </div>

                  <div className="space-y-space-xs">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold block mb-1">
                      Forceps &amp; Cutting
                    </span>
                    <Link
                      to="/products?category=artery-forceps"
                      className="block px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors font-body-sm text-body-sm"
                    >
                      Artery Forceps
                    </Link>
                    <Link
                      to="/products?category=hemostatic-forceps"
                      className="block px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors font-body-sm text-body-sm"
                    >
                      Hemostatic Forceps
                    </Link>
                    <Link
                      to="/products?category=dressing-tissue"
                      className="block px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors font-body-sm text-body-sm"
                    >
                      Dressing &amp; Dissecting Forceps
                    </Link>
                    <Link
                      to="/products?category=scissors"
                      className="block px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors font-body-sm text-body-sm"
                    >
                      Surgical Scissors
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="/about-us#certifications"
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors py-space-sm"
            >
              Quality
            </a>

            <a
              href="/about-us#contact"
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors py-space-sm"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Right Action Icons & Buttons */}
        <div className="flex items-center gap-space-md">
          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/923254163487"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-space-xs font-label-md text-label-md text-secondary hover:text-on-secondary-container transition-colors py-space-xs"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            <span>+92 325 4163487</span>
          </a>

          {/* User Account / Admin Link */}
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-outline-variant/60 hover:bg-surface-container-low transition-colors text-primary font-label-md text-label-md"
              >
                <span className="material-symbols-outlined text-base">account_circle</span>
                <span className="hidden md:inline font-medium">
                  {currentUser.role === "admin" ? "Admin" : (currentUser.fullName || "User").split(" ")[0]}
                </span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/60 py-2 z-50">
                  <div className="px-4 py-2 border-b border-outline-variant/40">
                    <p className="text-xs font-semibold text-primary">{currentUser.fullName || "User"}</p>
                    <p className="text-[11px] text-on-surface-variant truncate">{currentUser.email}</p>
                  </div>
                  {currentUser.role === "admin" && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-xs text-primary hover:bg-surface-container-low transition-colors flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">dashboard</span>
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs text-error hover:bg-error-container/20 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">logout</span>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center gap-1 text-on-surface-variant hover:text-primary font-label-md text-label-md py-space-xs transition-colors"
            >
              <span className="material-symbols-outlined text-base">login</span>
              <span>Portal Login</span>
            </Link>
          )}

          {/* Request a Quote CTA */}
          <button
            type="button"
            onClick={() => onOpenRfq()}
            className="bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md px-space-md py-space-sm rounded-lg shadow-[0_1px_3px_rgba(15,61,108,0.08)] transition-all flex items-center gap-space-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">assignment_turned_in</span>
            <span>Request a Quote</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-primary hover:bg-surface-container-low transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-t border-outline-variant/40 px-gutter py-space-md space-y-3">
          <Link
            to="/"
            className="block py-2 font-label-lg text-primary font-bold"
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className="block py-2 font-label-lg text-on-surface-variant hover:text-primary"
          >
            About Us
          </Link>
          <div>
            <button
              type="button"
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="w-full flex items-center justify-between py-2 font-label-lg text-on-surface-variant hover:text-primary"
            >
              <span>Products</span>
              <span className="material-symbols-outlined text-sm">
                {mobileProductsOpen ? "expand_less" : "expand_more"}
              </span>
            </button>
            {mobileProductsOpen && (
              <div className="pl-4 space-y-1 py-1 border-l-2 border-secondary/40 my-1">
                <Link to="/products?category=general-surgery" className="block py-1 text-xs text-on-surface-variant">General Surgical</Link>
                <Link to="/products?category=orthopedic" className="block py-1 text-xs text-on-surface-variant">Orthopedic Instruments</Link>
                <Link to="/products?category=dental-maxillofacial" className="block py-1 text-xs text-on-surface-variant">Dental Instruments</Link>
                <Link to="/products?category=artery-forceps" className="block py-1 text-xs text-on-surface-variant">Artery Forceps</Link>
                <Link to="/products?category=hemostatic-forceps" className="block py-1 text-xs text-on-surface-variant">Hemostatic Forceps</Link>
                <Link to="/products?category=scissors" className="block py-1 text-xs text-on-surface-variant">Scissors</Link>
              </div>
            )}
          </div>
          <a
            href="/about-us#certifications"
            className="block py-2 font-label-lg text-on-surface-variant hover:text-primary"
          >
            Quality
          </a>
          <a
            href="/about-us#contact"
            className="block py-2 font-label-lg text-on-surface-variant hover:text-primary"
          >
            Contact
          </a>
          <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between">
            <a
              href="https://wa.me/923254163487"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-secondary flex items-center gap-1 font-semibold"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              +92 325 4163487
            </a>
            {!currentUser && (
              <Link to="/login" className="text-xs text-primary font-semibold">
                Portal Login →
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
