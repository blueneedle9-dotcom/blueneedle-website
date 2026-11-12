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
}

const PRODUCT_CATEGORIES: ProductNavOption[] = [
  {
    slug: "forceps",
    title: "Forceps & Clamps",
    subtitle: "Tissue, Hemostatic & Atraumatic",
    icon: "hardware",
  },
  {
    slug: "dental",
    title: "Dental & Maxillofacial",
    subtitle: "Elevators & Extraction Forceps",
    icon: "dentistry",
  },
  {
    slug: "orthopedic",
    title: "Orthopedic Suite",
    subtitle: "Bone Rongeurs & Osteotomes",
    icon: "orthopedics",
  },
  {
    slug: "scissors",
    title: "Scissors & Cutting",
    subtitle: "TC & SuperCut Dissection",
    icon: "content_cut",
  },
  {
    slug: "needle-holders",
    title: "Needle Holders",
    subtitle: "Castroviejo & Mayo-Hegar TC",
    icon: "handyman",
  },
  {
    slug: "retractors",
    title: "Retractors & Specula",
    subtitle: "Self-Retaining Frame Systems",
    icon: "open_in_full",
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
    `whitespace-nowrap px-2.5 py-1.5 text-[14px] font-medium transition-colors ${
      isActive
        ? "text-primary font-semibold"
        : "text-on-surface-variant hover:text-primary"
    }`;

  const isProductsActive = location.pathname.startsWith("/products");

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E8E5] transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <img
            alt="Vanguard Surgical Instruments Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src={LOGO_URL}
          />
          <div className="flex flex-col whitespace-nowrap">
            <span className="font-headline-sm text-[17px] uppercase tracking-tight text-primary leading-none font-bold">
              Vanguard Surgical
            </span>
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-outline mt-0.5">
              Precision Instrumentation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links - Single Straight Line */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 whitespace-nowrap">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about-us" className={navLinkClass}>
            About Us
          </NavLink>

          {/* Products Dropdown Menu Trigger - Clean with NO background color, only icon */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnterProducts}
            onMouseLeave={handleMouseLeaveProducts}
          >
            <Link
              to="/products"
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-[14px] font-medium whitespace-nowrap transition-colors ${
                isProductsActive
                  ? "text-primary font-semibold"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              <span>Products</span>
              <span
                className={`material-symbols-outlined text-[16px] transition-transform duration-150 ${
                  productsDropdownOpen ? "rotate-180 text-primary" : "text-outline"
                }`}
              >
                expand_more
              </span>
            </Link>

            {/* Plain & Decent Dropdown Menu */}
            {productsDropdownOpen && (
              <div className="absolute top-full left-0 pt-2 w-72 animate-fadeIn z-50">
                <div className="bg-white rounded-lg shadow-lg border border-[#E5E8E5] py-2 overflow-hidden">
                  <div className="px-3 pb-1.5 mb-1 border-b border-[#F0F2F0] flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                      Categories
                    </span>
                    <Link
                      to="/products"
                      className="text-[11px] font-semibold text-primary hover:underline"
                    >
                      All Instruments
                    </Link>
                  </div>

                  <div className="flex flex-col">
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/products?discipline=${encodeURIComponent(cat.slug)}`}
                        className="px-3 py-2 hover:bg-[#F5F8F6] transition-colors flex items-center gap-2.5 group text-left"
                      >
                        <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-primary transition-colors shrink-0">
                          {cat.icon}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[13px] font-medium text-on-surface group-hover:text-primary transition-colors truncate">
                            {cat.title}
                          </span>
                          <span className="text-[11px] text-outline truncate">
                            {cat.subtitle}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-1 pt-1 border-t border-[#F0F2F0] px-3 py-1">
                    <Link
                      to="/products"
                      className="text-[12px] font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                      <span>Explore Complete Catalogue</span>
                      <span className="material-symbols-outlined text-[13px]">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a
            href="/#manufacturing"
            className="whitespace-nowrap px-2.5 py-1.5 text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors"
          >
            Manufacturing
          </a>
          <a
            href="/#quality-assurance"
            className="whitespace-nowrap px-2.5 py-1.5 text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors"
          >
            Quality Assurance
          </a>
          <a
            href="/#inquiry-section"
            className="whitespace-nowrap px-2.5 py-1.5 text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors"
          >
            Contact Us
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* RFQ Quote Button */}
          <button
            type="button"
            onClick={() => onOpenRfq()}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 bg-primary-container text-on-primary text-[14px] font-medium px-4 py-2 rounded-lg hover:brightness-110 active:brightness-95 transition-all shadow-sm whitespace-nowrap"
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
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-[#E5E8E5] py-2 z-50">
                    <div className="px-4 py-2 border-b border-[#F0F2F0]">
                      <p className="text-[13px] font-semibold text-primary truncate">
                        {currentUser.fullName || currentUser.email}
                      </p>
                      <p className="text-[11px] text-outline truncate">
                        {currentUser.email}
                      </p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-primary-fixed text-primary">
                        {currentUser.role}
                      </span>
                    </div>

                    {currentUser.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-on-surface hover:bg-[#F5F8F6] text-[13px] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          admin_panel_settings
                        </span>
                        Admin Operations Portal
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-error hover:bg-error-container/20 text-[13px] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">
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
                className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-[#F5F8F6] transition-colors whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-[16px]">
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
            className="lg:hidden p-2 rounded-lg text-primary hover:bg-[#F5F8F6] transition-colors"
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
        <div className="lg:hidden bg-white border-b border-[#E5E8E5] px-4 py-3 shadow-lg animate-fadeIn max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col gap-1 text-[14px]">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#F5F8F6] text-on-surface font-medium"
            >
              Home
            </Link>
            <Link
              to="/about-us"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#F5F8F6] text-on-surface font-medium"
            >
              About Us
            </Link>

            {/* Mobile Products Accordion */}
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setMobileProductsOpen((prev) => !prev)}
                className="py-2 px-3 rounded hover:bg-[#F5F8F6] text-on-surface flex items-center justify-between font-medium"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">category</span>
                  <span>Products</span>
                </span>
                <span className={`material-symbols-outlined text-[18px] transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </button>

              {mobileProductsOpen && (
                <div className="pl-4 pr-1 py-1 flex flex-col gap-0.5 bg-[#F5F8F6] rounded-lg my-1">
                  <Link
                    to="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 px-3 text-primary font-bold text-sm"
                  >
                    All Products (1,840+)
                  </Link>
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/products?discipline=${encodeURIComponent(cat.slug)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-1.5 px-3 text-on-surface hover:text-primary text-sm flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[16px] text-outline">
                        {cat.icon}
                      </span>
                      {cat.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/#manufacturing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#F5F8F6] text-on-surface font-medium"
            >
              Manufacturing
            </a>
            <a
              href="/#quality-assurance"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#F5F8F6] text-on-surface font-medium"
            >
              Quality Assurance
            </a>
            <a
              href="/#inquiry-section"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#F5F8F6] text-on-surface font-medium"
            >
              Contact Us
            </a>

            <div className="pt-2 border-t border-[#E5E8E5] flex flex-col gap-2 mt-1">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRfq();
                }}
                className="w-full py-2.5 rounded-lg bg-primary-container text-on-primary font-semibold text-center text-sm"
              >
                Request a Quote
              </button>

              {!currentUser && (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 rounded-lg border border-primary/30 text-primary font-semibold text-center text-sm"
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
