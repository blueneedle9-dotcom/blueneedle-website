import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAdminContext } from '../../components/AdminLayout';

interface ProductRecord {
  id: string;
  name: string;
  sku: string;
  standardRef: string;
  gtin: string;
  category: string;
  subCategory: string;
  alloy: string;
  alloyFilter: string;
  finishNote: string;
  badge?: string;
  dateAdded: string;
  batchNo: string;
  status: 'Published' | 'Draft Review';
  imageUrl: string;
  imageAlt: string;
}

const INITIAL_PRODUCTS: ProductRecord[] = [
  {
    id: 'prod-1',
    name: 'Mayo Dissecting Scissors (Straight 170mm)',
    sku: 'BN-SC-1021-TC',
    standardRef: 'DIN 58298',
    gtin: '0401289192003',
    category: 'Surgical Instruments',
    subCategory: 'Dissecting / Cutting',
    alloy: 'AISI 420B + Tungsten Carbide',
    alloyFilter: 'tc',
    finishNote: 'Electropolished Satin, 54-58 HRC',
    badge: 'TC-GOLD',
    dateAdded: 'Oct 24, 2024',
    batchNo: 'Audit Batch #882',
    status: 'Published',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBeyRGF_Xyu4CE_mEYcO7VSIDBlsREot-G_25E7GJ_uH7Ji6aIL_u0MCTK6GpNrPoqSs0qNFFHTGcxPkEjQy95ghrF3155M1UZN8SiB_oabuaIYCQdKBmFdK856toWNPnLi5ejIXwDPWYcaqupmier393IYihzPGZGf868cxV9qj2TzypMgGd7jx_t8AB6ycftjhE35PnTxnZIIS1Fvqf7O6YOT_0B-kiyv5UYB3nI',
    imageAlt: 'High precision stainless steel Mayo Dissecting Scissors',
  },
  {
    id: 'prod-2',
    name: 'Halsted Mosquito Forceps (Curved 12.5cm)',
    sku: 'BN-FC-2044',
    standardRef: 'DIN 1.4021 Interlock',
    gtin: '0401289192044',
    category: 'Surgical Instruments',
    subCategory: 'Hemostatic Clamps',
    alloy: 'AISI 420B Martensitic Satin',
    alloyFilter: 'martensitic',
    finishNote: 'Mirror Polish, 46-48 HRC',
    badge: 'PRECISION',
    dateAdded: 'Oct 23, 2024',
    batchNo: 'Batch #879-C',
    status: 'Published',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBDVGrDoKuAvB8HgIvjWCIfkVsE0_DKVH5MKvbS7IErkY6sRK9IZcWjPbuyllC02Egmi_R-tunOp97k88FWH-KxN_r33ZuhxbSEwO-DBu4EIx45SAVGqYw7B635Ni1iGaDOrtZ8lDqusrFJbh9kG1UH7luK7KakXuXcvkhqlM2TCUF4NTEvID6w7gm34bnC1sd7Z_CstOTNWg-3N4CQ29nBXmgftjIN5SFP1IyoGLg',
    imageAlt: 'Halsted Mosquito Forceps curved surgical clamp',
  },
  {
    id: 'prod-3',
    name: 'Crile-Wood Needle Holder (Gold Handle TC)',
    sku: 'BN-NH-3105',
    standardRef: 'Suture 3-0 to 6-0',
    gtin: '0401289193105',
    category: 'Needle Holders',
    subCategory: 'Vascular & General',
    alloy: 'AISI 420B + Tungsten Carbide (TC)',
    alloyFilter: 'tc',
    finishNote: 'Gold Plated Ring, 0.4mm Pitch',
    badge: 'TC-GOLD',
    dateAdded: 'Oct 20, 2024',
    batchNo: 'Batch #871-A',
    status: 'Published',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAvJtWO7P1ChDcChxVOsKwt4vrUiq5DO0-8_jV-A7nIpohTL705ziNBHyuOp2IN0IzU8Oll3VlZs989TLcZN-8RygfIF-xWWPRdV221d5m_jRkesvRB8UNC5mf2Bb-fPnLoISkxhwkJhFu13RogpWY4KbDAGsdJIj9r4SaO7Yl_pJaOmolBZZopq9n7uQ7b7foCcbyjf-8dR_xMtVt97ltX3Z-u7bmDKhUB9Fmt9ik',
    imageAlt: 'Crile-Wood Surgical Needle Holder with gold dipped handles',
  },
  {
    id: 'prod-4',
    name: 'Beyer Bone Rongeur (Double-Action 18.0cm)',
    sku: 'BN-OR-6120',
    standardRef: 'Jaw Width: 3.5mm',
    gtin: '0401289196120',
    category: 'Orthopedic Instruments',
    subCategory: 'Bone Cutting & Gouging',
    alloy: 'AISI 440C High-Carbon Stainless',
    alloyFilter: 'high-carbon',
    finishNote: 'Cryogenic Annealed, 58 HRC',
    badge: 'HEAVY-DUTY',
    dateAdded: 'Oct 18, 2024',
    batchNo: 'Batch #864-E',
    status: 'Draft Review',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDsZP3dkaN0IN7-LqeZdfBUR6VzKWdLWRgEeZ0Yunio_keuoSmGGx9BnFluoa7oILUVugzL7CVAuUOnUVmxW3LsVgZHVHJXUIexVRy14FVDiGgNGijJ36djW1706ud1OkTTGSfvX1_FfFP2bZi2ZZTB0Rvi7Jmkou2QdXVBe8hPwY4r1TohCYlLrYT24MS0d49uI3d_Ywyij5_F3b6UFKSWkO7y_kuQD0J-dVyUaGg',
    imageAlt: 'Beyer Bone Rongeur Double Action Orthopedic surgical tool',
  },
  {
    id: 'prod-5',
    name: 'Castroviejo Micro Caliper (0-20mm Screw)',
    sku: 'BN-OPH-7011',
    standardRef: 'Graduation: 0.5mm',
    gtin: '0401289197011',
    category: 'Ophthalmic Instruments',
    subCategory: 'Micro Measurement',
    alloy: 'Titanium Grade 5 (Ti-6Al-4V)',
    alloyFilter: 'titanium',
    finishNote: 'Anodized Non-Reflective Satin',
    badge: 'TITANIUM',
    dateAdded: 'Oct 15, 2024',
    batchNo: 'Batch #859-T',
    status: 'Published',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCBDh6DoNV2ax5y9yYe-FmukwVwe5WBQfnmECJEZ8hT3Rt8z8dMoh20SpPmCpvPFT5sVk-g4yXQA4UNG4JLeCjKPnWu0NR-yKkNtcCzthRYhAkhG-rkqCCIjmtVFXQwSEE0PJAG6mqeSnwBIt25TBfdRIF9gbWYeFjJHuUB3XiiGKz2ph0WHSwjRhyHLUcYNGiOx3OlPTRhRwp5TAzgSEr1jEK_kA69xHtpjT1SLYU',
    imageAlt: 'Castroviejo Micro Caliper surgical measuring device',
  },
];

