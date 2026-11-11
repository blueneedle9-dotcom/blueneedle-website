import React from "react";
import { Link } from "react-router-dom";
import { HOME_CATEGORIES, HOME_FEATURED_INSTRUMENTS } from "../data/catalog";

interface HomePageProps {
  onOpenRfq: (targetLabel?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenRfq }) => {
  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO & TECHNICAL BENCHMARK */}
      <section className="relative w-full bg-surface-container-lowest overflow-hidden pb-space-xl">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-container-low/40 via-transparent to-transparent pointer-events-none" />
        <div className="w-full px-margin md:px-gutter-desktop max-w-[1440px] mx-auto pt-space-lg">
          {/* Breadcrumb & Specification Meta Tag */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-lg">
            <div className="flex items-center gap-space-xs font-label-technical text-label-technical text-secondary uppercase tracking-widest bg-surface-container px-space-sm py-1 rounded">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim animate-pulse" />
              <span>ISO 13485:2016 &amp; CE Medical Directives Registered</span>
            </div>
            <div className="font-label-code text-label-code text-on-surface-variant">
              SPEC DOC: BN-SYS-2025-V4 // DIN EN ISO 7153-1
            </div>
          </div>

          {/* Hero Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
            {/* Text Column */}
            <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-space-md">
              <div className="inline-flex items-center gap-2 px-space-sm py-1 bg-surface-container-high rounded text-on-primary-fixed-variant font-label-technical text-label-technical mb-space-md uppercase">
                <span className="material-symbols-outlined text-[15px]">
                  verified_user
                </span>
                <span>Institutional Surgical Instrumentation</span>
              </div>
              <h1 className="font-display text-display-mobile sm:text-display text-primary tracking-tight mb-space-sm">
                Precision in Every Instrument.
              </h1>
              <p className="font-headline-md text-headline-md text-secondary font-light mb-space-md">
                Professional Surgical, Medical, Dental &amp; Orthopedic Instruments.
              </p>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-space-xl max-w-xl">
                Engineered from certified European martensitic stainless steel with
                micron-level tolerances. Hand-balanced, sterile-autoclavable
                instruments designed for hospitals, clinical distributors, and
                surgical specialists worldwide.
              </p>

              {/* Dual Institutional Action Buttons */}
              <div className="flex flex-wrap items-center gap-space-md w-full sm:w-auto">
                <Link
                  className="w-full sm:w-auto text-center bg-primary-container text-on-primary hover:bg-primary transition-colors font-label-lg text-label-lg px-space-xl py-space-md rounded uppercase tracking-wider shadow-[0_4px_12px_-2px_rgba(20,43,69,0.12)]"
                  to="/products"
                >
                  Explore Our Products
                </Link>
                <button
                  className="w-full sm:w-auto text-center bg-transparent text-secondary hover:bg-surface-container transition-colors font-label-lg text-label-lg px-space-xl py-space-md rounded uppercase tracking-wider shadow-[inset_0_0_0_1px_rgba(66,98,123,0.3)]"
                  onClick={() => onOpenRfq("Direct Export & Procurement Contact")}
                  type="button"
                >
                  Contact Us
                </button>
              </div>

              {/* Micro Technical Telemetry Strip */}
              <div className="grid grid-cols-3 gap-space-md pt-space-xl mt-space-xl border-t border-outline-variant/30 w-full">
                <div>
                  <span className="font-label-technical text-label-code text-on-surface-variant uppercase block">
                    Rockwell Metric
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary">
                    50 - 54 HRC
                  </span>
                </div>
                <div>
                  <span className="font-label-technical text-label-code text-on-surface-variant uppercase block">
                    Surface Ra
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary">
                    ≤ 0.2 µm Satin
                  </span>
                </div>
                <div>
                  <span className="font-label-technical text-label-code text-on-surface-variant uppercase block">
                    Alloy Standard
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary">
                    AISI 420B/C
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Visual: Surgical Tray Placement with Technical Telemetry Overlay */}
            <div className="lg:col-span-6 relative mt-space-lg lg:mt-0">
              <div className="relative bg-surface-container-lowest rounded-xl p-space-sm shadow-[0_20px_40px_-8px_rgba(20,43,69,0.08)]">
                <div className="relative overflow-hidden rounded-lg aspect-[16/10] bg-surface-container-low flex items-center justify-center">
                  <img
                    alt="Precision surgical stainless steel instruments on sterile clinical tray"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJyh_V9Yb4mP-Xdq89HU71VTxdAWJt1R5M1cStdnZ5gCogHeJIYQtq1ABc8jHFemUUcF7VmE8VwXMfDx2Den-8Ek-qo4p6vB0S2_bUoBBuhRayGqHyiSj3nRcXhIfrtv-GVtTLF0q9k3zLfQeB0hk6exYmp-6jRYXQCO-oOHrViN1zxkz409zJ_AOflDovgKMJmlCCHAXLuoPns__KvgaUIpka-hEpPzg6ryNK6Kw"
                  />
                  {/* Technical Engineering Callouts Overlaid */}
                  <div className="absolute top-4 left-4 bg-primary/90 text-on-primary backdrop-blur-md px-space-sm py-1 rounded text-label-technical font-label-technical flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed" />
                    <span>AISI 420/440 Surgical Stainless Steel</span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-surface-container-lowest/95 text-primary backdrop-blur-md px-space-sm py-1 rounded text-label-technical font-label-technical flex items-center gap-2 shadow-sm">
                    <span className="material-symbols-outlined text-[14px] text-secondary">
                      tune
                    </span>
                    <span>Hand-Honed Cutting Edges • Satin Finish Anti-Glare</span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-primary-container text-tertiary-fixed backdrop-blur-md px-space-sm py-1 rounded text-label-technical font-label-technical flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[14px]">
                      shield_with_heart
                    </span>
                    <span>ISO &amp; CE Certified Batch</span>
                  </div>
                </div>
                {/* Engineering Tray Calibration Legend */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-space-md py-space-sm bg-surface-container mt-space-xs rounded font-label-code text-label-code text-on-surface-variant">
                  <span>PLATE: AUTOCLAVE TRAY STERILE SPEC NO. 448</span>
                  <span>SCALE: 1:1 CALIBRATED</span>
                  <span>HEAT-LOT: 88-GER-2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Metrics Bar */}
        <div className="w-full bg-surface-container-low mt-space-xl py-space-lg">
          <div className="w-full px-margin md:px-gutter-desktop max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
              <div className="flex items-start gap-space-md">
                <span className="material-symbols-outlined text-secondary text-[28px] mt-0.5">
                  precision_manufacturing
                </span>
                <div>
                  <div className="font-headline-sm text-headline-sm text-primary">
                    Handcrafted in Sialkot
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    Century-old metallurgy heritage united with modern 5-axis CNC
                    machining centers.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-space-md">
                <span className="material-symbols-outlined text-secondary text-[28px] mt-0.5">
                  public
                </span>
                <div>
                  <div className="font-headline-sm text-headline-sm text-primary">
                    Exporting to 45+ Countries
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    Trusted institutional vendor across EU, UK, USA, Gulf, and
                    Asia-Pacific healthcare systems.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-space-md">
                <span className="material-symbols-outlined text-secondary text-[28px] mt-0.5">
                  category
                </span>
                <div>
                  <div className="font-headline-sm text-headline-sm text-primary">
                    Over 2,400 Patterns
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    Complete catalog coverage across classical DIN standards and
                    specialized surgical niches.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-space-md">
                <span className="material-symbols-outlined text-secondary text-[28px] mt-0.5">
                  biotech
                </span>
                <div>
                  <div className="font-headline-sm text-headline-sm text-primary">
                    Zero-Tolerance QA
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    Every unit passes individual optical alignment, spring tension,
                    and copper sulfate corrosion testing.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PRODUCT CATEGORIES */}
      <section className="w-full bg-surface py-space-xl">
        <div className="w-full px-margin md:px-gutter-desktop max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
            <div>
              <div className="flex items-center gap-space-xs font-label-technical text-label-technical text-secondary uppercase tracking-widest mb-space-xs">
                <span>Specialized Surgical Divisions</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary">
                Surgical Disciplines &amp; Specializations
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Comprehensive instrument systems categorized by clinical procedure
              requirements, forged according to rigorous hospital specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
            {HOME_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 bg-surface-container-low overflow-hidden">
                  <img
                    alt={cat.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={cat.image}
                  />
                  <div className="absolute top-3 right-3 bg-primary-container text-on-primary font-label-code text-label-code px-2 py-0.5 rounded">
                    {cat.patternsLabel}
                  </div>
                </div>
                <div className="p-space-lg flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-1">
                      {cat.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                      {cat.description}
                    </p>
                  </div>
                  <Link
                    className="inline-flex items-center gap-space-xs text-secondary font-label-lg text-label-lg group-hover:text-primary transition-colors"
                    to={`/products?category=${encodeURIComponent(cat.slug)}`}
                  >
                    <span>Explore Category</span>
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED PRODUCTS SHOWCASE */}
      <section className="w-full bg-surface-container-lowest py-space-xl">
        <div className="w-full px-margin md:px-gutter-desktop max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
            <div>
              <div className="font-label-technical text-label-technical text-secondary uppercase tracking-wider mb-space-xs">
                Standard DIN Surgical Catalog
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary">
                Signature Precision Instruments
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">
                Exemplary German-style patterns forged from high-tensile medical
                grade stainless steel. Manufactured to DIN EN ISO standards for
                hospital operating theaters.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                className="inline-flex items-center gap-2 bg-surface-container text-primary font-label-lg text-label-lg px-space-md py-2 rounded hover:bg-surface-container-high transition-colors"
                to="/products"
              >
                <span>View Complete 2,400+ Matrix</span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {HOME_FEATURED_INSTRUMENTS.map((item) => (
              <div
                key={item.ref}
                className="group bg-surface rounded-lg p-space-md shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-code text-label-code text-secondary">
                      {item.ref}
                    </span>
                    <span
                      className={`bg-surface-container-high text-primary font-label-technical text-label-technical px-2 py-0.5 rounded text-[10px] uppercase ${
                        item.badgeBold ? "font-bold" : ""
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <div className="relative w-full aspect-square bg-surface-container-lowest rounded mb-space-sm p-space-md flex items-center justify-center overflow-hidden">
                    <img
                      alt={item.imageAlt}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      src={item.image}
                    />
                  </div>
                  <div className="font-label-technical text-label-technical text-secondary uppercase tracking-wider text-[11px] mb-1">
                    {item.category}
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-2 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                    {item.description}
                  </p>
                </div>
                <div className="pt-space-sm border-t border-surface-container flex items-center justify-between">
                  <span className="font-label-code text-label-code text-on-surface-variant">
                    {item.standard}
                  </span>
                  <Link
                    className="inline-flex items-center gap-1 text-primary font-label-lg text-label-lg group-hover:text-secondary transition-colors"
                    to={`/products/${item.detailId}`}
                  >
                    <span>View Details</span>
                    <span className="material-symbols-outlined text-[14px]">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: ABOUT BLUENEEDLE (HERITAGE & CRAFTSMANSHIP) */}
      <section className="w-full bg-surface-container py-space-xl">
        <div className="w-full px-margin md:px-gutter-desktop max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
            <div className="lg:col-span-6 pr-0 lg:pr-space-lg">
              <div className="flex items-center gap-space-xs font-label-technical text-label-technical text-secondary uppercase tracking-wider mb-space-xs">
                <span>Engineering Heritage Since 1994</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-space-md">
                The Pinnacle of Metallurgy &amp; Artisan Sialkot Forging
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-space-md">
                For generations, Sialkot, Pakistan has served as the global nerve
                center of surgical craftsmanship, producing more than 70% of the
                world’s handheld medical tools.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
                BLUENEEDLE merges this authentic master-smith tradition with
                automated CNC wire cutting, computer-controlled vacuum tempering,
                and strict European metallurgical tracing. Every raw billet is
                verified via optical emission spectrometers to guarantee
                DIN-standard corrosion resistance and tensile strength before the
                first hammer falls.
              </p>
              <div className="p-space-md bg-surface-container-lowest rounded-lg shadow-sm">
                <div className="flex items-center gap-space-md">
                  <span className="material-symbols-outlined text-secondary text-[36px]">
                    shield
                  </span>
                  <div>
                    <div className="font-headline-sm text-headline-sm text-primary">
                      Certified Raw Stock Verification
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      We source exclusively from certified European and Japanese
                      mills conforming to ASTM F899 standards.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 mt-space-lg lg:mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded bg-primary-container text-on-primary flex items-center justify-center mb-space-sm">
                    <span className="material-symbols-outlined text-[20px]">
                      hardware
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-1">
                    Material Integrity
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    High-carbon martensitic steel (AISI 420B/C) heat-treated to
                    exact HRC specs for permanent edge retention.
                  </p>
                </div>

                <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded bg-primary-container text-on-primary flex items-center justify-center mb-space-sm">
                    <span className="material-symbols-outlined text-[20px]">
                      architecture
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-1">
                    Hand-Fitted Box Locks
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Zero-play pivot joints hand-lapped with micro-abrasives to
                    guarantee perfectly parallel jaw closure.
                  </p>
                </div>

                <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded bg-primary-container text-on-primary flex items-center justify-center mb-space-sm">
                    <span className="material-symbols-outlined text-[20px]">
                      blur_linear
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-1">
                    Anti-Glare Satin Finish
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Fine glass-bead blasted surface prevents high-intensity
                    surgical light bounce in deep cavity operations.
                  </p>
                </div>

                <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded bg-primary-container text-on-primary flex items-center justify-center mb-space-sm">
                    <span className="material-symbols-outlined text-[20px]">
                      fact_check
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-1">
                    Passivation &amp; Boil Test
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Every production batch undergoes citric/nitric acid
                    passivation followed by ASTM autoclave boil assays.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: QUALITY & MANUFACTURING PIPELINE */}
      <section className="w-full bg-surface-container-lowest py-space-xl">
        <div className="w-full px-margin md:px-gutter-desktop max-w-[1440px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-space-xl">
            <div className="inline-flex items-center gap-2 px-space-sm py-1 bg-surface-container-high rounded text-on-primary-fixed-variant font-label-technical text-label-technical mb-space-xs uppercase">
              <span>Validated Quality Systems</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary">
              4-Step Manufacturing Integrity Pipeline
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              From red-hot billet forging to individual microscopic edge
              inspection, our facility operates in strict adherence to ISO
              13485:2016 directives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
            <div className="bg-surface p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="font-label-code text-label-code text-secondary">
                    STAGE 01
                  </span>
                  <span className="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                </div>
                <div className="w-full h-32 rounded bg-surface-container-low mb-space-md overflow-hidden">
                  <img
                    alt="Industrial drop hammer forging process shaping red glowing surgical stainless steel billets in precision steel dies."
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA41AXp594i8N5P9HIfXVvrPR2hd8h3TyMqQqiiK2K1z0qN8jrS9GDOSX-iXE8-gXMqZ8QGUQxQGbPifPR8uJN_LFxcIVzYyxTSsighSqJxsf_sxE1rMGqZ_cVQMds14nN_BswJg5yT_4VT0ikYPhjY5F6AStojkpNM7JrNBaZu8uYgGdgugeB4Y0nS_gl0aLK-gCi9Dh5VbXMO39IOLlgPNPyaKEtIMdtpdqgq-JI"
                  />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-2">
                  Forging &amp; Drop Hammer
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Closed-die hammer forming under controlled temperature ensures
                  uniform metallurgical grain flow and eliminates micro-porosity.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs font-label-technical text-label-code text-secondary uppercase">
                Tolerance: ±0.10mm
              </div>
            </div>

            <div className="bg-surface p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="font-label-code text-label-code text-secondary">
                    STAGE 02
                  </span>
                  <span className="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                </div>
                <div className="w-full h-32 rounded bg-surface-container-low mb-space-md overflow-hidden">
                  <img
                    alt="Modern 5-axis CNC high precision milling center cutting medical grade steel instruments with coolant fluids."
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpbDWA2r3Ql6vjJynTXP8FOlIXqtGsvJxv0Yoi7CEZqmGLTxHTwFAl5NuZvzuPB0-pxs3WxAEMLSN4uEiDJA_gZc9TUAhprUg_SD0UEJwxDaIv4NCQIMD9T-vdH6l6JMUFtTzyd4s6ZIu7cVFVJuNydAUi9DT9bBDn8xscs9UHUTrWZguWOb9aqSpEG3FbZv058bddxsC0jMw_2gaKls7pSKtsFzx9zAXZtVOQSz8"
                  />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-2">
                  CNC Milling &amp; Ultrasonic
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Computerized 5-axis profile milling of ratchets, serrations, and
                  hinge recesses, followed by multi-stage ultrasonic degreasing.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs font-label-technical text-label-code text-secondary uppercase">
                Tolerance: ±0.015mm
              </div>
            </div>

            <div className="bg-surface p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="font-label-code text-label-code text-secondary">
                    STAGE 03
                  </span>
                  <span className="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-bold text-xs">
                    3
                  </span>
                </div>
                <div className="w-full h-32 rounded bg-surface-container-low mb-space-md overflow-hidden">
                  <img
                    alt="Vacuum heat treatment chamber with glowing steel instruments undergoing sub-zero cryogenic hardening cycles."
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN9OJccaN_47Q2L13XUVWhFt3RcSABB_V6CGs1aj8ORmLw3OCECZUJPJMTJT_6o3L-2lrYeJDOwf9w_5FkjnJqHksiNEr2eRsfy8D8weMXxW9IjlJ5cU77z6hZSKDSD5g2d9ADEB9HIrute-v5Rfz1bPjhnui2MxbfesjcwFTeFiA_9-mHqpsX8Gaf3RxbaqSdbXW1S8BICfNOhdyEfEipX444tv9wElOveZnDLbs"
                  />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-2">
                  Vacuum Hardening &amp; Cryo
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Controlled inert atmosphere vacuum hardening combined with
                  sub-zero cryogenic freeze stabilizes the austenite phase to avoid
                  embrittlement.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs font-label-technical text-label-code text-secondary uppercase">
                Hardness: 50–54 HRC
              </div>
            </div>

            <div className="bg-surface p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="font-label-code text-label-code text-secondary">
                    STAGE 04
                  </span>
                  <span className="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-bold text-xs">
                    4
                  </span>
                </div>
                <div className="w-full h-32 rounded bg-surface-container-low mb-space-md overflow-hidden">
                  <img
                    alt="Laboratory technician examining surgical scissors under high magnification stereo optical microscope with digital measurement overlay."
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA3ioPjx43R2Vjofw_NDhRkfgQYYRu9xWDXgG1oQ-wUgIKN0il6xhNdJH0D-qNrpC0FNleK2lYdDzBGSWLnCzu_0PopZMCwCOWhAvPoZRs-ya4uCPssIc3WGCVK-PA_ItAhrKSOzqXXpH1es_wGMWTMl1yABxThEdmNndZvXs3jB9ME0T_VgZW7GetAERZsBVaK9VnowY0oPw6by8KmcGzuWuE9K-adc6NEUlnvPI"
                  />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-2">
                  100% Optical &amp; Tactile QA
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Master surgical technicians individually test cut geometry
                  through wet gauze and calibrate closure ratchets prior to laser
                  serialization.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs font-label-technical text-label-code text-secondary uppercase">
                Standard: DIN ISO 7153-1
              </div>
            </div>
          </div>

          {/* Laboratory Certification Banner */}
          <div className="mt-space-xl bg-surface-container p-space-lg rounded-xl flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0">
                <span className="material-symbols-outlined">
                  workspace_premium
                </span>
              </div>
              <div>
                <div className="font-headline-sm text-headline-sm text-primary">
                  Standard Compliance Guarantee
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  Every dispatch includes Material Test Reports (MTR 3.1) and
                  Certificate of Conformity for hospital procurement files.
                </div>
              </div>
            </div>
            <Link
              className="bg-surface-container-lowest text-primary font-label-lg text-label-lg px-space-md py-2 rounded shadow-sm hover:bg-surface-container-low transition-colors uppercase whitespace-nowrap"
              to="/about-us"
            >
              View Compliance Certificates
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: FINAL B2B CONTACT & PROCUREMENT BANNER */}
      <section className="w-full bg-primary-container text-on-primary py-space-xl relative overflow-hidden">
        <div className="w-full px-margin md:px-gutter-desktop max-w-[1440px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-space-xs font-label-technical text-label-technical text-tertiary-fixed uppercase tracking-wider mb-space-xs">
                <span className="material-symbols-outlined text-[16px]">
                  handshake
                </span>
                <span>Direct Manufacturer Partnership</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-primary mb-space-sm">
                Looking for a Reliable Surgical Instrument Partner?
              </h2>
              <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl mb-space-lg">
                We collaborate with global medical distributors, hospital
                procurement boards, and OEM healthcare brands. Benefit from
                factory-direct pricing, custom laser etching, and international
                freight handling from Sialkot.
              </p>

              <div className="flex flex-wrap items-center gap-space-md font-label-technical text-label-technical text-tertiary-fixed mb-space-lg">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">
                    check_circle
                  </span>
                  <span>OEM Laser Stamping Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">
                    check_circle
                  </span>
                  <span>FOB, CIF &amp; DDP Shipping Terms</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">
                    check_circle
                  </span>
                  <span>Hospital Tender Volume Support</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-space-md">
                <button
                  className="bg-primary text-on-primary hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg px-space-xl py-space-md rounded uppercase tracking-wider shadow-sm"
                  onClick={() => onOpenRfq("Direct Manufacturer Partnership")}
                  type="button"
                >
                  Contact BLUENEEDLE
                </button>
                <button
                  className="bg-surface-container-lowest text-primary hover:bg-surface-container transition-colors font-label-lg text-label-lg px-space-xl py-space-md rounded uppercase tracking-wider shadow-sm"
                  onClick={() => onOpenRfq("OEM Master Catalog Request")}
                  type="button"
                >
                  Request OEM Catalog
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 mt-space-lg lg:mt-0">
              <div className="bg-primary p-space-lg rounded-xl shadow-lg">
                <div className="font-headline-sm text-headline-sm text-on-primary mb-1">
                  Direct Export Desk
                </div>
                <p className="font-body-sm text-body-sm text-on-primary-container mb-space-md">
                  Institutional procurement teams may request expedited material
                  analysis and quotation files.
                </p>
                <div className="space-y-space-sm font-label-technical text-label-technical">
                  <div className="p-space-sm bg-primary-container rounded flex items-center justify-between">
                    <span className="text-on-primary-container">
                      AVERAGE RFQ RESPONSE:
                    </span>
                    <span className="text-tertiary-fixed font-bold">
                      &lt; 4 HOURS
                    </span>
                  </div>
                  <div className="p-space-sm bg-primary-container rounded flex items-center justify-between">
                    <span className="text-on-primary-container">
                      SAMPLE PROTOCOL:
                    </span>
                    <span className="text-tertiary-fixed font-bold">
                      AIR EXPRESS (DHL/FEDEX)
                    </span>
                  </div>
                  <div className="p-space-sm bg-primary-container rounded flex items-center justify-between">
                    <span className="text-on-primary-container">
                      FACILITY AUDIT:
                    </span>
                    <span className="text-tertiary-fixed font-bold">
                      ONLINE &amp; IN-PERSON
                    </span>
                  </div>
                </div>
                <div className="mt-space-md pt-space-sm border-t border-on-primary-container/20 text-center font-label-code text-label-code text-on-primary-container">
                  SIALKOT EXPORT PROCESSING ZONE • PK
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
