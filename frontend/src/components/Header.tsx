import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
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

interface ProductNavOption {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  count: string;
  badge?: string;
}

const PRODUCT_CATEGORIES: ProductNavOption[] = [
  {
    slug: "forceps",
    title: "Forceps & Clamps",
    subtitle: "Tissue, Hemostatic, Atraumatic & Bipolar",
    icon: "hardware",
    count: "312 Tools",
    badge: "Popular",
  },
  {
    slug: "dental",
    title: "Dental & Maxillofacial",
    subtitle: "Elevators, Extraction Forceps & Periodontal",
    icon: "dentistry",
    count: "164 Tools",
  },
  {
    slug: "orthopedic",
    title: "Orthopedic Suite",
    subtitle: "Bone Rongeurs, Osteotomes, Cutters & Saws",
    icon: "orthopedics",
    count: "215 Tools",
    badge: "DLC Coated",
  },
  {
    slug: "scissors",
    title: "Scissors & Cutting",
    subtitle: "Tungsten Carbide, SuperCut & Tenotomy",
    icon: "content_cut",
    count: "248 Tools",
  },
  {
    slug: "needle-holders",
    title: "Needle Holders",
    subtitle: "Castroviejo, Mayo-Hegar & Titanium TC Jaws",
    icon: "handyman",
    count: "156 Tools",
  },
  {
    slug: "retractors",
    title: "Retractors & Specula",
    subtitle: "Self-Retaining Weitlaner, Gelpi & Balfour",
    icon: "open_in_full",
    count: "190 Tools",
  },
];

export const Header: React.FC<HeaderProps> = ({ onOpenRfq, manifestCount }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<any>(null);

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

  // Close menus on route change
  useEffect(() => {
    setProductsDropdownOpen(false);
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

  const handleMouseEnterProducts = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setProductsDropdownOpen(true);
  };

  const handleMouseLeaveProducts = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 180);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "px-space-sm py-space-xs transition-colors bg-surface-container text-primary font-semibold rounded-lg font-label-lg text-label-lg"
      : "px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors";

  const isProductsActive = location.pathname.startsWith("/products");

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
        <nav className="hidden xl:flex items-center gap-space-md 2xl:gap-space-lg">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about-us" className={navLinkClass}>
            About Us
          </NavLink>

          {/* Products Dropdown Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnterProducts}
            onMouseLeave={handleMouseLeaveProducts}
          >
            <div className="flex items-center">
              <Link
                to="/products"
                className={`inline-flex items-center gap-1.5 px-space-sm py-space-xs font-label-lg text-label-lg rounded-lg transition-colors ${
                  isProductsActive
                    ? "bg-surface-container text-primary font-semibold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span>Products</span>
                <span
                  className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                    productsDropdownOpen ? "rotate-180 text-primary" : "text-outline"
                  }`}
                >
                  expand_more
                </span>
              </Link>
            </div>

            {/* Rich Mega Dropdown Menu */}
            {productsDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[620px] animate-fadeIn z-50">
                <div className="bg-surface-container-lowest rounded-xl shadow-2xl border border-surface-container-high overflow-hidden">
                  {/* Dropdown Header */}
                  <div className="bg-surface-container-low px-5 py-3 border-b border-surface-container-high flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        category
                      </span>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold text-primary">
                        Surgical Instrument Disciplines
                      </span>
                    </div>
                    <Link
                      to="/products"
                      className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>View All 1,840+ Instruments</span>
                      <span className="material-symbols-outlined text-[14px]">
                        arrow_forward
                      </span>
                    </Link>
                  </div>

                  {/* 2-Column Disciplines Grid */}
                  <div className="p-3 grid grid-cols-2 gap-2">
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/products?discipline=${encodeURIComponent(cat.slug)}`}
                        className="p-3 rounded-lg hover:bg-surface-container transition-all flex items-start gap-3 group text-left border border-transparent hover:border-surface-container-high"
                      >
                        <div className="w-10 h-10 rounded-lg bg-surface-container text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[20px]">
                            {cat.icon}
                          </span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-label-md text-label-md font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                              {cat.title}
                            </span>
                            {cat.badge && (
                              <span className="px-1.5 py-0.2 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[10px] font-semibold shrink-0">
                                {cat.badge}
                              </span>
                            )}
                          </div>
                          <span className="font-body-sm text-[12px] text-outline line-clamp-1">
                            {cat.subtitle}
                          </span>
                          <span className="font-label-sm text-[11px] text-primary/70 font-medium mt-0.5">
                            {cat.count}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Dropdown Bottom Banner */}
                  <div className="bg-primary px-5 py-3 text-on-primary flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      <span className="font-label-sm text-label-sm">
                        DIN EN ISO 13485:2016 Certified • 0.02 mm Cryogenic Machining
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenRfq()}
                      className="px-3 py-1 rounded bg-primary-container hover:bg-surface-container text-on-primary hover:text-primary font-label-sm text-label-sm font-semibold transition-colors"
                    >
                      Instant RFQ
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

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
                className="hidden md:inline-flex items-center gap-1.5 font-label-md text-label-md font-semibold text-primary px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  lock
                </span>
                <span>Portal Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
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
        <div className="xl:hidden bg-surface-container-lowest border-b border-outline-variant/30 px-gutter-mobile py-space-md shadow-lg animate-fadeIn max-h-[80vh] overflow-y-auto">
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

            {/* Mobile Products Accordion */}
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setMobileProductsOpen((prev) => !prev)}
                className="py-2 px-3 rounded hover:bg-surface-container text-on-surface flex items-center justify-between font-semibold"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">category</span>
                  <span>Products Catalog</span>
                </span>
                <span className={`material-symbols-outlined text-[18px] transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </button>

              {mobileProductsOpen && (
                <div className="pl-4 pr-1 py-1 flex flex-col gap-1 bg-surface-container-low rounded-lg my-1">
                  <Link
                    to="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-3 text-primary font-bold text-sm flex items-center justify-between"
                  >
                    <span>All Products</span>
                    <span className="text-xs text-outline">1,842+</span>
                  </Link>
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/products?discipline=${encodeURIComponent(cat.slug)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-1.5 px-3 text-on-surface hover:text-primary text-sm flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-outline">
                          {cat.icon}
                        </span>
                        {cat.title}
                      </span>
                      <span className="text-xs text-outline">{cat.count}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

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
                Request a Quote
              </button>

              {!currentUser && (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 rounded-lg border border-primary/30 text-primary font-semibold text-center"
                >
                  Portal Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
