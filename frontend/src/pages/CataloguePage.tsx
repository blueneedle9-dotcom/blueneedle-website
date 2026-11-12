import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CatalogItem,
  VANGUARD_CATALOG,
} from "../data/catalog";

interface CataloguePageProps {
  onOpenRfq: (targetLabel?: string) => void;
  manifestRefs: string[];
  onToggleManifest: (refCode: string) => void;
}

export const CataloguePage: React.FC<CataloguePageProps> = ({
  onOpenRfq,
  manifestRefs,
  onToggleManifest,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDiscipline = searchParams.get("discipline") || "All";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(initialDiscipline);
  const [selectedAlloy, setSelectedAlloy] = useState<string>("All");
  const [selectedSurface, setSelectedSurface] = useState<string>("All");
  const [selectedLength, setSelectedLength] = useState<string>("180 mm");
  const [activeAngleTab, setActiveAngleTab] = useState<string>("Full Profile");
  const [specModalItem, setSpecModalItem] = useState<CatalogItem | null>(null);

  const disciplines = [
    { label: "All Disciplines", count: 1842, value: "All" },
    { label: "Scissors & Cutting", count: 248, value: "Scissors & Cutting" },
    { label: "Forceps & Clamps", count: 312, value: "Forceps & Clamps" },
    { label: "Needle Holders", count: 156, value: "Needle Holders" },
    { label: "Retractors & Specula", count: 190, value: "Retractors & Specula" },
    { label: "Orthopedic Suite", count: 215, value: "Orthopedic Suite" },
    { label: "Diagnostic & Micro", count: 160, value: "Diagnostic & Micro" },
  ];

  const filteredItems = useMemo(() => {
    return VANGUARD_CATALOG.filter((item) => {
      const matchSearch =
        !searchTerm.trim() ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.discipline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.norm.toLowerCase().includes(searchTerm.toLowerCase());

      const matchDiscipline =
        selectedDiscipline === "All" ||
        item.discipline.toLowerCase().includes(selectedDiscipline.toLowerCase()) ||
        (selectedDiscipline === "Retractors" && item.discipline.includes("Retractor"));

      const matchAlloy =
        selectedAlloy === "All" ||
        item.material.toLowerCase().includes(selectedAlloy.toLowerCase());

      const matchSurface =
        selectedSurface === "All" ||
        (item.finish + " " + (item.tag || "")).toLowerCase().includes(selectedSurface.toLowerCase());

      return matchSearch && matchDiscipline && matchAlloy && matchSurface;
    });
  }, [searchTerm, selectedDiscipline, selectedAlloy, selectedSurface]);

  return (
    <div className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
      <div className="flex flex-col w-full">
        {/* Top Navigation Sub-Bar & Breadcrumbs */}
        <section className="w-full bg-surface-container-low py-space-md">
          <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-margin">
            <div className="flex flex-wrap items-center justify-between gap-space-sm">
              <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
                <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">home</span>
                  Home
                </Link>
                <span className="text-outline">/</span>
                <span className="hover:text-primary transition-colors cursor-pointer">Surgical Products</span>
                <span className="text-outline">/</span>
                <span className="text-primary font-semibold">Catalog &amp; Specifications</span>
              </nav>

              <div className="flex items-center gap-space-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-wider bg-surface-container-lowest text-primary px-space-sm py-1 rounded shadow-sm">
                  DIN EN ISO 13485:2016 Certified
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider bg-surface-container-lowest text-on-surface-variant px-space-sm py-1 rounded shadow-sm">
                  MDR 2017/745 Class IIa
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section Hero Header & Architectural Intro */}
        <section className="w-full bg-surface-container-lowest pt-space-xl pb-space-lg">
          <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-margin">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-end">
              <div className="lg:col-span-8 flex flex-col">
                <div className="flex items-center gap-space-sm mb-space-xs">
                  <span className="h-2 w-2 rounded-full bg-primary-container"></span>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
                    Hospital Supply &amp; Clinical Procurement
                  </span>
                </div>
                <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight font-semibold">
                  Surgical Instrumentation Catalog &amp; Specifications
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-sm max-w-3xl leading-relaxed">
                  Over 1,800 German DIN &amp; ASTM compliant surgical instruments across 10 specialized surgical disciplines. Access calibrated dimensional specifications, metallurgical alloy grades, laser etch keys, and institutional tender packages.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-end gap-space-sm">
                <div className="bg-surface-container-low p-space-md rounded-lg flex items-center justify-between shadow-sm">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">Active Inventory</span>
                    <span className="font-headline-md text-headline-md font-semibold text-primary">1,842 Items</span>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">inventory_2</span>
                  </div>
                </div>

                <div className="bg-surface-container-low p-space-md rounded-lg flex items-center justify-between shadow-sm">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">RFQ Batch Tray</span>
                    <span className="font-headline-md text-headline-md font-semibold text-primary">
                      {manifestRefs.length} Selected
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenRfq()}
                    className="font-label-sm text-label-sm text-primary uppercase font-semibold underline underline-offset-4 hover:opacity-80"
                  >
                    Submit Tender →
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Technical Filter Console */}
            <div className="mt-space-xl bg-surface-container-low p-space-lg rounded-xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center mb-space-lg">
                <div className="md:col-span-6 relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                    search
                  </span>
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md pl-10 pr-space-md py-2.5 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-container transition-all"
                    placeholder="Search by SKU (e.g. VSP-2044-TC), DIN Standard, keyword, or anatomy..."
                    type="text"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline mb-1">
                    Alloy Grade
                  </label>
                  <select
                    value={selectedAlloy}
                    onChange={(e) => setSelectedAlloy(e.target.value)}
                    className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-space-md py-2.5 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-container"
                  >
                    <option value="All">All Metallurgical Grades</option>
                    <option value="1.4117">DIN 1.4117 (X38CrMoV15)</option>
                    <option value="1.4021">DIN 1.4021 (AISI 420)</option>
                    <option value="Titanium">Titanium Grade 5 (Ti-6Al-4V)</option>
                    <option value="1.4125">German High-Carbon 1.4125</option>
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline mb-1">
                    Tip &amp; Surface Metallurgy
                  </label>
                  <select
                    value={selectedSurface}
                    onChange={(e) => setSelectedSurface(e.target.value)}
                    className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-space-md py-2.5 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-container"
                  >
                    <option value="All">All Surface Modifications</option>
                    <option value="Tungsten">Tungsten Carbide (WC Inserts)</option>
                    <option value="Satin">Electrolytic Satin Bead-Blast</option>
                    <option value="DLC">DLC Ceramic Anti-Friction Black</option>
                  </select>
                </div>
              </div>

              {/* Discipline Category Pills */}
              <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline whitespace-nowrap mr-2">
                  Discipline:
                </span>
                {disciplines.map((d) => {
                  const isActive = selectedDiscipline === d.value;
                  return (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => {
                        setSelectedDiscipline(d.value);
                        setSearchParams(d.value === "All" ? {} : { discipline: d.value });
                      }}
                      className={`font-label-sm text-label-sm px-space-md py-1.5 rounded uppercase tracking-wider whitespace-nowrap shadow-sm transition-all ${
                        isActive
                          ? "bg-primary text-on-primary font-semibold"
                          : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"
                      }`}
                    >
                      {d.label} ({d.count})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Flagship Featured Product Deep-Dive Spotlight Module */}
        <section className="w-full bg-surface-container-low py-space-xl">
          <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-margin">
            <div className="flex items-center justify-between mb-space-lg">
              <div className="flex items-center gap-space-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-widest px-2.5 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                  Calibrated Spotlight Inspection
                </span>
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Ref Standard DIN 58298 / ISO 7153-1
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                Lot-Tracked Laser DataMatrix GS1
              </span>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
                {/* Left Column: Interactive Image Inspection Gallery */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div className="relative bg-surface rounded-lg overflow-hidden p-space-lg flex items-center justify-center min-h-[380px] shadow-inner">
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      <span className="bg-surface-container-lowest text-primary font-label-sm text-label-sm px-2 py-0.5 rounded shadow-sm font-semibold">
                        Gold Rings: WC Insert
                      </span>
                      <span className="bg-surface-container-lowest text-secondary font-label-sm text-label-sm px-2 py-0.5 rounded shadow-sm">
                        Reflectance: 2.8%
                      </span>
                    </div>

                    <img
                      className="w-full h-80 object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
                      alt="Metzenbaum-Fino curved dissecting scissors with gold-plated finger rings"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbcd9pqEG_GaGJuoGiwmwS5alcTw2eI6B1-oMC5-0CQIRsNNAl4mrbM-J4aCPiDGfqQ3AroDyIf-SPu6BDZKNFEElYndsh7Q9zQH66XeBMya9envsg5RmXVRvagoskfABvRhotwx4rC1WocXFqU3kQ8MOGxKBufa_4xdtQEWuCutmDFVb6Pga-u6R54UO0R4BPyRMAZQH0Mu9e6qcqYkIMt0EfDyT2aT8SYQGdJvo0"
                    />

                    <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm px-3 py-1 rounded text-outline font-label-sm text-label-sm">
                      Scale: 1:1 Precision CAD Render | Calibrated to 0.02mm
                    </div>
                  </div>

                  {/* Multi-Angle Thumbnail Matrix */}
                  <div className="grid grid-cols-4 gap-space-sm mt-space-md">
                    {[
                      { id: "Full Profile", icon: "precision_manufacturing" },
                      { id: "Micro-Serration", icon: "linear_scale" },
                      { id: "Screw Hinge Lock", icon: "adjust" },
                      { id: "TC Gold Rings", icon: "verified_user" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveAngleTab(tab.id)}
                        className={`p-2 rounded-lg text-left shadow-sm transition-all ${
                          activeAngleTab === tab.id
                            ? "bg-surface-container border border-primary/20"
                            : "bg-surface hover:bg-surface-container"
                        }`}
                      >
                        <div className="w-full h-12 bg-surface-container-low rounded flex items-center justify-center mb-1 overflow-hidden">
                          <span className="material-symbols-outlined text-outline text-[20px]">
                            {tab.icon}
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-primary block truncate font-semibold">
                          {tab.id}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Metallurgy & Tolerance Metric Snippet */}
                  <div className="mt-space-md bg-surface p-space-md rounded-lg grid grid-cols-3 gap-space-sm text-center">
                    <div>
                      <span className="font-label-sm text-label-sm text-outline uppercase block">Core Hardness</span>
                      <span className="font-headline-sm text-headline-sm font-semibold text-primary">56 HRC</span>
                      <span className="font-label-sm text-label-sm text-secondary block mt-0.5">DIN 50103</span>
                    </div>
                    <div>
                      <span className="font-label-sm text-label-sm text-outline uppercase block">TC Insert Hardness</span>
                      <span className="font-headline-sm text-headline-sm font-semibold text-primary">70 HRC</span>
                      <span className="font-label-sm text-label-sm text-secondary block mt-0.5">Vickers HV 1200</span>
                    </div>
                    <div>
                      <span className="font-label-sm text-label-sm text-outline uppercase block">Autoclave Longevity</span>
                      <span className="font-headline-sm text-headline-sm font-semibold text-primary">&gt; 1,200</span>
                      <span className="font-label-sm text-label-sm text-secondary block mt-0.5">Validated Cycles</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Technical Ledger & Specifications */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-space-sm mb-space-xs">
                      <span className="bg-surface-container px-2.5 py-0.5 rounded font-label-sm text-label-sm text-primary font-semibold">
                        SKU: VSP-2044-TC
                      </span>
                      <span className="text-outline font-label-sm text-label-sm">NATO Stock: 6515-01-442-9912</span>
                      <span className="text-outline font-label-sm text-label-sm">GMDN: 13495</span>
                    </div>

                    <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-semibold">
                      Metzenbaum-Fino Dissecting Scissors (Curved)
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      Engineered with vacuum-brazed micro-grain Tungsten Carbide inserts and precision micro-serrated counter-blade. Eliminates anatomical tissue slippage during delicate cardiovascular, plastic, and thoracic micro-dissection.
                    </p>

                    <div className="mt-space-md bg-surface rounded-lg p-space-md">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-space-lg gap-y-space-sm">
                        <div className="py-1">
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">Discipline Classification</span>
                          <span className="font-body-md text-body-md font-semibold text-on-surface">Cardiovascular, Plastic &amp; General Surgery</span>
                        </div>
                        <div className="py-1">
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">Blade Tip Profile</span>
                          <span className="font-body-md text-body-md font-semibold text-on-surface">Delicate Curved / Micro-Fino Tip</span>
                        </div>
                        <div className="py-1">
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">Primary Metallurgy</span>
                          <span className="font-body-md text-body-md font-semibold text-on-surface">German Stainless Steel DIN 1.4117 (Cryogenic)</span>
                        </div>
                        <div className="py-1">
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">Surface Finishing</span>
                          <span className="font-body-md text-body-md font-semibold text-on-surface">Electrolytic Satin Bead-Blast (&lt;3.2% Gloss)</span>
                        </div>
                        <div className="py-1">
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">Hinge Assembly</span>
                          <span className="font-body-md text-body-md font-semibold text-on-surface">Adjustable Torx Flush Screw / Precision Bevel</span>
                        </div>
                        <div className="py-1">
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">Validated Sterilization</span>
                          <span className="font-body-md text-body-md font-semibold text-on-surface">134°C Steam (Pre-vac 4 min), STERRAD 100NX</span>
                        </div>
                      </div>

                      {/* Working Length Selection Matrix */}
                      <div className="mt-space-md pt-space-sm">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-2">
                          Available Working Lengths (Select to Inspect)
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs">
                          {["145 mm", "180 mm", "200 mm", "230 mm"].map((len) => (
                            <button
                              key={len}
                              type="button"
                              onClick={() => setSelectedLength(len)}
                              className={`p-2 rounded shadow-sm text-center transition-colors ${
                                selectedLength === len
                                  ? "bg-primary text-on-primary font-semibold"
                                  : "bg-surface-container-lowest hover:bg-surface-container text-primary"
                              }`}
                            >
                              <span className="font-body-sm text-body-sm block">{len}</span>
                              <span className="font-label-sm text-label-sm opacity-80 block">
                                {len === "180 mm" ? '7" (Standard)' : `${len}`}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action & Tender Procurement Triggers */}
                  <div className="mt-space-lg pt-space-md flex flex-wrap items-center gap-space-md">
                    <button
                      type="button"
                      onClick={() => onToggleManifest("VSP-2044-TC")}
                      className="bg-primary-container text-on-primary font-label-lg text-label-lg px-space-lg py-3 rounded-lg hover:brightness-110 active:brightness-95 transition-all shadow-sm flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {manifestRefs.includes("VSP-2044-TC") ? "check" : "playlist_add"}
                      </span>
                      <span>
                        {manifestRefs.includes("VSP-2044-TC")
                          ? "Added to RFQ Tray"
                          : "Add Instrument to RFQ Tray"}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenRfq("Metzenbaum-Fino TC Scissors Spec Sheet")}
                      className="bg-surface-container-lowest text-primary font-label-lg text-label-lg px-space-lg py-3 rounded-lg shadow-sm hover:bg-surface-container transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                      <span>Download Technical Spec (.PDF)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenRfq("Metzenbaum-Fino 3D CAD STEP File")}
                      className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
                      <span>STEP 3D CAD</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Systematic Product Catalog Grid */}
        <section className="w-full bg-surface py-space-xxl">
          <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-margin">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md mb-space-xl">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline block mb-1">
                  Systematic Instrument Matrix
                </span>
                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-semibold">
                  Precision Instrumentation Repository
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Displaying {filteredItems.length} high-demand surgical standard patterns, dissecting forceps, bone rongeurs, and self-retaining systems.
                </p>
              </div>

              <div className="flex items-center gap-space-sm">
                <span className="font-label-md text-label-md text-outline">Sort by:</span>
                <select className="bg-surface-container-lowest text-on-surface font-label-md text-label-md px-space-md py-2 rounded-lg shadow-sm focus:outline-none">
                  <option>Standard Surgical Nomenclature</option>
                  <option>SKU Numeric Sequence</option>
                  <option>Working Tip Width</option>
                  <option>Alloy Density / Material</option>
                </select>
              </div>
            </div>

            {/* 8-Product Systematic Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
              {filteredItems.map((item) => {
                const inTray = manifestRefs.includes(item.sku);
                return (
                  <div
                    key={item.sku}
                    className="bg-surface-container-lowest rounded-xl p-space-md flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="relative bg-surface rounded-lg h-48 p-space-sm flex items-center justify-center mb-space-md overflow-hidden">
                        <span className="absolute top-2 left-2 bg-surface-container-lowest text-primary font-label-sm text-label-sm px-2 py-0.5 rounded shadow-sm">
                          {item.sku}
                        </span>
                        <span className="absolute top-2 right-2 bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-1.5 py-0.5 rounded">
                          {item.norm}
                        </span>
                        <img
                          className="h-36 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform"
                          alt={item.imageAlt}
                          src={item.image}
                        />
                      </div>

                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary block">
                        {item.discipline}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-primary font-semibold tracking-tight mt-1 leading-snug">
                        {item.name}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Technical Mini Spec Table */}
                      <div className="mt-space-md bg-surface rounded p-space-sm grid grid-cols-2 gap-x-2 gap-y-1.5 text-body-sm">
                        <div>
                          <span className="font-label-sm text-label-sm text-outline block">Total Length</span>
                          <span className="font-body-sm text-body-sm font-semibold text-primary">{item.length}</span>
                        </div>
                        <div>
                          <span className="font-label-sm text-label-sm text-outline block">Tip Profile</span>
                          <span className="font-body-sm text-body-sm font-semibold text-primary truncate block">{item.jawProfile}</span>
                        </div>
                        <div>
                          <span className="font-label-sm text-label-sm text-outline block">Material</span>
                          <span className="font-body-sm text-body-sm font-semibold text-primary truncate block">{item.material}</span>
                        </div>
                        <div>
                          <span className="font-label-sm text-label-sm text-outline block">Finish</span>
                          <span className="font-body-sm text-body-sm font-semibold text-primary truncate block">{item.finish}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-space-md pt-space-sm flex items-center justify-between gap-space-xs">
                      <button
                        type="button"
                        onClick={() => setSpecModalItem(item)}
                        className="text-primary font-label-md text-label-md hover:underline flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        Spec Sheet
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleManifest(item.sku)}
                        className={`font-label-sm text-label-sm uppercase tracking-wider px-space-sm py-1.5 rounded transition-colors shadow-sm ${
                          inTray
                            ? "bg-primary text-on-primary"
                            : "bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary"
                        }`}
                      >
                        {inTray ? "In RFQ Tray" : "+ Add to RFQ"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Spec Sheet Modal */}
      {specModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest max-w-xl w-full rounded-xl shadow-2xl p-6 border border-outline-variant/30 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-4">
              <div>
                <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded bg-surface-container">
                  {specModalItem.sku}
                </span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-primary mt-1">
                  {specModalItem.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSpecModalItem(null)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-primary transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center justify-center p-4 bg-surface rounded-lg mb-4">
              <img
                src={specModalItem.image}
                alt={specModalItem.imageAlt}
                className="h-44 object-contain"
              />
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
              {specModalItem.description}
            </p>

            <div className="bg-surface-container-low rounded-lg p-3 grid grid-cols-2 gap-2 text-xs mb-6">
              <div><strong>Discipline:</strong> {specModalItem.discipline}</div>
              <div><strong>Norm / Standard:</strong> {specModalItem.norm}</div>
              <div><strong>Length:</strong> {specModalItem.length}</div>
              <div><strong>Tip Profile:</strong> {specModalItem.jawProfile}</div>
              <div><strong>Metallurgy:</strong> {specModalItem.material}</div>
              <div><strong>Surface Finish:</strong> {specModalItem.finish}</div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  onToggleManifest(specModalItem.sku);
                  setSpecModalItem(null);
                }}
                className="px-4 py-2 rounded-lg bg-surface-container text-primary font-semibold text-sm hover:bg-surface-container-high transition-colors"
              >
                {manifestRefs.includes(specModalItem.sku) ? "Remove from RFQ" : "+ Add to RFQ Tray"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSpecModalItem(null);
                  onOpenRfq(specModalItem.name);
                }}
                className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-semibold text-sm hover:brightness-110 transition-all"
              >
                Request Quotation Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
