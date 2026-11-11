import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CATALOGUE_PRODUCTS,
  PRIMARY_DETAIL_HERO_IMAGE,
  SPECIMEN_VIEWS,
} from "../data/catalog";

interface ProductDetailPageProps {
  onOpenRfq: (targetLabel?: string) => void;
}

const COMPLEMENTARY_CARDS = [
  {
    id: "BN-NH-3105",
    badge: "TC SERRATED",
    ref: "REF: BN-NH-3105",
    title: "Mayo-Hegar Needle Holder",
    description:
      "Cross-serrated Tungsten Carbide jaws engineered for firm grip on heavy curved suture needles in deep cavities.",
    length: "160–200 mm",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrKt7y9wtsdDBiuPyYWFaVqVn2DKUptNp7xy_-qRPzQuudrjgbA7XcKYu5-cENQbbuQPV1eLS-AsbjBNXdl8ja4b0JUFhwst7Gufw5Uy4zWCz6Qn1ULIJXDNhAEM_B7OIsMlIP5mPtPI7hW4QTXgrfWYOOMcbg2WXE7ueT21jfJKtlOHe4FJrV65psyh93b8Ke5WmqoXYqd0NlpkGfkSz4vnQGv_H7Y8YqFRdGQXk",
    alt: "Mayo-Hegar Needle Holder",
  },
  {
    id: "BN-SC-1021-TC",
    badge: "CURVED DELICATE",
    ref: "REF: BN-SC-1035",
    title: "Metzenbaum Dissecting Scissors",
    description:
      "Slender shaft profile for precision soft tissue exploration without damaging adjacent microvascular bundles.",
    length: "180–230 mm",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrkZAVMeBhOh5S5el4vF3UrAEnRB0dgE3tFuB9P03jooWYwqzm9IR7NQ3m9c6QYOh5mQgOX3s4ETPVVNIT5CmBFkox1Lsg75d2RMhzOWqh-qFaGFwFxKyprGnvht4W0JYc7HzYnuPMajjIUbnY9rwnVyiSN_DZdnqC9XhlE2VOgZdTbURQrZS4lTGmHafRXoFGb_RK1mpir7RqelxzFfv8rhhN5Q1IDiITeuSRidU",
    alt: "Metzenbaum Dissecting Scissors",
  },
  {
    id: "BN-FC-2044",
    badge: "HEMOSTATIC",
    ref: "REF: BN-FC-2044",
    title: "Halsted Mosquito Forceps",
    description:
      "Delicate transverse serrations full length of jaw for clamping small bleeders and micro-vessel occlusion.",
    length: "125 mm Straight",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHKfhh6M5tIgmRaf7qJRGtlhDwcHslHmNKlDPuk6Kuo5jIIkBIs7UwvtZwBpgd0gXTjBekuQezk9zot3kXqziJQ6H_YQ1OpVK71_EgWHFE6arUOdSmKqJIoonIZwh84DeZfvZEGwvsvzddbKYZLPQzzK13jIROQGRsznbw9BXoUmZBxy18EdXLVWR2ZHeUwedKkCYYqQxyWTaWNmR8ml2jp5BbSrAu9Zt92WCZffQ",
    alt: "Halsted Mosquito Forceps",
  },
  {
    id: "BN-FC-2180",
    badge: "5x6 INTERLOCKING",
    ref: "REF: BN-FC-2180",
    title: "Allis Tissue Forceps",
    description:
      "Interlocking 5x6 teeth configuration designed for secure, non-crushing traction of slippery subcutaneous tissues.",
    length: "150–190 mm",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLUHOLSpahtzBA8fs_S3ZTSrzsTLtd_lbcdtIQq6Gu4vFN_mI85g4fT2w03tYrXDVO3cAI8zmQ_-6Ibvopwatd-9Ew-rxhT_j-LHZJy1OLJ4En_W5ptBSowiVtiQ8e5a-4fAFR4gSnDZGMqO7QGO_hslWpRdJFB30Dv1cd9LGbuTFCpYdSWu5riuUQgSdrUwPb880ISKZll4a0u6Gdy3oiGpW31Pp6RAayzkZZm44",
    alt: "Allis Tissue Grasping Forceps",
  },
];

