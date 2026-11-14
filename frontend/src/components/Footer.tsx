import React from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  onOpenRfq?: (targetLabel?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRfq }) => {
  return (
    <footer className="w-full bg-[#eff4ff] mt-16 pt-16 pb-8 border-t border-[#e5eeff]">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#e5eeff]">
          {/* Col 1 & 2: Brand */}
          <div className="lg:col-span-2 space-y-4 pr-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#00274c] flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-xl">medical_services</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#00274c]">
                  BuleNeedle
                </span>
                <span className="text-[11px] text-[#006877] uppercase tracking-widest font-semibold">
                  Sialkot, Pakistan
                </span>
              </div>
            </div>

            <p className="text-sm text-[#43474f] max-w-sm leading-relaxed">
              Premier surgical instrumentation engineering and global hospital-grade exporter. Precision forged AISI 420/440 metallurgy compliant with international standards.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-1 bg-white text-[#00274c] text-xs font-semibold rounded-lg shadow-sm border border-[#e5eeff]">
                ISO 13485:2016
              </span>
              <span className="px-2.5 py-1 bg-white text-[#00274c] text-xs font-semibold rounded-lg shadow-sm border border-[#e5eeff]">
                CE Mark Certified
              </span>
              <span className="px-2.5 py-1 bg-white text-[#00274c] text-xs font-semibold rounded-lg shadow-sm border border-[#e5eeff]">
                FDA Registered
              </span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h3 className="text-xs text-[#00274c] uppercase tracking-wider font-bold mb-4">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm text-[#43474f]">
              <li>
                <Link to="/" className="hover:text-[#00274c] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#00274c] transition-colors">
                  About Us & Facility
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#00274c] transition-colors">
                  Instrument Catalog
                </Link>
              </li>
              <li>
                <button
                  onClick={() => onOpenRfq && onOpenRfq()}
                  className="hover:text-[#00274c] transition-colors text-left"
                >
                  Request Technical Quote
                </button>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#00274c] transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Instrument Lines */}
          <div>
            <h3 className="text-xs text-[#00274c] uppercase tracking-wider font-bold mb-4">
              Instrument Lines
            </h3>
            <ul className="space-y-2 text-sm text-[#43474f]">
              <li>
                <Link to="/products?discipline=Orthopedic" className="hover:text-[#00274c] transition-colors">
                  Orthopedic Instruments
                </Link>
              </li>
              <li>
                <Link to="/products?discipline=Dental" className="hover:text-[#00274c] transition-colors">
                  Dental Instruments
                </Link>
              </li>
              <li>
                <Link to="/products?discipline=Artery%20Forceps" className="hover:text-[#00274c] transition-colors">
                  Artery & Hemostatic Forceps
                </Link>
              </li>
              <li>
                <Link to="/products?discipline=Dissecting" className="hover:text-[#00274c] transition-colors">
                  Dressing & Dissecting Forceps
                </Link>
              </li>
              <li>
                <Link to="/products?discipline=Scissors" className="hover:text-[#00274c] transition-colors">
                  Surgical Scissors
                </Link>
              </li>
              <li>
                <Link to="/products?discipline=Needle%20Holders" className="hover:text-[#00274c] transition-colors">
                  Needle Holders & Kits
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Direct Inquiry */}
          <div>
            <h3 className="text-xs text-[#00274c] uppercase tracking-wider font-bold mb-4">
              Direct Inquiry
            </h3>
            <div className="space-y-3 text-sm text-[#43474f]">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#006877] text-base mt-0.5">mail</span>
                <a href="mailto:info@buleneedle.com" className="hover:text-[#00274c] transition-colors">
                  info@buleneedle.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#006877] text-base mt-0.5">call</span>
                <a
                  href="https://wa.me/923254163487"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00274c] transition-colors"
                >
                  +92 325 4163487
                </a>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#006877] text-base mt-0.5">location_on</span>
                <span>Khadim Ali Road Industrial Estate, Sialkot, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#43474f]">
          <p>© 2026 BuleNeedle Instruments Sialkot. All rights reserved. Hospital Procurement & OEM Exports.</p>
          <p className="text-[#006877] font-semibold">
            Manufactured in Sialkot • Certified German-Grade Tolerances
          </p>
        </div>
      </div>
    </footer>
  );
};
