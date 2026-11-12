import React, { useMemo, useRef, useState } from 'react';

interface CategoryItem {
  id: string;
  indexLabel: string;
  name: string;
  code: string;
  slug: string;
  description: string;
  productCount: number;
  materialSpec: string;
  orderIndex: number;
  megaMenuVisible: boolean;
  imageUrl?: string;
  icon?: string;
}

const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-1',
    indexLabel: '01',
    name: 'Surgical Instruments',
    code: 'CAT-SURG-01',
    slug: 'surgical-instruments',
    description:
      'General surgical sets, abdominal retractors, intestinal clamps, dissecting scissors, and sterile suction tubes.',
    productCount: 840,
    materialSpec: 'AISI 420B / 440C',
    orderIndex: 1,
    megaMenuVisible: true,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3LJTJS8Psoi0H5xsR6a4hYLrr9CNqLcPQHxeqiiu8MV1BeF_BtpIM9ewGxOXmZ4XqbXuhUaaPsMtUOaZGwT7Vsrmbp281HxdfQNZ3VojkmI9qF6RPUEpftQ9ouxD4Ibzuwp0oTr1S8KeZG8yb7M_CPWx0uo6c9dDiVGTrtgLBwhyhBPktD9dqtcQpv5SdMrzQRHAAMGtBILbBwW-TR-QYNAI8zYk1PvaPRXEXYls',
  },
  {
    id: 'cat-2',
    indexLabel: '02',
    name: 'Medical Instruments',
    code: 'CAT-MED-02',
    slug: 'medical-instruments',
    description:
      'Clinical diagnostic diagnostics, biopsy forceps, gynecological speculums, and minor outpatient surgical kits.',
    productCount: 420,
    materialSpec: 'Martensitic 1.4021',
    orderIndex: 2,
    megaMenuVisible: true,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCpFlIhNtbJnX6Z9Y6Ep8ibxO84mt6zisH8A7fEjrXrYj-REY9h5Lsfe2sI62b3A1TO2d3KpWxzsxAeKXPVeQDlcFVRYjbv6VetfIIhBuALr-EWeyFAyElW0RiytNymnYPFW6pmUTX-6Qfo4ad82WOHaO7N0pmJS_IkBGFefnDCvSgy-Ath1c01KwTxuHPDMm1MgyH0Aiv89zQrZwrKbTmFn-6VoKPVpiX5eVXHQ9k',
  },
  {
    id: 'cat-3',
    indexLabel: '03',
    name: 'Dental Instruments',
    code: 'CAT-DENT-03',
    slug: 'dental-instruments',
    description:
      'English and American pattern extraction forceps, micro-periodontal curettes, root tip elevators, and implantology instruments.',
    productCount: 360,
    materialSpec: 'Rockwell HRC 54',
    orderIndex: 3,
    megaMenuVisible: true,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDXNeBlc8NoeZEVeg-GSbFHZJUgICTymOGVmo0gkpcb_2lDGvIL9n9hr2GDmMm59grBWGmfpJyPU1VS_wBKy-58xGnDTHhNaPtz_n9ln-Xto3-8VO8rSbuhxHj03DBwQsZvSqSn5GVWc3Rdlr9YcUTNoRlHzzyhD6eHxOmNFKFaWs7DkbQwcq06br8LGRFzRJkaLAnbSdr44FwOnwof7o6rAxNRpV3A94IOB08v1EM',
  },
  {
    id: 'cat-4',
    indexLabel: '04',
    name: 'Orthopedic Instruments',
    code: 'CAT-ORTH-04',
    slug: 'orthopedic-instruments',
    description:
      'Double-action bone rongeurs, calibrated osteotomes, bone holding clamps, wire cutters, and periosteal elevators.',
    productCount: 310,
    materialSpec: 'High-Tensile German Alloy',
    orderIndex: 4,
    megaMenuVisible: true,
    icon: 'hardware',
  },
  {
    id: 'cat-5',
    indexLabel: '05',
    name: 'Ophthalmic Instruments',
    code: 'CAT-OPHTH-05',
    slug: 'ophthalmic-instruments',
    description:
      'Precision micro-scissors, high-magnification corneal forceps, Castroviejo needle holders, and pediatric eye speculums.',
    productCount: 250,
    materialSpec: 'Titanium Grade 5',
    orderIndex: 5,
    megaMenuVisible: true,
    icon: 'visibility',
  },
  {
    id: 'cat-6',
    indexLabel: '06',
    name: 'Forceps & Tweezers',
    code: 'CAT-FORC-06',
    slug: 'forceps-tweezers',
    description:
      'Hemostats, atraumatic tissue forceps with tungsten carbide inserts, titanium micro forceps, and sterilization mesh trays.',
    productCount: 510,
    materialSpec: 'Tungsten Carbide TC',
    orderIndex: 6,
    megaMenuVisible: true,
    icon: 'handyman',
  },
  {
    id: 'cat-7',
    indexLabel: '07',
    name: 'Scissors & Shears',
    code: 'CAT-SCIS-07',
    slug: 'scissors-shears',
    description:
      'Mayo, Metzenbaum, Iris, and SuperCut micro scissors with hardened cutting edges and gold-plated TC rings.',
    productCount: 380,
    materialSpec: 'SuperCut Micro Finish',
    orderIndex: 7,
    megaMenuVisible: true,
    icon: 'content_cut',
  },
  {
    id: 'cat-8',
    indexLabel: '08',
    name: 'Needle Holders',
    code: 'CAT-NDL-08',
    slug: 'needle-holders',
    description:
      'Cross-serrated tungsten carbide jaws for precise, slip-free suture control from 3-0 to 10-0 gauges.',
    productCount: 290,
    materialSpec: '0.4mm Pyramid Pitch',
    orderIndex: 8,
    megaMenuVisible: true,
    icon: 'draw',
  },
  {
    id: 'cat-9',
    indexLabel: '09',
    name: 'Retractors & Speculums',
    code: 'CAT-RETR-09',
    slug: 'retractors-speculums',
    description:
      'Self-retaining Weitlaner, Gelpi, Balfour abdominal retractors, and handheld Senn-Miller blades.',
    productCount: 210,
    materialSpec: 'Electropolished Satin',
    orderIndex: 9,
    megaMenuVisible: true,
    icon: 'fit_screen',
  },
  {
    id: 'cat-10',
    indexLabel: '10',
    name: 'Clamps & Hemostats',
    code: 'CAT-CLMP-10',
    slug: 'clamps-hemostats',
    description:
      'Halsted Mosquito, Crile, Kelly, and Rochester-Pean box-lock clamps with calibrated ratchets.',
    productCount: 330,
    materialSpec: 'Box-Lock Joint Spec',
    orderIndex: 10,
    megaMenuVisible: true,
    icon: 'lock',
  },
];