export const AdminProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { globalSearch } = useAdminContext();

  const [products, setProducts] = useState<ProductRecord[]>(INITIAL_PRODUCTS);
  const [localSearch, setLocalSearch] = useState(searchParams.get('q') || '');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [alloyFilter, setAlloyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const effectiveSearch = globalSearch || localSearch;

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (effectiveSearch.trim()) {
        const q = effectiveSearch.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.gtin.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.alloy.toLowerCase().includes(q);
        if (!match) return false;
      }

      if (categoryFilter !== 'all') {
        if (!p.category.toLowerCase().includes(categoryFilter.toLowerCase())) {
          return false;
        }
      }

      if (alloyFilter !== 'all') {
        if (p.alloyFilter !== alloyFilter) {
          return false;
        }
      }

      if (statusFilter !== 'all') {
        if (statusFilter === 'published' && p.status !== 'Published') return false;
        if (statusFilter === 'draft' && p.status !== 'Draft Review') return false;
      }

      return true;
    });
  }, [products, effectiveSearch, categoryFilter, alloyFilter, statusFilter]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredProducts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExportCsv = () => {
    const header = 'ID,Name,SKU,GTIN,Category,Alloy,Status,Date\n';
    const rows = filteredProducts
      .map(
        (p) =>
          `"${p.id}","${p.name}","${p.sku}","${p.gtin}","${p.category}","${p.alloy}","${p.status}","${p.dateAdded}"`
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blueneedle_catalog_export_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setToastMessage(`Exported ${filteredProducts.length} products to CSV.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Quarantine / remove this instrument from active catalog?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
      setToastMessage('Instrument archived / quarantined successfully.');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Utility Contextual Sub-bar & Heading */}
      <section className="w-full px-gutter py-space-xl bg-surface-container-lowest shadow-sm border-b border-surface-container-high">
        <div className="w-full max-w-[1680px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          {/* Title & Context */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-caption text-caption">
              <span className="hover:text-primary cursor-pointer transition-colors">
                Catalog Architecture
              </span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-primary font-caption-bold">Regulatory Master Index</span>
              <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] tracking-wider uppercase bg-secondary-container text-on-secondary-fixed font-caption-bold">
                ISO 13485:2016 Compliant
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
              Products Management
            </h1>
            <p className="font-body-default text-body-default text-on-surface-variant max-w-3xl">
              Manage, verify, and publish surgical, orthopedic, ophthalmic, and dental instrumentation across MDR 2017/745 certified repositories.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-space-sm flex-wrap self-start lg:self-center">
            <button
              type="button"
              onClick={handleExportCsv}
              className="flex items-center gap-2 h-10 px-space-md rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors font-button-text text-button-text shadow-sm border border-surface-container-high"
            >
              <span className="material-symbols-outlined text-lg">download</span>
              <span>Export CSV / Spec Sheets</span>
            </button>
            <Link
              to="/admin/products/new"
              className="flex items-center gap-2 h-10 px-space-md rounded-lg bg-primary-container hover:bg-primary text-on-primary transition-all font-button-text text-button-text shadow-sm"
            >
              <span className="material-symbols-outlined text-lg">add_circle</span>
              <span>+ Add New Product</span>
            </Link>
          </div>
        </div>

        {/* Quick Metrics Strip */}
        <div className="max-w-[1680px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-space-md mt-space-xl">
          {/* Metric 1 */}
          <div className="bg-surface-container-low rounded-xl p-space-md flex items-center justify-between shadow-sm border border-surface-container-high">
            <div className="flex flex-col">
              <span className="font-caption text-caption text-on-surface-variant">
                Total Instruments
              </span>
              <span className="font-headline-lg text-headline-lg text-primary mt-0.5 font-bold">
                2,480
              </span>
              <span className="font-caption text-caption text-secondary flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">inventory_2</span> Active SKUs
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm border border-surface-container-high">
              <span className="material-symbols-outlined text-2xl">precision_manufacturing</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-surface-container-low rounded-xl p-space-md flex items-center justify-between shadow-sm border border-surface-container-high">
            <div className="flex flex-col">
              <span className="font-caption text-caption text-on-surface-variant">Published</span>
              <span className="font-headline-lg text-headline-lg text-primary mt-0.5 font-bold">
                2,394
              </span>
              <span className="font-caption text-caption text-secondary flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 96.5% Public Visibility
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm border border-surface-container-high">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-surface-container-low rounded-xl p-space-md flex items-center justify-between shadow-sm border border-surface-container-high">
            <div className="flex flex-col">
              <span className="font-caption text-caption text-on-surface-variant">Draft Review</span>
              <span className="font-headline-lg text-headline-lg text-primary mt-0.5 font-bold">
                86
              </span>
              <span className="font-caption text-caption text-on-tertiary-container flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">pending_actions</span> QA Pending Signoff
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-on-tertiary-container shadow-sm border border-surface-container-high">
              <span className="material-symbols-outlined text-2xl">fact_check</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-surface-container-low rounded-xl p-space-md flex items-center justify-between shadow-sm border border-surface-container-high">
            <div className="flex flex-col">
              <span className="font-caption text-caption text-on-surface-variant">
                Tungsten Carbide (TC)
              </span>
              <span className="font-headline-lg text-headline-lg text-primary mt-0.5 font-bold">
                642
              </span>
              <span className="font-caption text-caption text-on-secondary-container flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">stars</span> Premium Gold Handle
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary-container shadow-sm border border-surface-container-high">
              <span className="material-symbols-outlined text-2xl">handyman</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Work Area */}
      <section className="w-full px-gutter py-space-xl flex flex-col gap-space-lg max-w-[1680px] mx-auto">
        {toastMessage && (
          <div className="p-3 rounded-lg bg-secondary-container text-on-secondary-fixed border border-secondary flex items-center justify-between">
            <span className="text-sm font-semibold">{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="material-symbols-outlined text-sm">
              close
            </button>
          </div>
        )}

        {/* Filter & Search Toolbar */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md border border-surface-container-high">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center">
            {/* Search Field */}
            <div className="md:col-span-4 relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-xl">
                search
              </span>
              <input
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline text-body-default font-body-default focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-primary-container transition-all border border-surface-container-high"
                placeholder="Search by product name, SKU, or DIN code..."
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  aria-label="Filter by Category"
                  className="w-full h-11 px-3.5 appearance-none rounded-lg bg-surface-container-low text-on-surface text-body-default font-body-default focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-primary-container transition-all cursor-pointer border border-surface-container-high"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories (Global Index)</option>
                  <option value="surgical">Surgical Instruments</option>
                  <option value="needle">Needle Holders &amp; Suture</option>
                  <option value="orthopedic">Orthopedic Instruments</option>
                  <option value="ophthalmic">Ophthalmic &amp; Micro</option>
                  <option value="dental">Dental &amp; Oral Surgery</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none text-base">
                  expand_more
                </span>
              </div>
            </div>

            {/* Material / Alloy Dropdown */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  aria-label="Filter by Metallurgy"
                  className="w-full h-11 px-3.5 appearance-none rounded-lg bg-surface-container-low text-on-surface text-body-default font-body-default focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-primary-container transition-all cursor-pointer border border-surface-container-high"
                  value={alloyFilter}
                  onChange={(e) => setAlloyFilter(e.target.value)}
                >
                  <option value="all">All Alloys &amp; Metallurgy</option>
                  <option value="tc">AISI 420B + Tungsten Carbide (TC)</option>
                  <option value="martensitic">AISI 420B Martensitic Satin</option>
                  <option value="high-carbon">AISI 440C High-Carbon Stainless</option>
                  <option value="titanium">Titanium Grade 5 (Ti-6Al-4V)</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none text-base">
                  expand_more
                </span>
              </div>
            </div>

            {/* Status Filter Dropdown */}
            <div className="md:col-span-2">
              <div className="relative">
                <select
                  aria-label="Filter by Status"
                  className="w-full h-11 px-3.5 appearance-none rounded-lg bg-surface-container-low text-on-surface text-body-default font-body-default focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-primary-container transition-all cursor-pointer border border-surface-container-high"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft Review</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none text-base">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Active Filter Tags Bar */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="font-caption text-caption text-on-surface-variant mr-1">
                Active Criteria:
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container text-on-surface font-caption text-caption">
                <span>
                  Division: <strong>Human Surgical</strong>
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary-container text-on-secondary-fixed font-caption text-caption">
                <span>
                  Passivation: <strong>ASTM A967</strong>
                </span>
              </span>
              {(categoryFilter !== 'all' || alloyFilter !== 'all' || statusFilter !== 'all' || localSearch) && (
                <button
                  type="button"
                  className="text-caption font-caption-bold text-secondary hover:text-primary transition-colors underline ml-2"
                  onClick={() => {
                    setCategoryFilter('all');
                    setAlloyFilter('all');
                    setStatusFilter('all');
                    setLocalSearch('');
                  }}
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Right Quick Toggles */}
            <div className="flex items-center gap-space-md text-caption font-caption text-on-surface-variant">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary"></span> Auto-sync Live
              </span>
              <span className="text-caption">
                Showing {filteredProducts.length} of {products.length} Products
              </span>
            </div>
          </div>
        </div>

        {/* Bulk Action Bar */}
        {selectedIds.length > 0 && (
          <div className="bg-primary text-on-primary rounded-xl p-space-md flex items-center justify-between shadow-md">
            <span className="font-body-strong font-bold">
              {selectedIds.length} instrument{selectedIds.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setProducts((prev) =>
                    prev.map((p) =>
                      selectedIds.includes(p.id) ? { ...p, status: 'Published' } : p
                    )
                  );
                  setSelectedIds([]);
                  setToastMessage(`Published ${selectedIds.length} instruments.`);
                }}
                className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary text-xs font-bold hover:bg-surface-container-low transition-colors"
              >
                Mark as Published
              </button>
              <button
                type="button"
                onClick={() => {
                  setProducts((prev) =>
                    prev.map((p) =>
                      selectedIds.includes(p.id) ? { ...p, status: 'Draft Review' } : p
                    )
                  );
                  setSelectedIds([]);
                  setToastMessage(`Moved ${selectedIds.length} instruments to Draft Review.`);
                }}
                className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary text-xs font-bold hover:bg-surface-container-low transition-colors"
              >
                Mark as Draft
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Remove ${selectedIds.length} instruments from active index?`)) {
                    setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
                    setSelectedIds([]);
                    setToastMessage('Selected instruments removed.');
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-error text-on-error text-xs font-bold hover:opacity-90 transition-opacity"
              >
                Quarantine
              </button>
            </div>
          </div>
        )}

        {/* Master Enterprise Table Container */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col border border-surface-container-high">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1020px]">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-table-header text-table-header uppercase tracking-wider h-11 border-b border-surface-container-high">
                  <th className="py-3 px-space-md w-16 text-center" scope="col">
                    <input
                      aria-label="Select all products"
                      className="rounded cursor-pointer w-4 h-4 accent-primary"
                      type="checkbox"
                      checked={
                        filteredProducts.length > 0 &&
                        selectedIds.length === filteredProducts.length
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th className="py-3 px-space-md w-24" scope="col">
                    Tool Visual
                  </th>
                  <th className="py-3 px-space-md" scope="col">
                    Product Designation &amp; Identifiers
                  </th>
                  <th className="py-3 px-space-md" scope="col">
                    Category / Family
                  </th>
                  <th className="py-3 px-space-md" scope="col">
                    Metallurgy &amp; Finish
                  </th>
                  <th className="py-3 px-space-md" scope="col">
                    Regulatory Status
                  </th>
                  <th className="py-3 px-space-md" scope="col">
                    Date Enrolled
                  </th>
                  <th className="py-3 px-space-md text-right w-36" scope="col">
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high font-body-default text-body-default text-on-surface">
                {filteredProducts.map((p) => {
                  const isChecked = selectedIds.includes(p.id);
                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-surface-container-low/60 transition-colors group"
                    >
                      <td className="py-3.5 px-space-md text-center">
                        <input
                          aria-label={`Select ${p.name}`}
                          className="rounded cursor-pointer w-4 h-4 accent-primary"
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelect(p.id)}
                        />
                      </td>
                      <td className="py-3.5 px-space-md">
                        <div className="w-14 h-14 rounded-lg bg-surface-container flex items-center justify-center p-1 overflow-hidden shadow-inner border border-surface-container-high">
                          <img
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200"
                            src={p.imageUrl}
                            alt={p.imageAlt}
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-space-md">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/admin/products/${p.id}/edit`}
                              className="font-body-strong text-body-strong text-primary hover:text-secondary cursor-pointer transition-colors"
                            >
                              {p.name}
                            </Link>
                            {p.badge && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-caption-bold bg-tertiary-fixed text-on-tertiary-fixed">
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-space-sm mt-0.5 font-caption text-caption text-on-surface-variant font-mono">
                            <span>SKU: {p.sku}</span>
                            <span className="text-outline-variant">•</span>
                            <span>{p.standardRef}</span>
                            <span className="text-outline-variant">•</span>
                            <span>GTIN: {p.gtin}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-space-md">
                        <div className="flex flex-col">
                          <span className="font-caption-bold text-caption-bold text-on-surface">
                            {p.category}
                          </span>
                          <span className="font-caption text-caption text-on-surface-variant">
                            {p.subCategory}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-space-md">
                        <div className="flex flex-col">
                          <span className="font-caption-bold text-caption-bold text-primary">
                            {p.alloy}
                          </span>
                          <span className="font-caption text-caption text-on-surface-variant">
                            {p.finishNote}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-space-md">
                        {p.status === 'Published' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary-container text-on-secondary-fixed text-caption-bold font-caption-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary-fixed-dim text-caption-bold font-caption-bold">
                            Draft Review
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-space-md">
                        <div className="flex flex-col">
                          <span className="text-caption font-caption text-on-surface">
                            {p.dateAdded}
                          </span>
                          <span className="text-[11px] font-caption text-on-surface-variant">
                            {p.batchNo}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-space-md text-right">
                        <div className="inline-flex items-center gap-1">
                          <Link
                            to={`/admin/email?subject=Quotation: ${encodeURIComponent(p.name)} [SKU: ${p.sku}]`}
                            className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                            title="Compose Quote Email"
                          >
                            <span className="material-symbols-outlined text-lg">
                              outgoing_mail
                            </span>
                          </Link>
                          <Link
                            to={`/admin/products/${p.id}/edit`}
                            className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                            title="Edit Catalog Properties"
                          >
                            <span className="material-symbols-outlined text-lg">edit</span>
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-error transition-colors"
                            title="Archive / Quarantine"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer Pagination */}
          <div className="px-space-md py-3 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between text-caption text-secondary">
            <span>Showing {filteredProducts.length} of {products.length} Active Records</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-2.5 py-1 rounded bg-surface-container-lowest border border-surface-container-high text-xs font-semibold hover:bg-surface-container"
              >
                Previous
              </button>
              <span className="px-2 py-1 rounded bg-primary text-on-primary text-xs font-bold">
                1
              </span>
              <button
                type="button"
                className="px-2.5 py-1 rounded bg-surface-container-lowest border border-surface-container-high text-xs font-semibold hover:bg-surface-container"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminProductsPage;
