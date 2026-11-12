import React from "react";
import { Link } from "react-router-dom";
import {
  VANGUARD_DISCIPLINES,
  VANGUARD_FLAGSHIPS,
} from "../data/catalog";

interface HomePageProps {
  onOpenRfq: (targetLabel?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenRfq }) => {
  return (
    <div className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
      <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-margin py-space-lg">
        <div className="flex flex-col w-full">
          {/* ==========================================
              1. HERO SECTION
              ========================================== */}
          <section className="relative w-full py-space-xl lg:py-space-xxl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
              {/* Left Content */}
              <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-space-lg">
                {/* Technical Accreditation Pill */}
                <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface-variant mb-space-lg">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-semibold">
                    German Stainless Steel • ISO 13485:2016 Certified
                  </span>
                </div>

                <h1 className="font-headline-xl text-headline-xl text-primary font-semibold tracking-tight leading-tight mb-space-md">
                  Precision in Every Instrument.{" "}
                  <br className="hidden sm:inline" />
                  <span className="text-on-surface-variant font-normal">
                    Excellence in Every Detail.
                  </span>
                </h1>

                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-space-xl leading-relaxed">
                  We specialize in engineering and supplying surgical instrumentation to international teaching hospitals, specialty clinics, and accredited healthcare networks. Combining calibrated German metallurgy, master hand-finishing, and micron-level mechanical tolerances.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-space-md w-full sm:w-auto">
                  <Link
                    to="/products"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm hover:brightness-110 active:brightness-95 transition-all"
                  >
                    <span>Explore Our Products</span>
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_downward
                    </span>
                  </Link>
                  <a
                    href="#inquiry-section"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md bg-surface-container-lowest text-primary font-label-lg text-label-lg rounded-lg border border-primary-container/20 hover:bg-surface-container transition-all"
                  >
                    <span>Contact Export Division</span>
                    <span className="material-symbols-outlined text-[18px]">
                      north_east
                    </span>
                  </a>
                </div>

                {/* Technical Assurance Metrics */}
                <div className="grid grid-cols-3 gap-space-md mt-space-xxl pt-space-lg border-t border-outline-variant/30 w-full max-w-xl">
                  <div>
                    <span className="font-headline-sm text-headline-sm text-primary font-semibold block leading-tight">
                      0.02<span className="font-label-md text-label-md text-outline">mm</span>
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mt-0.5">
                      Tolerance Spec
                    </span>
                  </div>
                  <div>
                    <span className="font-headline-sm text-headline-sm text-primary font-semibold block leading-tight">
                      DIN EN
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mt-0.5">
                      1.4021 Metallurgy
                    </span>
                  </div>
                  <div>
                    <span className="font-headline-sm text-headline-sm text-primary font-semibold block leading-tight">
                      40+
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mt-0.5">
                      Export Countries
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Visual Showcase */}
              <div className="lg:col-span-5 relative">
                <div className="relative bg-surface-container-low rounded-xl overflow-hidden shadow-xl border border-outline-variant/20 p-2 sm:p-3">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-dim">
                    <img
                      className="w-full h-full object-cover"
                      alt="Surgical instruments arranged on sterile clinical stone surface"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcTi7E7Tf2pgTpj4eKw7ioxkK5TXZvn8kBlMABj9mXEufZntQHGu4nMajhX7eOk7Tf2UVjYH__jzm3VyHQhfQxsD5koWgeUQujuigtoMK-zdp_T08cYwmMB_4udgYpGdwkfUJkk5F3ApxzFFBBHHYo6jp5_m1qiXWMHYrT29tjZX9oLHqtclUzxsqh-YAtuIXO-IfKT35o9mnqPx_HZg9tx04rgRFHC6DCwklLm3G8"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/95 backdrop-blur-md p-space-md rounded-lg shadow-md border border-outline-variant/30">
                      <div className="flex items-center justify-between gap-space-sm mb-1">
                        <span className="font-label-md text-label-md font-semibold text-primary uppercase tracking-wider">
                          Calibration Baseline
                        </span>
                        <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-primary-container text-on-primary">
                          AISI 420 / 440
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
                        <span>Hardness: 50–54 HRC Rockwell</span>
                        <span className="font-mono text-[12px] font-medium text-outline">
                          Lot #2025-VSP-719
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Architectural Engineering Stamp */}
                <div className="hidden sm:flex absolute -top-4 -right-4 bg-surface-container-lowest px-4 py-3 rounded-lg shadow-md border border-outline-variant/30 items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[28px]">
                    verified
                  </span>
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">
                      Sterile Release
                    </span>
                    <span className="font-label-md text-label-md font-semibold text-primary">
                      Class IIa EU-MDR
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==========================================
              2. COMPANY INTRODUCTION (ABOUT US PREVIEW)
              ========================================== */}
          <section className="w-full py-space-xxl my-space-lg rounded-xl bg-surface-container-low border border-outline-variant/20 px-space-md lg:px-space-xl">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
                <div className="lg:col-span-7 flex flex-col items-start">
                  <span className="font-label-md text-label-md uppercase tracking-widest text-on-tertiary-container font-semibold mb-space-sm">
                    Corporate Heritage &amp; Precision Craft
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight mb-space-md leading-tight">
                    Committed to Precision.<br />
                    Built on Three Decades of Clinical Trust.
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
                    Founded with an uncompromising metallurgical philosophy, Vanguard Surgical Precision AG designs, produces, and supplies precision instruments that meet the stringent anatomical challenges of modern operating theaters. From cardiovascular micro-scissors to heavy orthopedic bone rongeurs, each tool represents an exact fusion of computer-calibrated machining and senior artisan benchwork.
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-xl leading-relaxed">
                    Headquartered in Switzerland with ISO 13485-certified specialized forge and cleanroom packaging facilities, we partner with hospital procurement councils, medical technology OEMs, and national tenders across 40+ countries.
                  </p>
                  <Link
                    to="/about-us"
                    className="inline-flex items-center gap-space-sm font-label-lg text-label-lg font-semibold text-primary hover:text-primary-container transition-colors group"
                  >
                    <span>Discover Our Corporate History &amp; Cleanroom Standards</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-space-md">
                  <div className="p-space-lg rounded-lg bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
                    <div className="flex items-center justify-between mb-space-xs">
                      <span className="font-headline-md text-headline-md text-primary font-semibold">
                        35+ Years
                      </span>
                      <span className="material-symbols-outlined text-outline">
                        history_edu
                      </span>
                    </div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface uppercase tracking-wider block mb-1">
                      Metallurgical Provenance
                    </span>
                    <p className="font-body-sm text-body-sm text-outline">
                      Three decades refining cryogenic tempering, vacuum hardening, and ultrasonic passivation techniques.
                    </p>
                  </div>

                  <div className="p-space-lg rounded-lg bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
                    <div className="flex items-center justify-between mb-space-xs">
                      <span className="font-headline-md text-headline-md text-primary font-semibold">
                        1,800+ SKUs
                      </span>
                      <span className="material-symbols-outlined text-outline">
                        inventory_2
                      </span>
                    </div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface uppercase tracking-wider block mb-1">
                      Cataloged Surgical Instruments
                    </span>
                    <p className="font-body-sm text-body-sm text-outline">
                      Active tooling covers cardiovascular, orthopedic, microsurgery, ENT, ophthalmic, and general surgery.
                    </p>
                  </div>

                  <div className="p-space-lg rounded-lg bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
                    <div className="flex items-center justify-between mb-space-xs">
                      <span className="font-headline-md text-headline-md text-primary font-semibold">
                        100% QA
                      </span>
                      <span className="material-symbols-outlined text-outline">
                        verified_user
                      </span>
                    </div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface uppercase tracking-wider block mb-1">
                      Traceability &amp; Hardness Testing
                    </span>
                    <p className="font-body-sm text-body-sm text-outline">
                      Every serialized piece undergoes Rockwell testing, microscopic blade evaluation, and passive film assay.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==========================================
              3. PRODUCT CATEGORIES (10 SURGICAL DISCIPLINES)
              ========================================== */}
          <section className="w-full py-space-xl" id="product-categories">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl">
              <div>
                <span className="font-label-md text-label-md uppercase tracking-widest text-on-tertiary-container font-semibold mb-space-xs block">
                  Sterile Instrumentation Disciplines
                </span>
                <h2 className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight">
                  Explore Our Surgical Disciplines
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-space-sm md:mt-0 leading-relaxed">
                Engineered specifically for clinical sterilization cycles, corrosion resistance, and tactile fingertip balance under operating illumination.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-space-md">
              {VANGUARD_DISCIPLINES.map((discipline) => (
                <div
                  key={discipline.id}
                  className="group flex flex-col justify-between p-space-lg rounded-lg bg-surface-container-lowest border border-outline-variant/30 hover:border-primary-container transition-all"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-md group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined text-[22px]">
                        {discipline.icon}
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-1">
                      {discipline.disciplineNumber}
                    </span>
                    <h3 className="font-headline-sm text-[18px] leading-snug font-semibold text-primary mb-space-sm">
                      {discipline.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                      {discipline.description}
                    </p>
                  </div>
                  <div className="pt-space-sm border-t border-outline-variant/20 flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-outline">
                      {discipline.toolsCount}
                    </span>
                    <Link
                      to={`/products?discipline=${encodeURIComponent(discipline.title)}`}
                      className="font-label-sm text-label-sm font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      Examine Line{" "}
                      <span className="material-symbols-outlined text-[14px]">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ==========================================
              4. FEATURED PRODUCTS (FLAGSHIP B2B SPEC SHEET)
              ========================================== */}
          <section className="w-full py-space-xxl my-space-lg">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl">
              <div>
                <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded bg-tertiary-fixed text-tertiary font-label-sm text-label-sm uppercase tracking-widest font-semibold mb-space-xs">
                  Engineering Showcase
                </div>
                <h2 className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight">
                  Standard-Setting Surgical Instruments
                </h2>
              </div>
              <div className="text-outline font-label-md text-label-md mt-space-sm md:mt-0 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">
                  download
                </span>
                <span>All CAD 3D models available for hospital procurement engineering</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
              {VANGUARD_FLAGSHIPS.map((prod) => (
                <div
                  key={prod.ref}
                  className="flex flex-col justify-between bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative w-full aspect-square bg-surface-container-low p-space-md flex items-center justify-center border-b border-outline-variant/20">
                    <img
                      className="w-full h-full object-contain"
                      alt={prod.imageAlt}
                      src={prod.image}
                    />
                    <span className="absolute top-3 left-3 bg-surface-container-lowest px-2 py-1 rounded text-[11px] font-mono font-semibold text-primary border border-outline-variant/30">
                      {prod.ref}
                    </span>
                    <span
                      className={`absolute top-3 right-3 px-2 py-0.5 rounded font-label-sm text-[10px] tracking-wider uppercase font-semibold ${
                        prod.badgeType === "tc"
                          ? "bg-tertiary text-on-tertiary"
                          : prod.badgeType === "atraumatic"
                          ? "bg-primary-container text-on-primary"
                          : "bg-surface-variant text-on-surface-variant"
                      }`}
                    >
                      {prod.badge}
                    </span>
                  </div>

                  <div className="p-space-lg flex flex-col flex-1 justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block mb-1">
                        {prod.category}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-space-xs leading-snug">
                        {prod.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                        {prod.description}
                      </p>
                      <div className="space-y-1.5 py-space-sm border-t border-b border-outline-variant/20 font-body-sm text-body-sm mb-space-md">
                        <div className="flex justify-between text-on-surface-variant">
                          <span>Length:</span>{" "}
                          <span className="font-mono text-primary font-medium">{prod.length}</span>
                        </div>
                        <div className="flex justify-between text-on-surface-variant">
                          <span>{prod.specA.label}:</span>{" "}
                          <span className="font-mono text-primary font-medium">{prod.specA.value}</span>
                        </div>
                        <div className="flex justify-between text-on-surface-variant">
                          <span>{prod.specB.label}:</span>{" "}
                          <span className="font-mono text-primary font-medium">{prod.specB.value}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenRfq(prod.title)}
                      className="w-full py-2.5 px-space-md bg-surface-container text-primary font-label-md text-label-md rounded border border-outline-variant/40 hover:bg-primary-container hover:text-on-primary transition-all text-center font-medium"
                    >
                      Request Spec Sheet &amp; Tender File
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ==========================================
              5. MANUFACTURING EXCELLENCE
              ========================================== */}
          <section
            className="w-full py-space-xxl bg-surface-container-low rounded-xl border border-outline-variant/20 px-space-md lg:px-space-xl my-space-lg"
            id="manufacturing"
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-space-xl">
                <span className="font-label-md text-label-md uppercase tracking-widest text-on-tertiary-container font-semibold mb-space-xs block">
                  Engineering &amp; Tooling Process
                </span>
                <h2 className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight">
                  Where Precision Metallurgy Meets Hand Craftsmanship
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">
                  Every instrument passes through a disciplined four-tier manufacturing chain, combining high-speed Swiss 5-axis CNC machining with the irreplaceable touch of seasoned master bench smiths.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
                <div className="p-space-lg bg-surface-container-lowest rounded-lg border border-outline-variant/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-space-md">
                      <span className="font-headline-lg text-headline-lg text-primary/30 font-semibold font-mono">01</span>
                      <span className="material-symbols-outlined text-primary text-[24px]">science</span>
                    </div>
                    <h3 className="font-headline-sm text-[18px] font-semibold text-primary mb-space-xs">Steel Selection</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-sm">
                      Certified German DIN EN 1.4021, 1.4117, and ASTM F899 billets. Spectral chemical analysis confirms chromium and carbon balance before forging.
                    </p>
                  </div>
                  <div className="pt-space-xs font-label-sm text-label-sm font-mono text-outline border-t border-outline-variant/20">
                    DIN EN 10088-3 Compliant
                  </div>
                </div>

                <div className="p-space-lg bg-surface-container-lowest rounded-lg border border-outline-variant/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-space-md">
                      <span className="font-headline-lg text-headline-lg text-primary/30 font-semibold font-mono">02</span>
                      <span className="material-symbols-outlined text-primary text-[24px]">precision_manufacturing</span>
                    </div>
                    <h3 className="font-headline-sm text-[18px] font-semibold text-primary mb-space-xs">5-Axis CNC Milling</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-sm">
                      High-precision electro-discharge machining (EDM) and robotic milling profile box locks, pivots, and jaw serrations to micron repeatability.
                    </p>
                  </div>
                  <div className="pt-space-xs font-label-sm text-label-sm font-mono text-outline border-t border-outline-variant/20">
                    ±0.005mm Machine Accuracy
                  </div>
                </div>

                <div className="p-space-lg bg-surface-container-lowest rounded-lg border border-outline-variant/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-space-md">
                      <span className="font-headline-lg text-headline-lg text-primary/30 font-semibold font-mono">03</span>
                      <span className="material-symbols-outlined text-primary text-[24px]">hand_bones</span>
                    </div>
                    <h3 className="font-headline-sm text-[18px] font-semibold text-primary mb-space-xs">Artisan Benchwork</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-sm">
                      Master artisans calibrate scissor shearing tension by ear and feel. Prongs, serrations, and ring bevels are manually deburred and polished.
                    </p>
                  </div>
                  <div className="pt-space-xs font-label-sm text-label-sm font-mono text-outline border-t border-outline-variant/20">
                    100% Hand-Balanced Action
                  </div>
                </div>

                <div className="p-space-lg bg-surface-container-lowest rounded-lg border border-outline-variant/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-space-md">
                      <span className="font-headline-lg text-headline-lg text-primary/30 font-semibold font-mono">04</span>
                      <span className="material-symbols-outlined text-primary text-[24px]">sanitizer</span>
                    </div>
                    <h3 className="font-headline-sm text-[18px] font-semibold text-primary mb-space-xs">Passivation &amp; Laser ID</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-sm">
                      Ultrasonic nitric/citric acid passivation builds deep chromium oxide barrier. High-resolution UDI laser marks enable full hospital traceability.
                    </p>
                  </div>
                  <div className="pt-space-xs font-label-sm text-label-sm font-mono text-outline border-t border-outline-variant/20">
                    ASTM A967 &amp; GS1 UDI Barcode
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==========================================
              6. QUALITY ASSURANCE (QA & COMPLIANCE)
              ========================================== */}
          <section className="w-full py-space-xl" id="quality-assurance">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
              <div className="lg:col-span-6 flex flex-col">
                <span className="font-label-md text-label-md uppercase tracking-widest text-on-tertiary-container font-semibold mb-space-xs">
                  Zero-Defect Protocol
                </span>
                <h2 className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight mb-space-md leading-tight">
                  Quality Is at the Heart of Every Instrument We Supply
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg leading-relaxed">
                  In high-stakes surgical intervention, tool failure is never an option. Vanguard operates internal optical calibration labs ensuring all production batches comply with European Medical Device Regulation (EU-MDR 2017/745) and US FDA Class II specifications.
                </p>

                <div className="space-y-space-md">
                  <div className="flex items-start gap-space-md p-space-md rounded-lg bg-surface-container-lowest border border-outline-variant/30">
                    <span className="material-symbols-outlined text-primary mt-0.5">straighten</span>
                    <div>
                      <h4 className="font-headline-sm text-[16px] font-semibold text-primary">
                        3D Coordinate Measuring Machine (CMM) &amp; Optical Comparator
                      </h4>
                      <p className="font-body-sm text-body-sm text-outline mt-0.5">
                        Continuous non-contact contour inspection with 0.001mm measurement resolution across blade geometries.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-space-md p-space-md rounded-lg bg-surface-container-lowest border border-outline-variant/30">
                    <span className="material-symbols-outlined text-primary mt-0.5">network_check</span>
                    <div>
                      <h4 className="font-headline-sm text-[16px] font-semibold text-primary">
                        Rockwell Hardness Inspection (HRC 48–54)
                      </h4>
                      <p className="font-body-sm text-body-sm text-outline mt-0.5">
                        Verification of vacuum tempering depth to prevent jaw splaying or brittle edge chipping under force.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-space-md p-space-md rounded-lg bg-surface-container-lowest border border-outline-variant/30">
                    <span className="material-symbols-outlined text-primary mt-0.5">water_drop</span>
                    <div>
                      <h4 className="font-headline-sm text-[16px] font-semibold text-primary">
                        ASTM F1089 Corrosion &amp; Boiling Assay
                      </h4>
                      <p className="font-body-sm text-body-sm text-outline mt-0.5">
                        Rigorous autoclave cycle simulation, copper sulfate bath, and boiling water immersion to guarantee corrosion immunity.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-space-md p-space-md rounded-lg bg-surface-container-lowest border border-outline-variant/30">
                    <span className="material-symbols-outlined text-primary mt-0.5">handshake</span>
                    <div>
                      <h4 className="font-headline-sm text-[16px] font-semibold text-primary">
                        Manual Cutting &amp; Tactile Feedback Audits
                      </h4>
                      <p className="font-body-sm text-body-sm text-outline mt-0.5">
                        Final approval conducted by senior master technicians evaluating latex sheet cutting resistance and hinge fluidity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Regulatory Passport Container */}
              <div className="lg:col-span-6 bg-surface-container-low p-space-lg lg:p-space-xl rounded-xl border border-outline-variant/20 flex flex-col justify-between">
                <div className="mb-space-lg">
                  <div className="flex items-center justify-between mb-space-md">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                      Accreditation Certificates
                    </span>
                    <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary font-semibold mb-space-xs">
                    Global Regulatory Passport
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Validated for direct supply and institutional hospital tenders globally.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-space-md mb-space-lg">
                  <div className="p-space-md rounded bg-surface-container-lowest border border-outline-variant/30">
                    <span className="font-label-sm text-label-sm uppercase text-outline block">Management System</span>
                    <span className="font-headline-sm text-[17px] font-semibold text-primary block mt-1">ISO 13485:2016</span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">Medical Devices Quality Cert</span>
                  </div>
                  <div className="p-space-md rounded bg-surface-container-lowest border border-outline-variant/30">
                    <span className="font-label-sm text-label-sm uppercase text-outline block">European Union</span>
                    <span className="font-headline-sm text-[17px] font-semibold text-primary block mt-1">CE Mark (MDR)</span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">Notified Body 0123 Approved</span>
                  </div>
                  <div className="p-space-md rounded bg-surface-container-lowest border border-outline-variant/30">
                    <span className="font-label-sm text-label-sm uppercase text-outline block">United States</span>
                    <span className="font-headline-sm text-[17px] font-semibold text-primary block mt-1">FDA 510(k) Exempt</span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">Class I &amp; Class II Registered</span>
                  </div>
                  <div className="p-space-md rounded bg-surface-container-lowest border border-outline-variant/30">
                    <span className="font-label-sm text-label-sm uppercase text-outline block">Metallurgy Norm</span>
                    <span className="font-headline-sm text-[17px] font-semibold text-primary block mt-1">ASTM F899-20</span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">Standard Stainless Steels Spec</span>
                  </div>
                </div>

                <div className="p-space-md rounded bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-outline">verified</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Download our current ISO Compliance &amp; Batch Certificate pack
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenRfq("ISO 13485 Regulatory Dossier")}
                    className="font-label-sm text-label-sm font-semibold text-primary hover:underline flex items-center gap-1 shrink-0"
                  >
                    PDF Dossier <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ==========================================
              7. WHY CHOOSE US
              ========================================== */}
          <section className="w-full py-space-xxl my-space-lg">
            <div className="text-center max-w-2xl mx-auto mb-space-xl">
              <span className="font-label-md text-label-md uppercase tracking-widest text-on-tertiary-container font-semibold mb-space-xs block">
                Operational Competence
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight">
                The Vanguard Supply Advantage
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
              <div className="p-space-lg rounded-lg bg-surface-container-lowest border border-outline-variant/30 hover:border-primary-container transition-all">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-md">
                  <span className="material-symbols-outlined text-[26px]">tune</span>
                </div>
                <h3 className="font-headline-sm text-[18px] font-semibold text-primary mb-space-xs">Sub-Micron Tolerances</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Tolerances calibrated to ±0.02mm guarantee that scissor blades shear tissue cleanly without pinching or slipping over time.
                </p>
              </div>

              <div className="p-space-lg rounded-lg bg-surface-container-lowest border border-outline-variant/30 hover:border-primary-container transition-all">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-md">
                  <span className="material-symbols-outlined text-[26px]">fact_check</span>
                </div>
                <h3 className="font-headline-sm text-[18px] font-semibold text-primary mb-space-xs">Batch Consistency</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Every instrument batch features identical weight, center of gravity, and spring elasticity so surgeons experience unwavering feel.
                </p>
              </div>

              <div className="p-space-lg rounded-lg bg-surface-container-lowest border border-outline-variant/30 hover:border-primary-container transition-all">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-md">
                  <span className="material-symbols-outlined text-[26px]">category</span>
                </div>
                <h3 className="font-headline-sm text-[18px] font-semibold text-primary mb-space-xs">OEM &amp; Custom Tooling</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  In-house tooling shop capable of producing custom proprietary geometry from technical STP drawings in small or large production runs.
                </p>
              </div>

              <div className="p-space-lg rounded-lg bg-surface-container-lowest border border-outline-variant/30 hover:border-primary-container transition-all">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-md">
                  <span className="material-symbols-outlined text-[26px]">flight_takeoff</span>
                </div>
                <h3 className="font-headline-sm text-[18px] font-semibold text-primary mb-space-xs">Direct Global Logistics</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Fully licensed export logistics handling complete customs declarations, phytosanitary packaging, and Certificates of Origin for 40+ destinations.
                </p>
              </div>
            </div>
          </section>

          {/* ==========================================
              8. B2B INQUIRY & TENDER CALLOUT
              ========================================== */}
          <section className="w-full py-space-xl mb-space-xxl" id="inquiry-section">
            <div className="w-full bg-primary-container text-on-primary rounded-xl p-space-lg md:p-space-xxl relative overflow-hidden shadow-xl">
              {/* Background Ambient SVG Lines */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" fill="none" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="900" cy="100" r="400" stroke="currentColor" strokeDasharray="8 8" strokeWidth="1.5"></circle>
                  <line stroke="currentColor" strokeWidth="1" x1="0" x2="1000" y1="200" y2="200"></line>
                  <line stroke="currentColor" strokeWidth="1" x1="0" x2="1000" y1="400" y2="400"></line>
                  <line stroke="currentColor" strokeWidth="1" x1="300" x2="300" y1="0" y2="600"></line>
                  <line stroke="currentColor" strokeWidth="1" x1="700" x2="700" y1="0" y2="600"></line>
                </svg>
              </div>

              <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
                <span className="inline-flex items-center gap-2 px-space-md py-1 rounded bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-widest font-semibold mb-space-md">
                  Institutional Procurement &amp; Export Tender Desk
                </span>
                <h2 className="font-headline-xl text-headline-xl text-on-primary font-semibold tracking-tight mb-space-md leading-tight">
                  Looking for Dependable Surgical Instrumentation Solutions?
                </h2>
                <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl mb-space-xl leading-relaxed">
                  Connect directly with our engineering division to discuss institutional volume supply, custom private labeling, specialized OEM instrument development, or comprehensive surgical master catalogs.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-space-md w-full sm:w-auto mb-space-xl">
                  <button
                    type="button"
                    onClick={() => onOpenRfq()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md bg-tertiary-fixed text-on-tertiary-fixed font-label-lg text-label-lg font-semibold rounded-lg hover:brightness-110 active:brightness-95 transition-all shadow-md"
                  >
                    <span className="material-symbols-outlined text-[20px]">request_quote</span>
                    <span>Request Catalog &amp; Quotation</span>
                  </button>
                  <a
                    href="mailto:export@vanguard-surgical.com"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md bg-transparent text-on-primary font-label-lg text-label-lg rounded-lg border border-outline-variant/40 hover:bg-on-primary/10 transition-all font-medium"
                  >
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                    <span>Contact Export Division</span>
                  </a>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-space-md text-on-primary-container font-label-sm text-label-sm uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">schedule</span>
                    <span>Direct B2B Response in &lt;24h</span>
                  </div>
                  <div className="hidden sm:inline text-outline-variant/50">•</div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">description</span>
                    <span>Export Documentation &amp; Customs Clearance</span>
                  </div>
                  <div className="hidden sm:inline text-outline-variant/50">•</div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">handshake</span>
                    <span>Private Label &amp; OEM Consultation</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