export const AdminCategoriesPage: React.FC = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'dense'>('cards');
  const [reorderMode, setReorderMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quick Editor State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [orderIndex, setOrderIndex] = useState<number>(11);
  const [megaMenuVisible, setMegaMenuVisible] = useState(true);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleAutoSlug = (val: string) => {
    setCatName(val);
    const clean = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setCatSlug(clean);
  };

  const resetCategoryForm = () => {
    setEditingId(null);
    setCatName('');
    setCatSlug('');
    setCatDesc('');
    setOrderIndex(categories.length + 1);
    setMegaMenuVisible(true);
    setUploadedFileName(null);
  };

  const focusQuickEditor = () => {
    resetCategoryForm();
    nameInputRef.current?.focus();
  };

  const startEditCategory = (cat: CategoryItem) => {
    setEditingId(cat.id);
    setCatName(cat.name);
    setCatSlug(cat.slug);
    setCatDesc(cat.description);
    setOrderIndex(cat.orderIndex);
    setMegaMenuVisible(cat.megaMenuVisible);
    setUploadedFileName(null);
    nameInputRef.current?.focus();
  };

  const handleArchiveCategory = (cat: CategoryItem) => {
    setCategories((prev) => prev.filter((item) => item.id !== cat.id));
    if (editingId === cat.id) {
      resetCategoryForm();
    }
    showToast(`Category "${cat.name}" removed from active taxonomy.`);
  };

  const moveCategoryOrder = (id: string, delta: -1 | 1) => {
    setCategories((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx === -1) return prev;
      const targetIdx = idx + delta;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const copy = [...prev];
      const [moved] = copy.splice(idx, 1);
      copy.splice(targetIdx, 0, moved);
      return copy.map((c, i) => ({
        ...c,
        orderIndex: i + 1,
        indexLabel: String(i + 1).padStart(2, '0'),
      }));
    });
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim() || !catSlug.trim()) return;

    if (editingId) {
      setCategories((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: catName.trim(),
                slug: catSlug.trim(),
                description: catDesc.trim() || item.description,
                orderIndex,
                megaMenuVisible,
              }
            : item
        )
      );
      showToast(`Category "${catName.trim()}" updated successfully in catalog taxonomy.`);
    } else {
      const nextNum = categories.length + 1;
      const newItem: CategoryItem = {
        id: `cat-${Date.now()}`,
        indexLabel: String(nextNum).padStart(2, '0'),
        name: catName.trim(),
        code: `CAT-NEW-${String(nextNum).padStart(2, '0')}`,
        slug: catSlug.trim(),
        description:
          catDesc.trim() ||
          'DIN EN ISO 13485 compliant surgical division queued for SKU assignment.',
        productCount: 0,
        materialSpec: 'AISI 420B / DIN 1.4021',
        orderIndex,
        megaMenuVisible,
        icon: 'category',
      };
      setCategories((prev) => [...prev, newItem]);
      showToast(`Category "${catName.trim()}" created and provisioned in catalog.`);
    }

    resetCategoryForm();
  };

  const filteredCategories = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(q) ||
        cat.code.toLowerCase().includes(q) ||
        cat.description.toLowerCase().includes(q) ||
        cat.materialSpec.toLowerCase().includes(q)
    );
  }, [categories, searchTerm]);

  return (
    <div className="w-full px-gutter py-space-xl flex flex-col gap-space-xl max-w-[1680px] mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-caption text-caption">
            <span>Catalog Taxonomy</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-caption-bold text-caption-bold">
              Category Master List
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            Category Management
          </h1>
          <p className="font-body-default text-body-default text-on-surface-variant max-w-2xl">
            Organize medical instrument taxonomy, categories, catalog divisions, and public mega-menu visibility.
          </p>
        </div>

        <div className="flex items-center gap-space-sm flex-wrap">
          <button
            type="button"
            onClick={() => setReorderMode((prev) => !prev)}
            className={`inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg shadow-sm font-button-text text-button-text transition-colors border border-surface-container-high ${
              reorderMode
                ? 'bg-secondary-container text-on-secondary-container font-semibold'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-base">swap_vert</span>
            <span>{reorderMode ? 'Done Reordering' : 'Reorder Hierarchy'}</span>
          </button>
          <button
            type="button"
            onClick={focusQuickEditor}
            className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-primary-container text-on-primary hover:bg-primary shadow-sm font-button-text text-button-text transition-all"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Add New Category</span>
          </button>
        </div>
      </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-technical text-label-technical text-secondary uppercase">
                Master Classes
              </span>
              <span className="material-symbols-outlined text-secondary text-[20px]">category</span>
            </div>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="font-headline-lg text-headline-lg text-primary font-bold">
                {categories.length + 2}
              </span>
              <span className="font-label-code text-label-code text-secondary font-medium">
                Core Divisions
              </span>
            </div>
            <div className="mt-2 w-full bg-surface-container-low h-1 rounded-full overflow-hidden">
              <div className="bg-primary-container h-full w-full" />
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-technical text-label-technical text-secondary uppercase">
                Sub-Categories
              </span>
              <span className="material-symbols-outlined text-secondary text-[20px]">
                account_tree
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="font-headline-lg text-headline-lg text-primary font-bold">48</span>
              <span className="font-label-code text-label-code text-secondary font-medium">
                Refined Sub-Sets
              </span>
            </div>
            <div className="mt-2 w-full bg-surface-container-low h-1 rounded-full overflow-hidden">
              <div className="bg-secondary h-full w-[80%]" />
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-technical text-label-technical text-secondary uppercase">
                Associated Instruments
              </span>
              <span className="material-symbols-outlined text-secondary text-[20px]">
                inventory_2
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="font-headline-lg text-headline-lg text-primary font-bold">
                2,480
              </span>
              <span className="font-label-code text-label-code text-secondary font-medium">
                SKUs Indexed
              </span>
            </div>
            <div className="mt-2 w-full bg-surface-container-low h-1 rounded-full overflow-hidden">
              <div className="bg-primary-container h-full w-[94%]" />
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-technical text-label-technical text-secondary uppercase">
                Public Mega-Menu
              </span>
              <span className="material-symbols-outlined text-secondary text-[20px]">
                visibility
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="font-headline-lg text-headline-lg text-primary font-bold">12</span>
              <span className="font-label-code text-label-code px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-semibold">
                100% Active
              </span>
            </div>
            <div className="mt-2 w-full bg-surface-container-low h-1 rounded-full overflow-hidden">
              <div className="bg-secondary-container h-full w-full" />
            </div>
          </div>
        </div>

      {/* Main Dual-Pane Grid Layout (70% / 30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column: Master Taxonomy List (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-space-md">
          {/* Toolbar Filters & Status Bar */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm w-full sm:w-auto">
              <div className="relative flex-1 sm:w-72">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[18px]">
                  filter_list
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter category titles, codes..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest transition-all"
                />
              </div>
              <span className="font-label-technical text-label-technical text-on-surface-variant hidden md:inline">
                Showing {filteredCategories.length} of {categories.length + 2}
              </span>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg font-label-code text-label-code flex items-center gap-1.5 ${
                  viewMode === 'cards'
                    ? 'bg-primary-container text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">grid_view</span>
                <span>Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('dense')}
                className={`px-3 py-1.5 rounded-lg font-label-code text-label-code flex items-center gap-1.5 ${
                  viewMode === 'dense'
                    ? 'bg-primary-container text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">table_rows</span>
                <span>Dense Spec</span>
              </button>
            </div>
          </div>

          {/* Categories Container */}
          <div className="flex flex-col gap-3">
            {filteredCategories.map((cat) =>
              viewMode === 'cards' ? (
                <div
                  key={cat.id}
                  className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md"
                >
                  <div className="flex items-start gap-space-md flex-1">
                    <div className="relative w-16 h-16 rounded-lg bg-surface-container-low flex-shrink-0 overflow-hidden flex items-center justify-center">
                      {cat.imageUrl ? (
                        <img
                          src={cat.imageUrl}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-surface-container flex items-center justify-center text-primary-container">
                          <span className="material-symbols-outlined text-[28px]">
                            {cat.icon || 'category'}
                          </span>
                        </div>
                      )}
                      <span className="absolute bottom-1 right-1 font-label-code text-[9px] bg-primary text-on-primary px-1 rounded">
                        {cat.indexLabel}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-headline-sm text-headline-sm text-primary font-semibold tracking-tight">
                          {cat.name}
                        </h2>
                        <span className="font-label-code text-label-code px-2 py-0.5 rounded bg-surface-container-low text-secondary">
                          {cat.code}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-label-technical text-label-technical bg-surface-container text-primary font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          {cat.megaMenuVisible ? 'Active in Menu' : 'Hidden'}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                        {cat.description}
                      </p>
                      <div className="flex items-center gap-space-md mt-2 flex-wrap">
                        <span className="font-label-technical text-label-technical text-primary font-semibold">
                          {cat.productCount} Products
                        </span>
                        <span className="font-label-code text-label-code text-secondary">
                          {cat.materialSpec}
                        </span>
                        <span className="font-label-code text-label-code text-on-surface-variant">
                          Order Index: #{cat.orderIndex}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                    {reorderMode && (
                      <>
                        <button
                          type="button"
                          onClick={() => moveCategoryOrder(cat.id, -1)}
                          className="p-2 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container-high transition-colors"
                          title="Move Up"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            arrow_upward
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => moveCategoryOrder(cat.id, 1)}
                          className="p-2 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container-high transition-colors"
                          title="Move Down"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            arrow_downward
                          </span>
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => startEditCategory(cat)}
                      className="p-2 rounded-lg bg-surface-container-low text-secondary hover:bg-surface-container-high hover:text-primary transition-colors"
                      title="Edit Taxonomy"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleArchiveCategory(cat)}
                      className="p-2 rounded-lg bg-surface-container-low text-error hover:bg-error-container transition-colors"
                      title="Archive Category"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  key={cat.id}
                  className="bg-surface-container-lowest px-space-md py-3 rounded-lg shadow-sm flex items-center justify-between gap-4 hover:bg-surface-container-low/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-label-code text-label-code px-1.5 py-0.5 rounded bg-primary text-on-primary">
                      #{cat.indexLabel}
                    </span>
                    <span className="font-label-lg text-label-lg text-primary font-semibold truncate">
                      {cat.name}
                    </span>
                    <span className="font-label-code text-label-code text-secondary hidden sm:inline">
                      {cat.code}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-label-code text-label-code text-on-surface-variant hidden md:inline">
                      {cat.materialSpec}
                    </span>
                    <span className="font-label-technical text-label-technical text-primary font-semibold">
                      {cat.productCount} SKUs
                    </span>
                    <button
                      type="button"
                      onClick={() => startEditCategory(cat)}
                      className="p-1.5 rounded bg-surface-container-low text-secondary hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                    </button>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Bottom Pagination Summary */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between text-on-surface-variant">
            <span className="font-label-technical text-label-technical">
              Total catalog capacity utilization: 78.4%
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled
                className="p-1.5 rounded hover:bg-surface-container-high text-primary disabled:opacity-30"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <span className="font-label-code text-label-code px-2 py-0.5 rounded bg-surface-container-high text-primary font-bold">
                1
              </span>
              <span className="font-label-code text-label-code px-2 py-0.5 text-secondary">2</span>
              <button
                type="button"
                className="p-1.5 rounded hover:bg-surface-container-high text-primary"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Add / Edit Category Quick Editor (4 cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-20">
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-md flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-technical text-label-technical text-secondary uppercase tracking-wider">
                  {editingId ? 'TAXONOMY UPDATE' : 'CREATION ENGINE'}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">
                  {editingId ? 'Edit Category' : 'Add New Category'}
                </h3>
              </div>
              <button
                type="button"
                onClick={resetCategoryForm}
                className="p-1.5 rounded-lg text-secondary hover:bg-surface-container-low"
                title="Clear form"
              >
                <span className="material-symbols-outlined text-[18px]">refresh</span>
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="flex flex-col gap-space-md">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-lg text-label-lg text-primary font-medium">
                  Category Name
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => handleAutoSlug(e.target.value)}
                  placeholder="e.g. Cardiovascular & Thoracic Instruments"
                  className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-label-lg text-label-lg text-primary font-medium">
                    URL Slug / Identifier
                  </label>
                  <span className="font-label-code text-label-code text-secondary">
                    Auto-formatted
                  </span>
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-3 font-label-code text-label-code text-secondary">
                    /cat/
                  </span>
                  <input
                    type="text"
                    required
                    value={catSlug}
                    onChange={(e) => setCatSlug(e.target.value)}
                    placeholder="cardiovascular-instruments"
                    className="w-full pl-12 pr-3 py-2 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-label-code text-label-code focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-lg text-label-lg text-primary font-medium">
                  Catalogue Classification Description
                </label>
                <textarea
                  rows={3}
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  placeholder="Specify technical scope, clinical scope, material standards..."
                  className="w-full p-3 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-lg text-label-lg text-primary font-medium">
                  Category Representative Image / CAD Vector
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-4 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-high transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-secondary group-hover:text-primary transition-colors shadow-sm mb-2">
                    <span className="material-symbols-outlined text-[22px]">cloud_upload</span>
                  </div>
                  <span className="font-label-lg text-label-lg text-primary font-medium">
                    {uploadedFileName || 'Drop high-res macro SVG / PNG'}
                  </span>
                  <span className="font-label-code text-label-code text-on-surface-variant mt-0.5">
                    Isolated white background, minimum 1200x800px
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      setUploadedFileName(e.target.files?.[0]?.name || null)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-space-sm items-center">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-label-lg text-primary font-medium">
                    Display Index
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={orderIndex}
                    onChange={(e) => setOrderIndex(Number(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface font-label-code text-label-code focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div className="flex flex-col justify-end pt-5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={megaMenuVisible}
                      onChange={(e) => setMegaMenuVisible(e.target.checked)}
                      className="w-4 h-4 rounded bg-surface-container-high text-primary-container focus:ring-0 cursor-pointer accent-primary"
                    />
                    <span className="font-label-technical text-label-technical text-primary">
                      Mega-Menu Vis.
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-space-sm pt-2">
                <button
                  type="button"
                  onClick={resetCategoryForm}
                  className="flex-1 py-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-lg text-label-lg"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-all font-label-lg text-label-lg shadow-sm"
                >
                  {editingId ? 'Update Category' : 'Save & Create'}
                </button>
              </div>
            </form>

            <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-2">
              <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5">
                info
              </span>
              <p className="font-label-technical text-label-technical text-secondary leading-tight">
                New categories automatically provision RFQ tender item slots and generate
                SEO-optimized catalog landing routes under DIN taxonomy standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary-container text-on-primary px-space-md py-3 rounded-xl shadow-xl flex items-center gap-3">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">
            check_circle
          </span>
          <span className="font-label-lg text-label-lg font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
