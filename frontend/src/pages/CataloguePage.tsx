import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CATALOGUE_PRODUCTS } from "../data/catalog";

interface CataloguePageProps {
  onOpenRfq: (targetLabel?: string) => void;
  manifestRefs: string[];
  onToggleManifest: (refCode: string) => void;
}

const CATEGORY_FILTERS = [
  { name: "Surgical Instruments", count: 840 },
  { name: "Medical Instruments", count: 420 },
  { name: "Dental Instruments", count: 360 },
  { name: "Orthopedic Instruments", count: 310 },
  { name: "Ophthalmic Instruments", count: 250 },
  { name: "Forceps & Tweezers", count: 510 },
  { name: "Scissors & Shears", count: 380 },
  { name: "Needle Holders", count: 290 },
  { name: "Retractors", count: 210 },
  { name: "Clamps & Hemostats", count: 330 },
  { name: "Bone Instruments", count: 195 },
  { name: "Elevators & Curettes", count: 145 },
];

const ALLOY_FILTERS = [
  { name: "AISI 420 Stainless Steel", count: "1,410" },
  { name: "AISI 440C High-Carbon", count: "520" },
  { name: "Tungsten Carbide (TC)", count: "380" },
  { name: "Titanium Grade 5 (Ti-6Al-4V)", count: "170" },
];

const FINISH_FILTERS = [
  { name: "Satin / Matte Anti-Glare", count: "1,820" },
  { name: "Mirror Polish", count: "490" },
  { name: "Ceramic Black Coated", count: "170" },
];

const TIP_OPTIONS = [
  "Straight",
  "Curved",
  "Angled",
  "Delicate",
  "Heavy / Atraumatic",
];