const DIMENSIONS = [
  {
    buttonLabel: '14.5 cm (5.75")',
    label: "14.5 cm (5.75 in) — Compact",
    ref: "BN-SC-1021-14TC",
    mm: "145 mm",
  },
  {
    buttonLabel: '17.0 cm (6.75")',
    label: "17.0 cm (6.75 in) — Standard",
    ref: "BN-SC-1021-17TC",
    mm: "170 mm",
  },
  {
    buttonLabel: '23.0 cm (9.0")',
    label: "23.0 cm (9.0 in) — Deep Field",
    ref: "BN-SC-1021-23TC",
    mm: "230 mm",
  },
];

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  onOpenRfq,
}) => {
  const { id } = useParams<{ id: string }>();
  const matchedProduct = CATALOGUE_PRODUCTS.find(
    (p) => p.id === id || p.ref === id
  );

  const isMayoDefault = !matchedProduct || matchedProduct.id === "BN-SC-1021-TC";
  const displayTitle = isMayoDefault
    ? "Mayo Dissecting Scissors"
    : matchedProduct.title;
  const displayRef = isMayoDefault
    ? "BN-SC-1021-TC • TUNGSTEN CARBIDE INLAYS"
    : `${matchedProduct.ref} • ${matchedProduct.alloy.toUpperCase()}`;

  const [selectedSpecimenIdx, setSelectedSpecimenIdx] = useState<number | null>(
    null
  );
  const [zoomed, setZoomed] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [selectedDimIdx, setSelectedDimIdx] = useState(1);
  const [bladeProfile, setBladeProfile] = useState<"straight" | "curved">(
    "straight"
  );
  const [activeTab, setActiveTab] = useState<
    "description" | "metallurgy" | "reprocessing" | "packaging"
  >("description");

  const activeHeroSrc =
    selectedSpecimenIdx !== null
      ? SPECIMEN_VIEWS[selectedSpecimenIdx].image
      : isMayoDefault
        ? PRIMARY_DETAIL_HERO_IMAGE
        : matchedProduct.image;

  const currentDim = DIMENSIONS[selectedDimIdx];

  return (
    <div className="flex flex-col w-full">
      {/* Breadcrumb Navigation & System Status Bar */}
      <section className="w-full bg-surface-container-lowest shadow-sm">
        <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-sm flex flex-wrap items-center justify-between gap-space-sm">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center space-x-2 font-label-md text-label-md text-secondary"
          >
            <Link
              className="hover:text-primary transition-colors flex items-center gap-1"
              to="/"
            >
              <span className="material-symbols-outlined text-[16px]">
                home
              </span>
              <span>Home</span>
            </Link>
            <span className="text-outline-variant font-label-code">/</span>
            <Link className="hover:text-primary transition-colors" to="/products">
              Products Catalogue
            </Link>
            <span className="text-outline-variant font-label-code">/</span>
            <Link
              className="hover:text-primary transition-colors"
              to="/products?category=Surgical+Instruments"
            >
              Surgical Instruments
            </Link>
            <span className="text-outline-variant font-label-code">/</span>
            <span className="text-secondary">
              {isMayoDefault ? "Scissors & Dissection" : matchedProduct.discipline}
            </span>
            <span className="text-outline-variant font-label-code">/</span>
            <span className="text-primary font-semibold">
              {displayTitle} ({isMayoDefault ? currentDim.ref : matchedProduct.ref})
            </span>
          </nav>

          <div className="flex items-center gap-space-md font-label-technical text-label-technical">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-low text-primary">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>AUDIT STATE: VALIDATED ISO-7153-1</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-secondary">
              <span className="material-symbols-outlined text-[16px]">
                qr_code_2
              </span>
              <span>GS1-UDI COMPLIANT</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Product Showcase Grid */}
      <section className="w-full py-space-lg lg:py-space-xl">
        <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
            {/* Left Column: Visual & Technical Inspection Module (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="relative bg-surface-container-lowest rounded-xl shadow-sm p-space-lg overflow-hidden group">
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                  <span className="font-label-code text-label-code tracking-widest text-secondary uppercase bg-surface-container-low px-2 py-0.5 rounded">
                    SCALE RATIO: 1:1 METRIC
                  </span>
                  <span className="font-label-technical text-label-technical text-on-surface-variant font-medium">
                    CHAMBER: SIALKOT METALLURGY LAB #4
                  </span>
                </div>

                {/* Precision Overlay Controls */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-surface-container-low p-1 rounded-lg">
                  <button
                    className={`w-8 h-8 rounded transition-colors flex items-center justify-center ${
                      zoomed
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container-lowest text-primary hover:bg-surface-container-high"
                    }`}
                    onClick={() => setZoomed((z) => !z)}
                    title="Magnify Apex"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      zoom_in
                    </span>
                  </button>
                  <button
                    className={`w-8 h-8 rounded transition-colors flex items-center justify-center ${
                      showGrid
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container-lowest text-secondary hover:text-primary hover:bg-surface-container-high"
                    }`}
                    onClick={() => setShowGrid((g) => !g)}
                    title="Orthographic Grid Toggle"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      grid_4x4
                    </span>
                  </button>
                  <button
                    className="w-8 h-8 rounded bg-surface-container-lowest text-secondary hover:text-primary hover:bg-surface-container-high transition-colors flex items-center justify-center"
                    onClick={() => setSelectedSpecimenIdx(null)}
                    title="Reset Specimen View"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      tune
                    </span>
                  </button>
                </div>

                {/* Primary High-Resolution Specimen Visual */}
                <div className="w-full aspect-[4/3] flex items-center justify-center relative p-space-md bg-gradient-to-b from-surface-container-lowest to-surface-container-low/40 rounded-lg overflow-hidden">
                  {showGrid && (
                    <div className="absolute inset-0 pointer-events-none opacity-45 bg-[linear-gradient(to_right,#c4c6ce_1px,transparent_1px),linear-gradient(to_bottom,#c4c6ce_1px,transparent_1px)] [background-size:24px_24px]" />
                  )}
                  <img
                    alt={`BLUENEEDLE ${displayTitle}`}
                    className={`max-h-[380px] w-auto object-contain transition-transform duration-300 ${
                      zoomed ? "scale-125" : "group-hover:scale-105"
                    }`}
                    src={activeHeroSrc}
                  />

                  {/* Reticle Caliper Graphic */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-secondary font-label-code text-label-code pointer-events-none opacity-60">
                    <span>|-- 0 mm</span>
                    <div className="flex-1 mx-3 h-px bg-secondary/30 relative">
                      <span className="absolute left-1/2 -top-2.5 -translate-x-1/2 text-[10px]">
                        TOLERANCE ±0.025 mm
                      </span>
                    </div>
                    <span>{currentDim.mm} --|</span>
                  </div>
                </div>

                <div className="mt-space-sm pt-space-xs flex items-center justify-between font-label-technical text-label-technical text-secondary">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      verified_user
                    </span>
                    Passivated &amp; Ultrasonic Decontaminated
                  </span>
                  <span>SURFACE ROUGHNESS: Ra &lt; 0.4 µm</span>
                </div>
              </div>

              {/* Interactive Detail Thumbnail Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
                {SPECIMEN_VIEWS.map((view, idx) => {
                  const active = selectedSpecimenIdx === idx;
                  return (
                    <button
                      key={view.label}
                      className={`p-2 rounded-lg text-left shadow-sm hover:shadow-md transition-all ${
                        active
                          ? "bg-surface-container ring-1 ring-primary"
                          : "bg-surface-container-lowest"
                      }`}
                      onClick={() =>
                        setSelectedSpecimenIdx(active ? null : idx)
                      }
                      type="button"
                    >
                      <div className="aspect-square bg-surface-container-low rounded flex items-center justify-center mb-1.5 overflow-hidden">
                        <img
                          alt={view.alt}
                          className="w-full h-full object-cover"
                          src={view.image}
                        />
                      </div>
                      <div className="font-label-code text-label-code text-primary font-medium truncate">
                        {view.label}
                      </div>
                      <div className="font-label-technical text-[10px] text-secondary truncate">
                        {view.sub}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Metallurgical & Quality Assurance Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm mt-space-xs">
                <div className="bg-surface-container-lowest p-space-sm rounded-lg shadow-sm flex items-start gap-space-xs">
                  <div className="w-8 h-8 rounded bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">
                      diamond
                    </span>
                  </div>
                  <div>
                    <h3 className="font-label-lg text-label-lg text-primary">
                      German Martensitic
                    </h3>
                    <p className="font-label-code text-label-code text-secondary">
                      AISI 420B / DIN 1.4021
                    </p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-space-sm rounded-lg shadow-sm flex items-start gap-space-xs">
                  <div className="w-8 h-8 rounded bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">
                      shield
                    </span>
                  </div>
                  <div>
                    <h3 className="font-label-lg text-label-lg text-primary">
                      ASTM A967 Passivated
                    </h3>
                    <p className="font-label-code text-label-code text-secondary">
                      Zero-Pit Chem Passivation
                    </p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-space-sm rounded-lg shadow-sm flex items-start gap-space-xs">
                  <div className="w-8 h-8 rounded bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">
                      fingerprint
                    </span>
                  </div>
                  <div>
                    <h3 className="font-label-lg text-label-lg text-primary">
                      Laser UID Tracked
                    </h3>
                    <p className="font-label-code text-label-code text-secondary">
                      Full Lot Traceability
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Product Metadata, Engineering Parameters & RFQ Actions (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-space-md">
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
                <div className="flex items-center justify-between gap-space-sm pb-space-sm">
                  <div className="flex items-center gap-1.5 font-label-technical text-label-technical text-secondary uppercase">
                    <span>
                      {isMayoDefault
                        ? "Cat. Scissors"
                        : matchedProduct.categoryTags[0]}
                    </span>
                    <span>•</span>
                    <span>
                      {isMayoDefault
                        ? "Sub-Class Dissection"
                        : matchedProduct.discipline}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-label-technical text-label-technical">
                    STOCK: EXPORT READY
                  </span>
                </div>

                <h1 className="font-headline-lg text-headline-lg text-primary mt-space-xs tracking-tight">
                  {displayTitle}
                </h1>
                <div className="font-label-technical text-label-technical text-secondary font-medium tracking-wide mt-1">
                  REF / MODEL: {displayRef}
                </div>

                <p className="font-body-md text-body-md text-on-surface-variant mt-space-md leading-relaxed">
                  {isMayoDefault
                    ? "Heavy-duty surgical dissecting scissors engineered for clean dissection and resection of dense connective tissue, aponeurosis, deep fascia, and surgical sutures. Manufactured with vacuum-brazed German tungsten carbide inserts (Hardness 70+ HRC) maintaining microscopic keenness through thousands of autoclave sterilization cycles."
                    : matchedProduct.description}
                </p>

                {/* Interactive Spec Configurator */}
                <div className="mt-space-md p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-label-technical text-label-technical uppercase text-secondary">
                      Select Operating Length:
                    </span>
                    <span className="font-label-technical text-label-technical font-semibold text-primary">
                      {currentDim.label}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {DIMENSIONS.map((dim, idx) => (
                      <button
                        key={dim.ref}
                        className={`px-3 py-2 rounded transition-colors text-center font-label-technical text-label-technical ${
                          selectedDimIdx === idx
                            ? "bg-primary text-on-primary"
                            : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-high"
                        }`}
                        onClick={() => setSelectedDimIdx(idx)}
                        type="button"
                      >
                        {dim.buttonLabel}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-label-technical text-label-technical uppercase text-secondary">
                      Blade Profile:
                    </span>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-1.5 font-label-technical text-label-technical text-primary cursor-pointer">
                        <input
                          checked={bladeProfile === "straight"}
                          className="accent-primary"
                          name="blade_profile"
                          onChange={() => setBladeProfile("straight")}
                          type="radio"
                          value="straight"
                        />
                        <span>Straight</span>
                      </label>
                      <label className="flex items-center gap-1.5 font-label-technical text-label-technical text-secondary cursor-pointer">
                        <input
                          checked={bladeProfile === "curved"}
                          className="accent-primary"
                          name="blade_profile"
                          onChange={() => setBladeProfile("curved")}
                          type="radio"
                          value="curved"
                        />
                        <span>Curved (Apex 15°)</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Deep Technical Specification Datum Matrix */}
                <div className="mt-space-md">
                  <h2 className="font-label-lg text-label-lg text-primary uppercase tracking-wider mb-space-xs">
                    Technical Specification Matrix
                  </h2>
                  <div className="overflow-hidden rounded-lg shadow-sm">
                    <table className="w-full text-left font-body-sm text-body-sm">
                      <tbody className="divide-y divide-surface-container">
                        <tr className="bg-surface-container-lowest">
                          <td className="py-2.5 px-3 font-label-technical text-label-technical text-secondary w-2/5">
                            Steel Alloy Grade
                          </td>
                          <td className="py-2.5 px-3 font-medium text-primary">
                            AISI 420B Martensitic + WC Inserts
                          </td>
                        </tr>
                        <tr className="bg-surface-container-low/60">
                          <td className="py-2.5 px-3 font-label-technical text-label-technical text-secondary">
                            Rockwell Hardness
                          </td>
                          <td className="py-2.5 px-3 font-label-technical text-label-technical text-primary">
                            Base: 52-54 HRC | Jaws: 71-73 HRC
                          </td>
                        </tr>
                        <tr className="bg-surface-container-lowest">
                          <td className="py-2.5 px-3 font-label-technical text-label-technical text-secondary">
                            Tip Geometry
                          </td>
                          <td className="py-2.5 px-3 text-primary">
                            Blunt / Blunt (Atraumatic dissection)
                          </td>
                        </tr>
                        <tr className="bg-surface-container-low/60">
                          <td className="py-2.5 px-3 font-label-technical text-label-technical text-secondary">
                            Hinge Friction Mechanism
                          </td>
                          <td className="py-2.5 px-3 text-primary">
                            Ground &amp; Hand-Lapped Flat Pivot Screw
                          </td>
                        </tr>
                        <tr className="bg-surface-container-lowest">
                          <td className="py-2.5 px-3 font-label-technical text-label-technical text-secondary">
                            Handle Identification
                          </td>
                          <td className="py-2.5 px-3 text-primary">
                            Dual Gold Titanium Nitride Rings (TC ID)
                          </td>
                        </tr>
                        <tr className="bg-surface-container-low/60">
                          <td className="py-2.5 px-3 font-label-technical text-label-technical text-secondary">
                            Optical Surface Finish
                          </td>
                          <td className="py-2.5 px-3 text-primary">
                            Satin Matte Anti-Reflective Glare Shield
                          </td>
                        </tr>
                        <tr className="bg-surface-container-lowest">
                          <td className="py-2.5 px-3 font-label-technical text-label-technical text-secondary">
                            Sterilization Protocols
                          </td>
                          <td className="py-2.5 px-3 font-label-technical text-label-technical text-primary">
                            Autoclave 134°C, EtO, Plasma, STERRAD
                          </td>
                        </tr>
                        <tr className="bg-surface-container-low/60">
                          <td className="py-2.5 px-3 font-label-technical text-label-technical text-secondary">
                            CE &amp; Medical Directives
                          </td>
                          <td className="py-2.5 px-3 text-primary">
                            MDR 2017/745 Class I(r), ISO 13485:2016
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Institutional Procurement Actions */}
                <div className="mt-space-lg flex flex-col gap-space-sm">
                  <button
                    className="w-full bg-primary-container text-on-primary hover:bg-primary transition-colors py-3.5 px-4 rounded font-label-lg text-label-lg font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm"
                    onClick={() =>
                      onOpenRfq(
                        `${currentDim.ref} (${displayTitle} • ${bladeProfile})`
                      )
                    }
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      assignment_turned_in
                    </span>
                    <span>Request Institution RFQ / Tender Quote</span>
                  </button>

                  <div className="grid grid-cols-2 gap-space-sm">
                    <button
                      className="w-full bg-surface-container text-primary hover:bg-surface-container-high transition-colors py-2.5 px-3 rounded font-label-technical text-label-technical flex items-center justify-center gap-1.5"
                      onClick={() =>
                        onOpenRfq(`CAD / STEP Blueprint: ${currentDim.ref}`)
                      }
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        download_for_offline
                      </span>
                      <span>CAD / STEP File</span>
                    </button>
                    <button
                      className="w-full bg-surface-container text-primary hover:bg-surface-container-high transition-colors py-2.5 px-3 rounded font-label-technical text-label-technical flex items-center justify-center gap-1.5"
                      onClick={() =>
                        onOpenRfq(`Export Spec Sheet PDF: ${currentDim.ref}`)
                      }
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        picture_as_pdf
                      </span>
                      <span>Export Spec Sheet</span>
                    </button>
                  </div>

                  {/* Direct Technical Advisory CTA Prompt */}
                  <div className="mt-space-xs p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between gap-space-sm">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[20px] text-primary">
                        engineering
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-technical text-label-technical text-primary font-semibold">
                          Custom Stamping or OEM Geometry?
                        </span>
                        <span className="font-body-sm text-body-sm text-secondary">
                          Direct hotline to Sialkot production metallurgists.
                        </span>
                      </div>
                    </div>
                    <a
                      className="shrink-0 px-3 py-1.5 rounded bg-surface-container-lowest text-primary hover:bg-surface-container-high font-label-technical text-label-technical transition-colors"
                      href="mailto:engineering@blueneedle.com"
                    >
                      Contact Lab
                    </a>
                  </div>
                </div>
              </div>

              {/* Export Shipping Logistics Capsule */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between font-label-technical text-label-technical text-secondary">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-primary">
                    flight_takeoff
                  </span>
                  <span>
                    Direct Port Air Cargo: Lahore / Sialkot to FRA, CDG, ORD, LHR
                  </span>
                </div>
                <span className="text-primary font-semibold">MOQ: 25 Units</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Discipline Engineering Tabs Section */}
      <section className="w-full py-space-xl bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
          <div
            className="flex flex-wrap items-center gap-2 border-b-0 pb-space-sm"
            role="tablist"
          >
            {[
              {
                id: "description" as const,
                icon: "medical_services",
                label: "Surgical Applications",
              },
              {
                id: "metallurgy" as const,
                icon: "science",
                label: "Material & Metallurgy",
              },
              {
                id: "reprocessing" as const,
                icon: "clean_hands",
                label: "Reprocessing & Passivation",
              },
              {
                id: "packaging" as const,
                icon: "inventory_2",
                label: "Packaging & Bulk Logistics",
              },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  className={`px-space-md py-2.5 rounded-lg font-label-lg text-label-lg transition-all flex items-center gap-2 ${
                    active
                      ? "bg-surface-container-lowest text-primary font-semibold shadow-sm"
                      : "bg-transparent text-secondary hover:text-primary hover:bg-surface-container-lowest/60 font-medium"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={active}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {activeTab === "description" && (
            <div className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-sm mt-space-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
                <div className="lg:col-span-8 flex flex-col gap-space-md">
                  <div>
                    <span className="font-label-technical text-label-technical text-secondary uppercase tracking-widest">
                      Clinical Protocol Reference
                    </span>
                    <h3 className="font-headline-md text-headline-md text-primary mt-1">
                      Deep Fascial Dissection &amp; Connective Tissue Excision
                    </h3>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    The Mayo dissecting scissor design is the worldwide clinical
                    benchmark for heavy operative dissection where delicate
                    micro-scissors (such as Iris or Metzenbaum) risk edge buckling
                    or deflection. Constructed with a robust blade thickness, the
                    BN-SC-1021 series transfers surgeon leverage efficiently across
                    tough, fibrous anatomical substrates.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md mt-space-xs">
                    <div className="bg-surface-container-low p-space-md rounded-lg">
                      <h4 className="font-label-lg text-label-lg text-primary flex items-center gap-2 mb-1.5">
                        <span className="material-symbols-outlined text-[18px] text-secondary">
                          check_circle
                        </span>
                        <span>Primary Indications</span>
                      </h4>
                      <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                        <li>
                          • General Laparotomy and deep abdominal wall incision
                        </li>
                        <li>• Orthopedic fibrous joint capsule incision</li>
                        <li>
                          • Thoracic pericardial and pleural tissue dissection
                        </li>
                        <li>
                          • Heavy surgical suture cutting (monofilament /
                          braided)
                        </li>
                      </ul>
                    </div>
                    <div className="bg-surface-container-low p-space-md rounded-lg">
                      <h4 className="font-label-lg text-label-lg text-primary flex items-center gap-2 mb-1.5">
                        <span className="material-symbols-outlined text-[18px] text-secondary">
                          architecture
                        </span>
                        <span>Biomechanical Attributes</span>
                      </h4>
                      <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                        <li>
                          • Rounded tip profile prevents unintended organ puncture
                        </li>
                        <li>
                          • Balanced fulcrum creates minimal hand fatigue in
                          prolonged OR cases
                        </li>
                        <li>
                          • Hand-sharpened secondary relief angle prevents jamming
                        </li>
                        <li>
                          • Gold ring coating withstands harsh thermal
                          disinfectors
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-surface-container p-space-md rounded-xl flex flex-col justify-between">
                  <div className="flex flex-col gap-space-sm">
                    <span className="font-label-technical text-label-technical text-secondary uppercase">
                      Comparative Stress Profile
                    </span>
                    <h4 className="font-headline-sm text-headline-sm text-primary">
                      Vacuum Brazed TC Edge Performance
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Standard stainless surgical scissors experience micro-burrs
                      after approximately 120 continuous cuts through tough
                      fascia. BLUENEEDLE Tungsten Carbide brazing maintains
                      cutting acuity for 1,200+ procedures.
                    </p>
                    <div className="w-full bg-surface-container-lowest p-3 rounded-lg mt-2">
                      <div className="flex items-center justify-between font-label-code text-[11px] text-secondary mb-1">
                        <span>CUT SHARPNESS RETENTION</span>
                        <span className="text-primary font-bold">
                          10x STANDARD
                        </span>
                      </div>
                      <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mb-2">
                        <div
                          className="bg-primary h-full rounded-full"
                          style={{ width: "94%" }}
                        />
                      </div>
                      <div className="flex items-center justify-between font-label-code text-[11px] text-secondary mb-1">
                        <span>STANDARD SS INSTRUMENT</span>
                        <span>1x BASELINE</span>
                      </div>
                      <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-secondary/40 h-full rounded-full"
                          style={{ width: "25%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-space-md pt-space-xs font-label-code text-label-code text-secondary">
                    DIN EN ISO 7153-1 Material Compliance Verified
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "metallurgy" && (
            <div className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-sm mt-space-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
                <div className="lg:col-span-7 flex flex-col gap-space-md">
                  <div>
                    <span className="font-label-technical text-label-technical text-secondary uppercase tracking-widest">
                      Chemical Spectrometry Analysis
                    </span>
                    <h3 className="font-headline-md text-headline-md text-primary mt-1">
                      Martensitic Alloy Formulation (DIN 1.4021)
                    </h3>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Every production lot of BLUENEEDLE surgical scissors is forged
                    from certified European billets of vacuum-arc remelted
                    martensitic steel. Blade edges feature sintered Tungsten
                    Carbide (90% WC / 10% Co) brazed at 1,020°C in an
                    argon-shielded vacuum furnace to eliminate intercrystalline
                    micro-voids.
                  </p>
                  <div className="overflow-hidden rounded-lg bg-surface-container-low p-space-md">
                    <span className="font-label-technical text-label-technical text-primary font-semibold mb-2 block">
                      ELEMENTAL COMPOSITION BOUNDS (% BY WEIGHT)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-label-code text-label-code">
                      <div className="bg-surface-container-lowest p-2 rounded">
                        <div className="text-secondary">Carbon (C)</div>
                        <div className="text-primary font-semibold text-label-technical">
                          0.16 - 0.25%
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2 rounded">
                        <div className="text-secondary">Chromium (Cr)</div>
                        <div className="text-primary font-semibold text-label-technical">
                          12.0 - 14.0%
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2 rounded">
                        <div className="text-secondary">Silicon (Si)</div>
                        <div className="text-primary font-semibold text-label-technical">
                          ≤ 1.00%
                        </div>
                      </div>
                      <div className="bg-surface-container-lowest p-2 rounded">
                        <div className="text-secondary">Manganese (Mn)</div>
                        <div className="text-primary font-semibold text-label-technical">
                          ≤ 1.50%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-surface-container p-space-md rounded-xl flex flex-col gap-space-sm justify-center">
                  <h4 className="font-headline-sm text-headline-sm text-primary">
                    Microhardness Rockwell Profile
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Targeted differential heat-treatment creates flexible spring
                    temper through the shanks to prevent catastrophic fracture
                    during torsional stress, coupled with ultra-hard cutting
                    bevels.
                  </p>
                  <div className="p-3 bg-surface-container-lowest rounded-lg font-label-code text-label-code space-y-1">
                    <div className="flex justify-between">
                      <span>SHANK / RING REGION:</span>
                      <span className="text-primary font-bold">42 - 45 HRC</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CENTRAL PIVOT BOSS:</span>
                      <span className="text-primary font-bold">50 - 52 HRC</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TC BRAZED INSERT:</span>
                      <span className="text-primary font-bold">71 - 74 HRC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reprocessing" && (
            <div className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-sm mt-space-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
                <div className="lg:col-span-8 flex flex-col gap-space-md">
                  <div>
                    <span className="font-label-technical text-label-technical text-secondary uppercase tracking-widest">
                      CSSD / Sterile Processing Department Protocol
                    </span>
                    <h3 className="font-headline-md text-headline-md text-primary mt-1">
                      Validated Decontamination &amp; Autoclave Parameters
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div className="bg-surface-container-low p-space-md rounded-lg">
                      <span className="font-label-technical text-label-technical text-primary font-semibold">
                        1. ULTRASONIC &amp; WASHER-DISINFECTOR
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        Place in wire mesh cassettes in fully open scissor state.
                        Utilize pH-neutral enzymatic detergent (pH 7.0–8.5).
                        Thermal disinfection phase at 93°C (200°F) for minimum 10
                        minutes.
                      </p>
                    </div>
                    <div className="bg-surface-container-low p-space-md rounded-lg">
                      <span className="font-label-technical text-label-technical text-primary font-semibold">
                        2. STEAM AUTOCLAVE PROTOCOL
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        Fractionated pre-vacuum cycle: 134°C (273°F) for 4 to 18
                        minutes holding time; vacuum drying phase minimum 20
                        minutes to prevent surface staining.
                      </p>
                    </div>
                  </div>
                  <div className="p-space-sm bg-surface-container rounded-lg font-label-technical text-label-technical text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">
                      info
                    </span>
                    <span>
                      LUBRICATION NOTE: Apply medical-grade water-soluble
                      silicone-free instrument milk to the screw joint pivot prior
                      to autoclaving.
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between">
                  <h4 className="font-headline-sm text-headline-sm text-primary">
                    Prohibited Chemistry
                  </h4>
                  <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant mt-2">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-error text-[18px]">
                        cancel
                      </span>
                      No bleach, sodium hypochlorite or free chloride ions.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-error text-[18px]">
                        cancel
                      </span>
                      No abrasive steel wool or wire scrubbing brushes.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-error text-[18px]">
                        cancel
                      </span>
                      Do not soak beyond manufacturer recommended enzymatic bath
                      times.
                    </li>
                  </ul>
                  <div className="font-label-code text-label-code text-secondary mt-space-md">
                    Validated to AAMI TIR12 &amp; ISO 17664-1
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "packaging" && (
            <div className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-sm mt-space-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
                <div className="lg:col-span-8 flex flex-col gap-space-md">
                  <div>
                    <span className="font-label-technical text-label-technical text-secondary uppercase tracking-widest">
                      Institutional Supply Chain
                    </span>
                    <h3 className="font-headline-md text-headline-md text-primary mt-1">
                      Master Carton Specs &amp; OEM Private Label Packaging
                    </h3>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Instruments are individually packaged in medical-grade clear
                    polyethylene moisture-barrier pouches with VCI (Vapor
                    Corrosion Inhibitor) inserts, protected by rigid tip
                    protectors to ensure flawless arrival at destination
                    hospitals.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm font-label-technical text-label-technical">
                    <div className="bg-surface-container-low p-space-sm rounded">
                      <div className="text-secondary">PRIMARY POUCH</div>
                      <div className="text-primary font-semibold mt-1">
                        1 pc / Medical Peel Pouch
                      </div>
                    </div>
                    <div className="bg-surface-container-low p-space-sm rounded">
                      <div className="text-secondary">INNER BOX</div>
                      <div className="text-primary font-semibold mt-1">
                        10 Units / Barcoded Box
                      </div>
                    </div>
                    <div className="bg-surface-container-low p-space-sm rounded">
                      <div className="text-secondary">MASTER SHIPPER</div>
                      <div className="text-primary font-semibold mt-1">
                        100 Units / 5-Ply Export Ctn
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-surface-container p-space-md rounded-xl flex flex-col justify-between">
                  <h4 className="font-headline-sm text-headline-sm text-primary">
                    Custom OEM Stamping
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    We offer fiber laser etching of hospital emblems, procurement
                    batch numbers, data matrix 2D barcodes, and distributor
                    private brand marks directly in our ISO cleanrooms.
                  </p>
                  <button
                    className="w-full bg-primary text-on-primary py-2 rounded font-label-technical text-label-technical uppercase mt-space-sm"
                    onClick={() =>
                      onOpenRfq(`OEM Stamping Inquiry: ${currentDim.ref}`)
                    }
                    type="button"
                  >
                    Inquire OEM Stamping Terms
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Complementary Surgical Instruments Section */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-lg">
            <div>
              <span className="font-label-technical text-label-technical text-secondary uppercase tracking-wider">
                Surgical Tray Set Synergy
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1">
                Complementary Surgical Instruments
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
              Standard general surgery and major laparotomy instrument tray
              configurations paired with the Mayo dissecting scissor line.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
            {COMPLEMENTARY_CARDS.map((card) => (
              <div
                key={card.ref}
                className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative w-full aspect-square bg-surface-container-low rounded-lg mb-space-sm overflow-hidden flex items-center justify-center p-space-sm">
                    <span className="absolute top-2 left-2 font-label-code text-[10px] text-secondary bg-surface-container-lowest px-1.5 py-0.5 rounded">
                      {card.badge}
                    </span>
                    <img
                      alt={card.alt}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      src={card.image}
                    />
                  </div>
                  <div className="font-label-technical text-label-technical text-secondary">
                    {card.ref}
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mt-1 group-hover:text-secondary transition-colors">
                    {card.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 line-clamp-2">
                    {card.description}
                  </p>
                </div>
                <div className="mt-space-md pt-space-sm flex items-center justify-between">
                  <span className="font-label-code text-label-code text-secondary">
                    {card.length}
                  </span>
                  <Link
                    className="font-label-lg text-label-lg text-primary font-semibold hover:underline flex items-center gap-1"
                    to={`/products/${card.id}`}
                  >
                    <span>View Specs</span>
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
