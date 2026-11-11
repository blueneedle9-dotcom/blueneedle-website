import React from "react";
import { Link } from "react-router-dom";
import { LOGO_URL } from "../data/catalog";

interface FooterProps {
  onOpenRfq: (targetLabel?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRfq }) => {
  return (
    <footer className="w-full bg-primary-container text-on-primary">
      <div className="w-full px-gutter-desktop max-w-[1440px] mx-auto py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter-desktop">
          <div className="lg:col-span-2 pr-space-md">
            <div className="flex items-center gap-space-sm mb-space-sm">
              <img
                alt="BLUENEEDLE Logo"
                className="h-7 w-auto object-contain brightness-0 invert"
                src={LOGO_URL}
              />
              <span className="font-headline-sm text-headline-sm uppercase text-on-primary">
                BLUENEEDLE
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-primary-container mb-space-md leading-relaxed">
              Precision surgical instrument manufacturing &amp; export based in
              Sialkot, Pakistan. Engineered with certified European stainless
              steel alloys, conforming to international CE, ISO 13485, and cGMP
              compliance standards.
            </p>
            <div className="flex items-center gap-space-sm font-label-technical text-label-technical text-tertiary-fixed">
              <span className="material-symbols-outlined text-[16px]">
                verified
              </span>
              <span>ISO 13485:2016 Certified Facility</span>
            </div>
          </div>

          <div>
            <h4 className="font-label-lg text-label-lg text-on-primary uppercase tracking-wider mb-space-md">
              Product Categories
            </h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-primary-container">
              <li className="hover:text-on-primary transition-colors">
                <Link to="/products?category=Surgical+Instruments">
                  Surgical Instruments
                </Link>
              </li>
              <li className="hover:text-on-primary transition-colors">
                <Link to="/products?category=Dental+Instruments">
                  Dental Instruments
                </Link>
              </li>
              <li className="hover:text-on-primary transition-colors">
                <Link to="/products?category=Orthopedic+Instruments">
                  Orthopedic Implants &amp; Sets
                </Link>
              </li>
              <li className="hover:text-on-primary transition-colors">
                <Link to="/products?category=Ophthalmic+Instruments">
                  Ophthalmic Microsurgery
                </Link>
              </li>
              <li className="hover:text-on-primary transition-colors">
                <Link to="/products?category=Scissors+%26+Shears">
                  Scissors &amp; Micro Forceps
                </Link>
              </li>
              <li className="hover:text-on-primary transition-colors">
                <Link to="/products?category=Needle+Holders">
                  Tungsten Carbide Needle Holders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-label-lg text-label-lg text-on-primary uppercase tracking-wider mb-space-md">
              Quality &amp; OEM
            </h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-primary-container">
              <li className="hover:text-on-primary transition-colors">
                <Link to="/about-us#metallurgy">Metallurgical Standards</Link>
              </li>
              <li className="hover:text-on-primary transition-colors">
                <Link to="/about-us">Custom OEM Stamping</Link>
              </li>
              <li className="hover:text-on-primary transition-colors">
                <Link to="/about-us">Regulatory Certifications</Link>
              </li>
              <li className="hover:text-on-primary transition-colors">
                <Link to="/products/BN-SC-1021-TC">
                  Sterilization &amp; Passivation
                </Link>
              </li>
              <li className="hover:text-on-primary transition-colors">
                <Link to="/create-account">Hospital Procurement Terms</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-label-lg text-label-lg text-on-primary uppercase tracking-wider mb-space-md">
              Client Portal &amp; Export
            </h4>
            <div className="space-y-space-sm font-body-sm text-body-sm text-on-primary-container">
              <ul className="space-y-space-xs font-body-sm text-body-sm text-on-primary-container mb-space-sm">
                <li className="hover:text-on-primary transition-colors">
                  <Link to="/login">Distributor Sign In</Link>
                </li>
                <li className="hover:text-on-primary transition-colors">
                  <Link to="/create-account">Register Institutional Account</Link>
                </li>
                <li className="hover:text-on-primary transition-colors">
                  <Link to="/forgot-password">Reset Credentials</Link>
                </li>
                <li className="hover:text-on-primary transition-colors">
                  <Link to="/admin">Operations Admin Console</Link>
                </li>
              </ul>
              <p className="font-label-technical text-label-technical text-on-primary">
                info@blueneedle.com
                <br />
                +92 52 4589201
              </p>
              <button
                className="inline-block bg-primary text-on-primary font-label-technical text-label-technical px-space-md py-space-xs rounded uppercase hover:bg-surface-container-high hover:text-on-surface transition-colors mt-space-xs"
                onClick={() => onOpenRfq("Export RFQ Desk")}
                type="button"
              >
                Export RFQ Desk
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-primary py-space-sm">
        <div className="w-full px-gutter-desktop max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-space-sm font-label-technical text-label-technical text-on-primary-container">
          <span>
            © BLUENEEDLE Surgical Instruments. All specifications subject to
            international medical standards. No retail sales.
          </span>
          <span className="uppercase tracking-wider text-tertiary-fixed">
            B2B Institutional Export Gateway
          </span>
        </div>
      </div>
    </footer>
  );
};
