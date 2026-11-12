import React from "react";
import { Link } from "react-router-dom";
import { LOGO_URL } from "../data/catalog";

interface FooterProps {
  onOpenRfq?: (targetLabel?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRfq }) => {
  return (
    <footer className="w-full bg-[#1C2826] text-surface-container-high border-t border-outline-variant/20 pt-space-xxl pb-space-xl">
      <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl pb-space-xl border-b border-outline-variant/15">
          {/* Column 1: Brand & Provenance */}
          <div className="flex flex-col">
            <div className="flex items-center gap-space-sm mb-space-md">
              <img
                alt="Vanguard Surgical Instruments Logo"
                className="h-7 w-auto object-contain brightness-0 invert"
                src={LOGO_URL}
              />
              <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-surface-container-lowest font-semibold">
                Vanguard
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-surface-container mb-space-md leading-relaxed">
              Engineered to sub-micron mechanical tolerances. Precision-calibrated stainless steel and grade 5 titanium instrumentation supplying accredited hospital theaters globally.
            </p>
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider px-space-sm py-0.5 rounded border border-outline-variant/40 text-on-tertiary-container">
                ISO 13485:2016
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider px-space-sm py-0.5 rounded border border-outline-variant/40 text-on-tertiary-container">
                CE 0123
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider px-space-sm py-0.5 rounded border border-outline-variant/40 text-on-tertiary-container">
                FDA Class II
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <span className="font-label-md text-label-md uppercase tracking-wider text-surface-container-lowest mb-space-md font-semibold">
              Quick Links
            </span>
            <ul className="flex flex-col gap-space-sm font-body-sm text-body-sm text-surface-container">
              <li className="hover:text-surface-container-lowest transition-colors">
                <Link to="/about-us">Corporate Profile</Link>
              </li>
              <li className="hover:text-surface-container-lowest transition-colors">
                <a href="/#manufacturing">Sterile Facility Capabilities</a>
              </li>
              <li className="hover:text-surface-container-lowest transition-colors">
                <a href="/#quality-assurance">Metallurgical Compliance &amp; QA</a>
              </li>
              <li className="hover:text-surface-container-lowest transition-colors">
                <button
                  type="button"
                  onClick={() => onOpenRfq?.()}
                  className="text-left hover:text-surface-container-lowest transition-colors"
                >
                  Procurement Tender Portal
                </button>
              </li>
              <li className="hover:text-surface-container-lowest transition-colors">
                <a href="/#inquiry-section">OEM Technical Drawings</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Surgical Product Categories */}
          <div className="flex flex-col">
            <span className="font-label-md text-label-md uppercase tracking-wider text-surface-container-lowest mb-space-md font-semibold">
              Surgical Product Categories
            </span>
            <ul className="flex flex-col gap-space-sm font-body-sm text-body-sm text-surface-container">
              <li className="hover:text-surface-container-lowest transition-colors">
                <Link to="/products?discipline=General%20Surgery">Cardiovascular &amp; Thoracic</Link>
              </li>
              <li className="hover:text-surface-container-lowest transition-colors">
                <Link to="/products?discipline=Diagnostic%20%26%20Micro">Neurosurgery &amp; Micro-Dissection</Link>
              </li>
              <li className="hover:text-surface-container-lowest transition-colors">
                <Link to="/products?discipline=Orthopedic%20Suite">Orthopedic &amp; Bone Rongeurs</Link>
              </li>
              <li className="hover:text-surface-container-lowest transition-colors">
                <Link to="/products?discipline=Retractors%20%26%20Specula">Minimally Invasive Laparoscopy</Link>
              </li>
              <li className="hover:text-surface-container-lowest transition-colors">
                <Link to="/products?discipline=Scissors%20%26%20Cutting">Ophthalmic Fine Forceps</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Global HQ & Inquiries */}
          <div className="flex flex-col">
            <span className="font-label-md text-label-md uppercase tracking-wider text-surface-container-lowest mb-space-md font-semibold">
              Global Headquarters &amp; Inquiries
            </span>
            <div className="flex flex-col gap-space-sm font-body-sm text-body-sm text-surface-container leading-relaxed">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline-variant block mb-1">
                  Manufacturing &amp; Export Division
                </span>
                Vanguard Medical Tower, Level 14<br />
                Zurich Technology Park, CH-8005 Switzerland
              </div>
              <div className="mt-space-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline-variant block mb-1">
                  Direct Logistics
                </span>
                Tel: +41 44 892 4100<br />
                Email: export@vanguard-surgical.com
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md text-outline-variant font-label-md text-label-md">
          <div>
            © {new Date().getFullYear()} Vanguard Surgical Precision AG. All rights reserved. International Medical Device Directive compliant.
          </div>
          <div className="flex flex-wrap items-center gap-space-lg">
            <span>Customs Tariff Schedule: HS 9018.90</span>
            <span className="hover:text-surface-container-lowest cursor-pointer transition-colors">Terms of Supply</span>
            <span className="hover:text-surface-container-lowest cursor-pointer transition-colors">Sterilization Protocols</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