export const CataloguePage: React.FC<CataloguePageProps> = ({
  onOpenRfq,
  manifestRefs,
  onToggleManifest,
}) => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("Clinical Application (A-Z)");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedAlloys, setSelectedAlloys] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [selectedTip, setSelectedTip] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategories([initialCategory]);
    }
  }, [initialCategory]);

  const toggleItem = (
    item: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
    );
  };

  const resetAll = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedAlloys([]);
    setSelectedFinishes([]);
    setSelectedTip(null);
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = CATALOGUE_PRODUCTS.filter((p) => {
      if (q) {
        const hay =
          `${p.title} ${p.ref} ${p.discipline} ${p.description} ${p.alloy}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.some((c) => p.categoryTags.includes(c))
      ) {
        return false;
      }
      if (selectedAlloys.length > 0 && !selectedAlloys.includes(p.alloy)) {
        return false;
      }
      if (selectedFinishes.length > 0 && !selectedFinishes.includes(p.finish)) {
        return false;
      }
      if (selectedTip && p.tipConfig !== selectedTip) {
        return false;
      }
      return true;
    });

    const sorted = [...list];
    if (sortBy === "Clinical Application (A-Z)") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Reference Code (Ascending)") {
      sorted.sort((a, b) => a.ref.localeCompare(b.ref));
    } else if (sortBy === "Working Length (Min to Max)") {
      sorted.sort((a, b) => a.lengthMm - b.lengthMm);
    } else if (sortBy === "Material Hardness (HRC)") {
      sorted.sort((a, b) => b.hrc - a.hrc);
    }
    return sorted;
  }, [
    searchQuery,
    selectedCategories,
    selectedAlloys,
    selectedFinishes,
    selectedTip,
    sortBy,
  ]);

  const activeChips: { label: string; onRemove: () => void }[] = [
    ...selectedCategories.map((c) => ({
      label: c,
      onRemove: () =>
        setSelectedCategories((prev) => prev.filter((x) => x !== c)),
    })),
    ...selectedAlloys.map((a) => ({
      label: a,
      onRemove: () => setSelectedAlloys((prev) => prev.filter((x) => x !== a)),
    })),
    ...selectedFinishes.map((f) => ({
      label: f,
      onRemove: () =>
        setSelectedFinishes((prev) => prev.filter((x) => x !== f)),
    })),
    ...(selectedTip
      ? [{ label: selectedTip, onRemove: () => setSelectedTip(null) }]
      : []),
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Top Technical Breadcrumb & Meta Banner */}
      <section className="w-full bg-surface-container-low border-none py-space-sm">
        <div className="max-w-[1440px] mx-auto px-gutter md:px-gutter-desktop flex flex-wrap items-center justify-between gap-y-2 text-label-technical font-label-technical text-secondary">
          <div className="flex items-center gap-space-xs text-on-surface-variant">
            <span>CATALOGUE MATRIX</span>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-medium">
              PRECISION REPERTOIRE
            </span>
            <span className="text-outline-variant">/</span>
            <span className="text-secondary">DIN-EN ISO 7153-1 COMPLIANT</span>
          </div>
          <div className="flex items-center gap-space-md">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />{" "}
              2,480 PATTERNS RECORDED
            </span>
            <span className="text-outline-variant">|</span>
            <span className="text-on-surface-variant">REV: 2025.04-EU/US</span>
          </div>
        </div>
      </section>

      {/* Editorial Catalogue Header */}
      <section className="w-full bg-surface-container-lowest py-space-xl">
        <div className="max-w-[1440px] mx-auto px-gutter md:px-gutter-desktop">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-space-sm py-1 bg-surface-container text-primary font-label-code text-label-code uppercase tracking-wider rounded-sm mb-space-sm">
              <span>Official Master Catalogue</span>
              <span>•</span>
              <span>B2B Hospital &amp; Tender Distribution</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight mb-space-sm">
              Our Product Collection
            </h1>
            <p className="font-body-lg text-body-lg text-secondary leading-relaxed">
              Browse our comprehensive catalogue of precision surgical, medical,
              dental, and orthopedic patterns engineered in accordance with
              international medical standards. No retail dispatch; manufactured
              for hospitals, surgical distributors, and OEM contracts.
            </p>
          </div>

          {/* Top Utility & Technical Filter Control Bar */}
          <div className="mt-space-xl p-space-md bg-surface-container-low rounded-xl shadow-[0_4px_12px_-2px_rgba(20,43,69,0.06)] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-secondary pointer-events-none">
                search
              </span>
              <input
                className="w-full pl-10 pr-space-md py-2.5 bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md rounded-lg focus:outline-none focus:bg-surface-container-lowest shadow-sm"
                id="catalogue-search"
                placeholder="Search by instrument name, pattern, or ref code e.g. Metzenbaum, BN-104..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between lg:justify-end gap-space-md shrink-0">
              <div className="flex items-center gap-space-xs font-label-technical text-label-technical text-secondary bg-surface-container px-space-sm py-2 rounded-lg">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  inventory_2
                </span>
                <span>
                  Showing{" "}
                  <strong className="text-primary font-semibold">
                    {filteredProducts.length === CATALOGUE_PRODUCTS.length
                      ? "2,480"
                      : filteredProducts.length}
                  </strong>{" "}
                  Pattern Specifications
                </span>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-surface-container-lowest p-1 rounded-lg shadow-sm">
                <button
                  className={`flex items-center justify-center p-1.5 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-primary text-on-primary"
                      : "text-secondary hover:text-primary"
                  }`}
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    grid_view
                  </span>
                </button>
                <button
                  className={`flex items-center justify-center p-1.5 rounded transition-colors ml-1 ${
                    viewMode === "list"
                      ? "bg-primary text-on-primary"
                      : "text-secondary hover:text-primary"
                  }`}
                  onClick={() => setViewMode("list")}
                  title="Specification List View"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    table_rows
                  </span>
                </button>
              </div>

              <button
                className="hidden sm:flex items-center gap-2 bg-primary-container hover:bg-primary text-on-primary px-space-md py-2.5 rounded-lg font-label-lg text-label-lg transition-colors shadow-sm"
                onClick={() => onOpenRfq("Institutional RFQ Manifest")}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  request_quote
                </span>
                <span>
                  Institutional RFQ Manifest
                  {manifestRefs.length > 0 ? ` (${manifestRefs.length})` : ""}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalogue 2-Column Section */}
      <section className="w-full bg-surface py-space-xl">
        <div className="max-w-[1440px] mx-auto px-gutter md:px-gutter-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          {/* LEFT COLUMN: Faceted Taxonomy & Engineering Filters */}
          <aside className="lg:col-span-3 space-y-space-md">
            {/* Filter Header / Active Chips Card */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm space-y-space-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-headline-sm text-headline-sm text-primary">
                  <span className="material-symbols-outlined text-[20px] text-secondary">
                    tune
                  </span>
                  <span>Parameters</span>
                </div>
                <button
                  className="font-label-code text-label-code uppercase tracking-wider text-secondary hover:text-primary transition-colors"
                  onClick={resetAll}
                  type="button"
                >
                  Reset All
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeChips.length === 0 ? (
                  <span className="font-label-code text-label-code text-on-surface-variant">
                    All DIN/ISO patterns active
                  </span>
                ) : (
                  activeChips.map((chip) => (
                    <span
                      key={chip.label}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container text-primary font-label-technical text-label-technical rounded"
                    >
                      {chip.label}
                      <button
                        aria-label={`Remove ${chip.label}`}
                        className="material-symbols-outlined text-[12px] cursor-pointer hover:text-error"
                        onClick={chip.onRemove}
                        type="button"
                      >
                        close
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Category & Pattern Filter */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-label-lg text-label-lg text-primary uppercase tracking-wide">
                  Category &amp; Pattern
                </span>
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  category
                </span>
              </div>
              <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
                {CATEGORY_FILTERS.map((cat) => {
                  const checked = selectedCategories.includes(cat.name);
                  return (
                    <label
                      key={cat.name}
                      className="flex items-center justify-between p-1.5 rounded hover:bg-surface-container cursor-pointer transition-colors group"
                    >
                      <span
                        className={`flex items-center gap-2 font-body-sm text-body-sm group-hover:text-primary ${
                          checked ? "text-primary font-medium" : "text-on-surface-variant"
                        }`}
                      >
                        <input
                          checked={checked}
                          className="w-3.5 h-3.5 rounded bg-surface-container-lowest accent-primary cursor-pointer"
                          onChange={() =>
                            toggleItem(
                              cat.name,
                              selectedCategories,
                              setSelectedCategories
                            )
                          }
                          type="checkbox"
                        />
                        {cat.name}
                      </span>
                      <span className="font-label-code text-label-code text-secondary">
                        {cat.count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Metallurgical Alloy Filter */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-label-lg text-label-lg text-primary uppercase tracking-wide">
                  Metallurgical Alloy
                </span>
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  science
                </span>
              </div>
              <div className="space-y-1.5">
                {ALLOY_FILTERS.map((alloy) => {
                  const checked = selectedAlloys.includes(alloy.name);
                  return (
                    <label
                      key={alloy.name}
                      className="flex items-center justify-between p-1.5 rounded hover:bg-surface-container cursor-pointer transition-colors"
                    >
                      <span
                        className={`flex items-center gap-2 font-body-sm text-body-sm ${
                          checked ? "text-primary font-medium" : "text-on-surface-variant"
                        }`}
                      >
                        <input
                          checked={checked}
                          className="w-3.5 h-3.5 rounded bg-surface-container-lowest accent-primary cursor-pointer"
                          onChange={() =>
                            toggleItem(
                              alloy.name,
                              selectedAlloys,
                              setSelectedAlloys
                            )
                          }
                          type="checkbox"
                        />
                        {alloy.name}
                      </span>
                      <span className="font-label-code text-label-code text-secondary">
                        {alloy.count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Surface Finish Filter */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-label-lg text-label-lg text-primary uppercase tracking-wide">
                  Surface Finish
                </span>
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  format_paint
                </span>
              </div>
              <div className="space-y-1.5">
                {FINISH_FILTERS.map((finish) => {
                  const checked = selectedFinishes.includes(finish.name);
                  return (
                    <label
                      key={finish.name}
                      className="flex items-center justify-between p-1.5 rounded hover:bg-surface-container cursor-pointer transition-colors"
                    >
                      <span
                        className={`flex items-center gap-2 font-body-sm text-body-sm ${
                          checked ? "text-primary font-medium" : "text-on-surface-variant"
                        }`}
                      >
                        <input
                          checked={checked}
                          className="w-3.5 h-3.5 rounded bg-surface-container-lowest accent-primary cursor-pointer"
                          onChange={() =>
                            toggleItem(
                              finish.name,
                              selectedFinishes,
                              setSelectedFinishes
                            )
                          }
                          type="checkbox"
                        />
                        {finish.name}
                      </span>
                      <span className="font-label-code text-label-code text-secondary">
                        {finish.count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Tip Configuration Filter */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-label-lg text-label-lg text-primary uppercase tracking-wide">
                  Tip Configuration
                </span>
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  architecture
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {TIP_OPTIONS.map((tip) => {
                  const active = selectedTip === tip;
                  return (
                    <button
                      key={tip}
                      className={`px-2.5 py-1.5 font-label-technical text-label-technical rounded text-left transition-colors flex items-center justify-between ${
                        tip === "Heavy / Atraumatic" ? "col-span-2" : ""
                      } ${
                        active
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container hover:bg-surface-container-high text-primary"
                      }`}
                      onClick={() => setSelectedTip(active ? null : tip)}
                      type="button"
                    >
                      <span>{tip}</span>
                      {active && (
                        <span className="material-symbols-outlined text-[14px]">
                          check
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hospital Tender Protocols */}
            <div className="p-space-md bg-surface-container-low rounded-xl text-secondary space-y-space-xs">
              <div className="flex items-center gap-1.5 text-primary font-label-lg text-label-lg">
                <span className="material-symbols-outlined text-[18px]">
                  verified_user
                </span>
                <span>Hospital Tender Protocols</span>
              </div>
              <p className="font-body-sm text-body-sm leading-relaxed">
                All specifications conform to DIN 58298 passivation testing. Laser
                marking, CE batch coding, and OEM customized stamping available on
                institutional MOQs (100+ units).
              </p>
              <Link
                className="inline-flex items-center gap-1 text-primary hover:text-secondary font-label-technical text-label-technical pt-1 transition-colors"
                to="/about-us"
              >
                <span>View Passivation Protocol</span>
                <span className="material-symbols-outlined text-[14px]">
                  arrow_forward
                </span>
              </Link>
            </div>
          </aside>

          {/* RIGHT COLUMN: Product Grid / Specification List */}
          <div className="lg:col-span-9 space-y-space-lg">
            {/* Sorting and Fast Spec Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-sm bg-surface-container-lowest rounded-xl shadow-sm gap-space-sm text-body-sm">
              <div className="flex items-center gap-space-sm font-label-technical text-label-technical text-secondary">
                <span>
                  SHOWING: 1 - {filteredProducts.length} of{" "}
                  {filteredProducts.length === CATALOGUE_PRODUCTS.length
                    ? "2,480"
                    : filteredProducts.length}{" "}
                  PATTERNS
                </span>
                <span className="text-outline-variant">•</span>
                <span className="text-primary font-medium">
                  SORT: ALPHABETICAL (DIN)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <label
                  className="font-label-technical text-label-technical text-secondary shrink-0"
                  htmlFor="catalog-sort"
                >
                  Sort By:
                </label>
                <select
                  className="bg-surface-container text-primary font-label-technical text-label-technical px-2.5 py-1.5 rounded focus:outline-none cursor-pointer"
                  id="catalog-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>Clinical Application (A-Z)</option>
                  <option>Reference Code (Ascending)</option>
                  <option>Working Length (Min to Max)</option>
                  <option>Material Hardness (HRC)</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-xl p-space-xl text-center space-y-space-sm shadow-sm">
                <span className="material-symbols-outlined text-[36px] text-secondary">
                  search_off
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  No Pattern Specifications Match Active Filters
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Adjust metallurgical alloy, tip geometry, or search keywords to
                  display matching DIN patterns.
                </p>
                <button
                  className="bg-primary text-on-primary px-space-md py-2 rounded font-label-technical text-label-technical uppercase"
                  onClick={resetAll}
                  type="button"
                >
                  Reset Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
                {filteredProducts.map((product) => {
                  const inManifest = manifestRefs.includes(product.ref);
                  return (
                    <article
                      key={product.ref}
                      className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group overflow-hidden"
                    >
                      <div>
                        <div className="relative w-full h-56 bg-surface-container-lowest p-space-md flex items-center justify-center overflow-hidden">
                          <img
                            alt={product.imageAlt}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            src={product.image}
                          />
                          <span
                            className={`absolute top-3 left-3 font-label-code text-label-code px-2 py-0.5 rounded uppercase tracking-wider font-semibold ${
                              product.badgeHighlight
                                ? "bg-secondary-container text-on-secondary-container"
                                : "bg-surface-container text-primary"
                            }`}
                          >
                            {product.ref}
                          </span>
                          <span
                            className="absolute top-3 right-3 text-secondary"
                            title={product.iconTitle}
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              {product.icon}
                            </span>
                          </span>
                        </div>

                        <div className="p-space-md">
                          <div className="flex items-center justify-between text-secondary mb-1">
                            <span className="font-label-technical text-label-technical uppercase tracking-wider">
                              {product.discipline}
                            </span>
                            <span className="font-label-code text-label-code">
                              {product.lengthLabel}
                            </span>
                          </div>
                          <h3 className="font-headline-sm text-headline-sm text-primary mb-2 group-hover:text-secondary transition-colors">
                            {product.title}
                          </h3>
                          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-space-md">
                            {product.description}
                          </p>
                          <div className="grid grid-cols-2 gap-1 py-2 px-2.5 bg-surface-container-low rounded-lg text-label-code font-label-code text-secondary mb-space-md">
                            {product.specs.map((spec) => (
                              <div key={spec}>{spec}</div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="px-space-md pb-space-md pt-0 flex items-center justify-between bg-surface-container-lowest">
                        <Link
                          className="inline-flex items-center gap-1.5 font-label-lg text-label-lg text-primary font-semibold hover:text-secondary transition-colors group/link"
                          to={`/products/${product.id}`}
                        >
                          <span>View Details</span>
                          <span className="material-symbols-outlined text-[16px] group-hover/link:translate-x-1 transition-transform">
                            arrow_forward
                          </span>
                        </Link>
                        <button
                          className={`p-1.5 rounded transition-colors ${
                            inManifest
                              ? "bg-primary text-on-primary"
                              : "hover:bg-surface-container text-secondary hover:text-primary"
                          }`}
                          onClick={() => onToggleManifest(product.ref)}
                          title={
                            inManifest
                              ? "Bookmarked in RFQ Manifest"
                              : "Bookmark to RFQ Manifest"
                          }
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {inManifest ? "playlist_add_check" : "playlist_add"}
                          </span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* Specification Table View */
              <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-x-auto">
                <table className="w-full text-left font-body-sm text-body-sm">
                  <thead className="bg-surface-container-low font-label-technical text-label-technical text-secondary uppercase">
                    <tr>
                      <th className="py-3 px-4">Ref Code</th>
                      <th className="py-3 px-4">Instrument Pattern</th>
                      <th className="py-3 px-4">Discipline</th>
                      <th className="py-3 px-4">Alloy</th>
                      <th className="py-3 px-4">Length</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container">
                    {filteredProducts.map((product) => (
                      <tr
                        key={product.ref}
                        className="hover:bg-surface-container-low/50 transition-colors"
                      >
                        <td className="py-3 px-4 font-label-code text-primary font-semibold">
                          {product.ref}
                        </td>
                        <td className="py-3 px-4 font-semibold text-primary">
                          {product.title}
                        </td>
                        <td className="py-3 px-4 text-secondary">
                          {product.discipline}
                        </td>
                        <td className="py-3 px-4 font-label-code text-on-surface-variant">
                          {product.alloy}
                        </td>
                        <td className="py-3 px-4 font-label-code text-secondary">
                          {product.lengthLabel}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            className="text-primary font-label-lg hover:text-secondary inline-flex items-center gap-1"
                            to={`/products/${product.id}`}
                          >
                            <span>Specs</span>
                            <span className="material-symbols-outlined text-[15px]">
                              arrow_forward
                            </span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Catalogue Indexing & PDF Export Bar */}
            <div className="mt-space-xl p-space-md bg-surface-container-lowest rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md font-label-technical text-label-technical text-secondary">
                <span className="text-primary font-semibold">
                  Page {currentPage} of 124
                </span>
                <span className="text-outline-variant">•</span>
                <span>Total 2,480 Validated Blueprints</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded bg-surface-container text-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_left
                  </span>
                </button>
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    className={`w-9 h-9 flex items-center justify-center rounded font-label-technical text-label-technical transition-colors ${
                      currentPage === p
                        ? "bg-primary text-on-primary font-semibold"
                        : "hover:bg-surface-container text-primary"
                    }`}
                    onClick={() => setCurrentPage(p)}
                    type="button"
                  >
                    {p}
                  </button>
                ))}
                <span className="px-1 text-secondary font-label-technical text-label-technical">
                  ...
                </span>
                <button
                  className={`w-9 h-9 flex items-center justify-center rounded font-label-technical text-label-technical transition-colors ${
                    currentPage === 124
                      ? "bg-primary text-on-primary font-semibold"
                      : "hover:bg-surface-container text-primary"
                  }`}
                  onClick={() => setCurrentPage(124)}
                  type="button"
                >
                  124
                </button>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded bg-surface-container hover:bg-surface-container-high text-primary transition-colors"
                  onClick={() => setCurrentPage((p) => Math.min(124, p + 1))}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_right
                  </span>
                </button>
              </div>

              <div>
                <button
                  className="inline-flex items-center gap-2 bg-surface-container hover:bg-surface-container-high text-primary font-label-technical text-label-technical px-space-md py-2 rounded-lg transition-colors"
                  onClick={() => onOpenRfq("Category PDF Spec Sheet Request")}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    picture_as_pdf
                  </span>
                  <span>Download Category PDF Spec Sheet</span>
                </button>
              </div>
            </div>

            {/* Institutional Regulatory Compliance Strip */}
            <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[28px] text-primary">
                  verified
                </span>
                <div>
                  <div className="font-label-lg text-label-lg text-primary font-medium">
                    Full Material Traceability &amp; Certification
                  </div>
                  <div className="font-body-sm text-body-sm text-secondary">
                    Every instrument is permanently stamped with DIN alloy grade,
                    batch lot number, and CE MDR compliance identifier.
                  </div>
                </div>
              </div>
              <button
                className="shrink-0 bg-primary text-on-primary hover:bg-primary-container px-space-md py-2 rounded-lg font-label-technical text-label-technical transition-colors"
                onClick={() => onOpenRfq("MDR Audit Packet Request")}
                type="button"
              >
                Request MDR Audit Packet
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
