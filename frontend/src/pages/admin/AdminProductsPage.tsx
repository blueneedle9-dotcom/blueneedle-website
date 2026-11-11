import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAdminContext } from '../../components/AdminLayout';

interface ProductRecord {
  id: string;
  name: string;
  sku: string;
  standardRef: string;
  category: string;
  subCategory: string;
  alloy: string;
  alloyFilter: string;
  finishNote: string;
  length: string;
  hardness: string;
  passivation: string;
  description: string;
  dateAdded: string;
  status: 'Published' | 'Draft' | 'Archived';
  imageUrl: string;
  imageAlt: string;
}

const INITIAL_PRODUCTS: ProductRecord[] = [
  {
    id: 'prod-1',
    name: 'Mayo Dissecting Scissors (17.0cm Straight)',
    sku: 'BN-SC-1021-TC',
    standardRef: 'DIN 58298 Class IIa',
    category: 'Surgical Instruments',
    subCategory: 'Dissecting / Cutting',
    alloy: 'AISI 420B + Tungsten Carbide',
    alloyFilter: 'Sintered Tungsten Carbide (TC)',
    finishNote: 'Satin Matte, Gold Rings (70 HRC)',
    length: '170mm / 6.7 in',
    hardness: 'Base: 52-54 HRC | Jaws: 70-72 HRC',
    passivation: 'ASTM A967 Citric Passivation',
    description:
      'Heavy pattern straight dissecting scissors with sintered Tungsten Carbide edge inserts for fascia and heavy tissue sectioning.',
    dateAdded: 'Oct 24, 2024',
    status: 'Published',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuATV5Ei6Kcp6Xv65HlnUnYyuozLKOjwetklvp3WXA_5MCl4tqHU8L_4TeCDQw4_kNsdGUA_E8ox-v8oSFn_suU2sm2hSKtQ8d6FNEiQBz0hyKwycb-gT7D7NtCF2YFK6mhZQaG4tYBZXYrjyLOY7uo9etfijd2dAHZcumBA8E-3F8LkSl0b0NePbpOfbqvh7Evki41LOwtPC5FU7PiUchLtS9LrdQaJu-zT1NW10dQ',
    imageAlt:
      'High precision stainless steel Mayo Dissecting Scissors with gold-plated ring handles',
  },
  {
    id: 'prod-2',
    name: 'Halsted Mosquito Forceps (Curved 12.5cm)',
    sku: 'BN-FC-2044',
    standardRef: 'DIN 1.4021 Interlock',
    category: 'Surgical Instruments',
    subCategory: 'Hemostatic Clamps',
    alloy: 'AISI 420B Martensitic',
    alloyFilter: 'AISI 420B Martensitic',
    finishNote: 'Mirror Polish, Box Lock',
    length: '125mm / 5.0 in',
    hardness: '46-48 HRC (Temper Controlled)',
    passivation: 'Electropolished Ultra-Specular',
    description:
      'Delicate curved hemostatic forceps with fine horizontal jaw serrations and three-step precision ratchet lock.',
    dateAdded: 'Oct 23, 2024',
    status: 'Published',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCToKRD2tFZadfgYOuI7wWs-PoXjV9BOngdOjmfuB36AH3k166us0VKO0fJFThQLKF9T_GJmS5YRI_0OnFjpVU10YZo8aqa42JLoUDmblCgLqEipmZMp4mDLD4u3zy_DShFX14TLq0kQ3hqv5uZm2SRXi3_8UBBxnfd3H8PFioElqYiV0lQSOEhb4K8sD8kT2aBfZRHsU6RBkQinPxi-PgaVq7nK9eYZs7DZGuq7w0',
    imageAlt: 'Microscopic precision Halsted Mosquito Forceps curved surgical clamp',
  },
  {
    id: 'prod-3',
    name: 'Crile-Wood Needle Holder (Gold Handle TC)',
    sku: 'BN-NH-3105',
    standardRef: 'Suture 3-0 to 6-0',
    category: 'Needle Holders',
    subCategory: 'Vascular & General',
    alloy: 'Sintered TC Insert + AISI 420',
    alloyFilter: 'Sintered Tungsten Carbide (TC)',
    finishNote: 'Gold Plated Ring, 0.4mm Pitch',
    length: '150mm / 6.0 in',
    hardness: 'Frame: 45 HRC | Inserts: 72 HRC',
    passivation: 'ASTM A967 Citric Passivation',
    description:
      'Tapered delicate jaws inlaid with replaceable tungsten carbide inserts engineered for zero-slip needle retention.',
    dateAdded: 'Oct 20, 2024',
    status: 'Published',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBKdnnO40Ky74tZe4Rotruh8-uMzTRlsCbZpzjL1u1Wh2Q1QjrXBNQOJaYB0wCR3c_8j0qF8WGwsGrWPr1pemsJqhTOSmZGAkg-9Sedp82MjSGzG7aDoJ9n95rcVKS9K-HnV04qNjiyD3iL-FPhq-GFs5ZJssINMO_vy5UdHmTmtp7JDfpvccGDZTZlOcRB6eQHLz4ZpJBA1PsbYv43tXv6xbNNjOcIbP2caNYzMyg',
    imageAlt:
      'Crile-Wood Surgical Needle Holder with gold dipped handles and cross serrated tungsten carbide jaws',
  },
  {
    id: 'prod-4',
    name: 'Beyer Bone Rongeur (Double-Action 18.0cm)',
    sku: 'BN-OR-6120',
    standardRef: 'Jaw Width: 3.5mm',
    category: 'Orthopedic Instruments',
    subCategory: 'Bone Cutting & Gouging',
    alloy: 'AISI 440C High-Carbon',
    alloyFilter: 'AISI 440C High-Carbon',
    finishNote: 'Cryogenic Annealed, 58 HRC',
    length: '180mm / 7.0 in',
    hardness: '56-58 HRC (Cryogenic Cycle)',
    passivation: 'Micro-Bead Blasted Satin Matte',
    description:
      'Double-action compound joint orthopedic rongeur with oval curved scoop jaws for high-force cranial and spinal bone nibbling.',
    dateAdded: 'Oct 18, 2024',
    status: 'Draft',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCm802857lyNtOtVKEhRSVPJNDLRRRiC-R_Ag7nHqgroH4pZH0RvmO9-Vewo8lVRcjsRhdPcfnBu38bi40KfwMe_hxod1b-f0QtyYkdZQH7xFlWkndljPevZVhUlugca7-lxMzYTJjnDrwu1zH-aIXsWQFReE7whjUawMkNaleNA8CMBtf_UZ3UACOyhupy2U9KQU8Ua6v4Px7Lrm694VRoobmNtcvldGZBeTy00mk',
    imageAlt:
      'Heavy orthopedic Beyer Bone Rongeur double-action compound joint instrument',
  },
  {
    id: 'prod-5',
    name: 'Castroviejo Micro Caliper (0-20mm Precision)',
    sku: 'BN-OP-7005',
    standardRef: 'Tolerance +/-0.05mm',
    category: 'Ophthalmic Instruments',
    subCategory: 'Micro-Measurement',
    alloy: 'Titanium Gr. 5 + Stainless',
    alloyFilter: 'Titanium Grade 5 (Ti-6Al-4V)',
    finishNote: 'Laser Etched, Non-Reflective Blue',
    length: '85mm / 3.3 in',
    hardness: 'Ti-6Al-4V Anodized Grade 5',
    passivation: 'Titanium Nitride / Blue Anodized',
    description:
      'Ophthalmic caliper with precision knurled thumbscrew adjustment and dual-sided millimeter graduations for strabismus and corneal work.',
    dateAdded: 'Oct 15, 2024',
    status: 'Published',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCdOn3cY1n-MYw4KJNuBOVVu80WxD9rTnGD2wrNHTklEfCZusym2zEAY-pkv_OAA6p-5wJuHRNNOg887KCDhDwFJKlIf1I3Qg7tSkO8EX8dOKAp6IqDcqh0kAJrH2JNsrI-FnOBGnTnHavbzhz29BU0VhHF6VUMap386y5oPiYvdsYA9P_j09F_c8NuWlhkfTLS-B-xVGTDnMN6-O6Ha4FJi-fCb1v5o7RVa-r1W4',
    imageAlt:
      'Castroviejo ophthalmic micro caliper with laser engraved millimeter markings',
  },
  {
    id: 'prod-6',
    name: 'Cryer Dental Elevator (Pair Left & Right)',
    sku: 'BN-DT-8892',
    standardRef: 'Dual Matched Set',
    category: 'Dental Instruments',
    subCategory: 'Oral Surgery / Exodontia',
    alloy: 'AISI 420 High-T',
    alloyFilter: 'AISI 420B Martensitic',
    finishNote: 'Autoclavable Knurled Grip',
    length: '145mm / 5.7 in',
    hardness: '50-52 HRC Vacuum Hardened',
    passivation: 'ASTM A967 Citric Passivation',
    description:
      'Triangular sharp apex root elevators matched left and right with hollow ergonomic octal grip handles.',
    dateAdded: 'Oct 10, 2024',
    status: 'Published',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8zGOJj8FcYqLziGX61Cxgql1JkX0HxOi3TkkmVEbg_fYYpGiJf7iiWWBkAK2maw-sokF6_5GecCZKwLE4QyCbSBqFqdXzgIjBIxzE333R38MBpnny5cj7a_lJBfEhChkIsueuQw5zt92LqPBpYejkYXnwiGSutfH8_4MQQhJcGaDXyTVluYpAeTfqruG4etCPqTG_KPV9HS_izUNKfSkQKe3KQ09fSuD9UBVdFDo',
    imageAlt: 'Cryer Dental Elevator pair left and right ergonomic knurled handle',
  },
];

const DEFAULT_STUDIO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDN5TkmE6Y7BxikCHtvOdWj8If8VPRUXAS-dUuboN_HN-NI5BPsAXsYEzg9bwCeetRU2vqZqbItNhYwf-nc_-pCIhfeCYiSdI2PRxCHhRjbqhx_YlyxaOGfIIKyEQ-Mcp_SLZFRpbcUeZEjVTe1XOAONuW1uPvUTnBDJ0jKVXjyh7EfYQEKVHhnNUWB2PrcvQaoYStL9ssQUn3wE80KWUVZd39NJGbasBEvUYZ0MZA';

export const AdminProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { globalSearch } = useAdminContext();

  const [products, setProducts] = useState<ProductRecord[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState(globalSearch || '');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [alloyFilter, setAlloyFilter] = useState('All Alloys');

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<{ title: string; subtitle: string } | null>(null);

  // Drawer form state
  const [formName, setFormName] = useState('Metzenbaum-Nelson Dissecting Scissors TC');
  const [formCategory, setFormCategory] = useState('Surgical Instruments');
  const [formSubCategory, setFormSubCategory] = useState('Dissecting & Cutting');
  const [formSku, setFormSku] = useState('BN-SC-1035-TC');
  const [formDesc, setFormDesc] = useState(
    'Slender curved shaft dissecting scissors with vacuum-brazed Tungsten Carbide cutting edges for delicate cardiovascular and plastic surgery.'
  );
  const [formLength, setFormLength] = useState('180mm / 7.0 in');
  const [formAlloy, setFormAlloy] = useState('AISI 420B Martensitic + Tungsten Carbide');
  const [formHardness, setFormHardness] = useState('Base: 52-54 HRC | Jaws: 70-72 HRC');
  const [formPassivation, setFormPassivation] = useState('ASTM A967 Citric Passivation');
  const [formStatus, setFormStatus] = useState<'Published' | 'Draft'>('Published');
  const [formImage, setFormImage] = useState(DEFAULT_STUDIO_IMG);

  useEffect(() => {
    if (globalSearch) {
      setSearchQuery(globalSearch);
    }
  }, [globalSearch]);

  useEffect(() => {
    if (searchParams.get('new') === '1') {
      openAddDrawer();
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const showToast = (title: string, subtitle: string) => {
    setToastMsg({ title, subtitle });
    setTimeout(() => {
      setToastMsg(null);
    }, 3500);
  };

  const openAddDrawer = () => {
    setEditingId(null);
    setFormName('Metzenbaum-Nelson Dissecting Scissors TC');
    setFormCategory('Surgical Instruments');
    setFormSubCategory('Dissecting & Cutting');
    setFormSku('BN-SC-1035-TC');
    setFormDesc(
      'Slender curved shaft dissecting scissors with vacuum-brazed Tungsten Carbide cutting edges for delicate cardiovascular and plastic surgery.'
    );
    setFormLength('180mm / 7.0 in');
    setFormAlloy('AISI 420B Martensitic + Tungsten Carbide');
    setFormHardness('Base: 52-54 HRC | Jaws: 70-72 HRC');
    setFormPassivation('ASTM A967 Citric Passivation');
    setFormStatus('Published');
    setFormImage(DEFAULT_STUDIO_IMG);
    setDrawerOpen(true);
  };

  const openEditDrawer = (product: ProductRecord) => {
    setEditingId(product.id);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormSubCategory(product.subCategory);
    setFormSku(product.sku);
    setFormDesc(product.description);
    setFormLength(product.length);
    setFormAlloy(product.alloy);
    setFormHardness(product.hardness);
    setFormPassivation(product.passivation);
    setFormStatus(product.status === 'Draft' ? 'Draft' : 'Published');
    setFormImage(product.imageUrl);
    setDrawerOpen(true);
  };

  const handleAutoSku = () => {
    const code = Math.floor(1000 + Math.random() * 8999);
    setFormSku(`BN-SC-${code}-TC`);
  };

  const handleSaveProduct = (statusOverride?: 'Published' | 'Draft') => {
    const finalStatus = statusOverride || formStatus;
    if (!formName.trim() || !formSku.trim()) return;

    if (editingId) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: formName.trim(),
                sku: formSku.trim(),
                category: formCategory,
                subCategory: formSubCategory,
                alloy: formAlloy,
                description: formDesc,
                length: formLength,
                hardness: formHardness,
                passivation: formPassivation,
                status: finalStatus,
                imageUrl: formImage,
              }
            : item
        )
      );
      showToast(
        'Instrument Catalog Updated',
        `${formSku.trim()} updated (${finalStatus}).`
      );
    } else {
      const newRecord: ProductRecord = {
        id: `prod-${Date.now()}`,
        name: formName.trim(),
        sku: formSku.trim(),
        standardRef: 'DIN 58298 Class IIa',
        category: formCategory,
        subCategory: formSubCategory,
        alloy: formAlloy,
        alloyFilter: formAlloy.includes('TC')
          ? 'Sintered Tungsten Carbide (TC)'
          : 'AISI 420B Martensitic',
        finishNote: formPassivation,
        length: formLength,
        hardness: formHardness,
        passivation: formPassivation,
        description: formDesc,
        dateAdded: 'Today',
        status: finalStatus,
        imageUrl: formImage,
        imageAlt: formName.trim(),
      };
      setProducts((prev) => [newRecord, ...prev]);
      showToast(
        'Instrument Catalog Updated',
        `${formSku.trim()} published to primary tender manifest.`
      );
    }

    setDrawerOpen(false);
  };

  const handleArchiveProduct = (product: ProductRecord) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, status: 'Archived' } : p))
    );
    showToast('Instrument Archived', `${product.sku} moved to decommissioned archive.`);
  };

  const handleExportCsv = () => {
    const headers = ['SKU', 'Name', 'Category', 'Alloy', 'Status', 'Date Added'];
    const rows = filteredProducts.map((p) => [
      p.sku,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      `"${p.alloy}"`,
      p.status,
      `"${p.dateAdded}"`,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'blueneedle-instruments-export.csv';
    link.click();
    URL.revokeObjectURL(url);
    showToast('Export Complete', `Exported ${filteredProducts.length} specification rows to CSV.`);
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      if (categoryFilter !== 'All Categories' && p.category !== categoryFilter) {
        return false;
      }
      if (statusFilter !== 'All Status') {
        if (statusFilter === 'Draft' && p.status !== 'Draft') return false;
        if (statusFilter === 'Published' && p.status !== 'Published') return false;
        if (statusFilter === 'Archived' && p.status !== 'Archived') return false;
      }
      if (alloyFilter !== 'All Alloys' && p.alloyFilter !== alloyFilter) {
        return false;
      }
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.standardRef.toLowerCase().includes(q) ||
        p.alloy.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [products, searchQuery, categoryFilter, statusFilter, alloyFilter]);

  const hasActiveFilters =
    categoryFilter !== 'All Categories' ||
    statusFilter !== 'All Status' ||
    alloyFilter !== 'All Alloys' ||
    searchQuery.trim().length > 0;

  return (
    <div className="flex flex-col w-full">
      {/* Top Command & Metrics Overview Bar */}
      <div className="flex flex-col gap-space-lg mb-space-lg">
        {/* Breadcrumb & Status Telemetry */}
        <div className="flex flex-wrap items-center justify-between gap-y-2">
          <div className="flex items-center gap-2">
            <span className="font-label-code text-label-code text-secondary tracking-widest uppercase">
              Catalog Database
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim" />
            <span className="font-label-technical text-label-technical text-on-surface-variant uppercase">
              Registry Tier 1 (ISO 13485 / CE Compliant)
            </span>
          </div>
          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-label-code text-label-code text-secondary">
                SYNC ACTIVE: DÜSSELDORF VAULT #04
              </span>
            </div>
            <span className="font-label-code text-label-code text-on-surface-variant">
              REV 2024.11
            </span>
          </div>
        </div>

        {/* Editorial Header & Main Operations */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_1px_8px_rgba(20,43,69,0.04)]">
          <div className="max-w-2xl">
            <div className="flex items-center gap-space-sm mb-1">
              <span className="font-label-code text-label-code text-secondary px-2 py-0.5 rounded bg-surface-container tracking-wider uppercase">
                DIN 58298 / ISO 7153-1
              </span>
              <span className="font-label-code text-label-code text-on-surface-variant">
                Martensitic Steel Ledger
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-semibold">
              Product Management
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Manage, edit, publish, and inspect all 2,480 catalogued surgical and medical
              instruments.
            </p>
          </div>
          <div className="flex items-center gap-space-sm flex-wrap">
            <button
              type="button"
              onClick={handleExportCsv}
              className="group flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-lg text-label-lg transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary group-hover:text-primary">
                download
              </span>
              <span>Export CSV / Spec Sheets</span>
            </button>
            <button
              type="button"
              onClick={openAddDrawer}
              className="flex items-center gap-2 px-space-lg py-2.5 rounded-lg bg-primary-container hover:bg-inverse-surface text-on-primary font-label-lg text-label-lg tracking-wide transition-all shadow-[0_2px_6px_rgba(20,43,69,0.12)]"
            >
              <span className="material-symbols-outlined text-[20px] text-primary-fixed">add</span>
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* Metric Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-[0_1px_4px_rgba(20,43,69,0.03)] flex items-center justify-between">
            <div>
              <div className="font-label-code text-label-code text-secondary uppercase">
                Total Instruments
              </div>
              <div className="font-headline-md text-headline-md text-primary font-semibold mt-0.5">
                2,480
              </div>
              <span className="font-label-code text-[10px] text-emerald-600 flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-[12px]">trending_up</span> +14 this
                month
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">
                precision_manufacturing
              </span>
            </div>
          </div>

          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-[0_1px_4px_rgba(20,43,69,0.03)] flex items-center justify-between">
            <div>
              <div className="font-label-code text-label-code text-secondary uppercase">
                Published Live
              </div>
              <div className="font-headline-md text-headline-md text-primary font-semibold mt-0.5">
                2,394
              </div>
              <span className="font-label-code text-[10px] text-secondary mt-1 block">
                96.5% active in catalog
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">public</span>
            </div>
          </div>

          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-[0_1px_4px_rgba(20,43,69,0.03)] flex items-center justify-between">
            <div>
              <div className="font-label-code text-label-code text-secondary uppercase">
                Engineering Drafts
              </div>
              <div className="font-headline-md text-headline-md text-primary font-semibold mt-0.5">
                86
              </div>
              <span className="font-label-code text-[10px] text-amber-700 mt-1 block">
                Pending CAD / Passivation
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">edit_note</span>
            </div>
          </div>

          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-[0_1px_4px_rgba(20,43,69,0.03)] flex items-center justify-between">
            <div>
              <div className="font-label-code text-label-code text-secondary uppercase">
                Tungsten Carbide (TC)
              </div>
              <div className="font-headline-md text-headline-md text-primary font-semibold mt-0.5">
                642
              </div>
              <span className="font-label-code text-[10px] text-secondary mt-1 block">
                Gold Ring Verified
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtration & Search Matrix */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-[0_1px_6px_rgba(20,43,69,0.03)] flex flex-col gap-space-sm mb-space-md">
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-space-sm">
          <div className="relative flex-1 min-w-[280px]">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name, SKU, DIN pattern or alloy..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-9 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:outline-none cursor-pointer"
              >
                <option value="All Categories">All Categories (12)</option>
                <option value="Surgical Instruments">Surgical Instruments</option>
                <option value="Needle Holders">Needle Holders</option>
                <option value="Orthopedic Instruments">Orthopedic Instruments</option>
                <option value="Ophthalmic Instruments">Ophthalmic Instruments</option>
                <option value="Dental Instruments">Dental Instruments</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[18px]">
                expand_more
              </span>
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-9 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:outline-none cursor-pointer"
              >
                <option value="All Status">All Status (Published, Draft, Archived)</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived / Decommissioned</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[18px]">
                expand_more
              </span>
            </div>

            <div className="relative">
              <select
                value={alloyFilter}
                onChange={(e) => setAlloyFilter(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-9 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:outline-none cursor-pointer"
              >
                <option value="All Alloys">All Alloys (AISI 420B, 440C, TC, Titanium)</option>
                <option value="AISI 420B Martensitic">AISI 420B Martensitic</option>
                <option value="AISI 440C High-Carbon">AISI 440C High-Carbon</option>
                <option value="Sintered Tungsten Carbide (TC)">
                  Sintered Tungsten Carbide (TC)
                </option>
                <option value="Titanium Grade 5 (Ti-6Al-4V)">Titanium Grade 5 (Ti-6Al-4V)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[18px]">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-label-technical text-label-technical text-secondary uppercase">
              Applied Specifications:
            </span>
            {statusFilter !== 'All Status' && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-code text-label-code">
                <span>Status: {statusFilter}</span>
                <button
                  type="button"
                  onClick={() => setStatusFilter('All Status')}
                  className="hover:text-primary flex items-center"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            )}
            {categoryFilter !== 'All Categories' && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-code text-label-code">
                <span>Category: {categoryFilter}</span>
                <button
                  type="button"
                  onClick={() => setCategoryFilter('All Categories')}
                  className="hover:text-primary flex items-center"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            )}
            {alloyFilter !== 'All Alloys' && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-code text-label-code">
                <span>Alloy: {alloyFilter}</span>
                <button
                  type="button"
                  onClick={() => setAlloyFilter('All Alloys')}
                  className="hover:text-primary flex items-center"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            )}
            {!hasActiveFilters && (
              <span className="font-label-code text-label-code text-on-surface-variant">
                Showing full ledger ({products.length} loaded)
              </span>
            )}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('All Categories');
                  setStatusFilter('All Status');
                  setAlloyFilter('All Alloys');
                }}
                className="font-label-code text-label-code text-secondary hover:text-primary ml-1 underline decoration-secondary"
              >
                Reset Filters
              </button>
            )}
          </div>
          <div className="font-label-code text-label-code text-on-surface-variant">
            Query Speed: <span className="text-primary font-medium">18ms</span> (Server Cache Hit)
          </div>
        </div>
      </div>

      {/* Primary Medical Instrument Listing Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-[0_1px_8px_rgba(20,43,69,0.04)] overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-secondary font-label-code text-label-code uppercase tracking-wider">
                <th className="py-3.5 px-space-md">Product (Thumbnail + Spec Ref)</th>
                <th className="py-3.5 px-space-md">Category</th>
                <th className="py-3.5 px-space-md">Material &amp; Finish</th>
                <th className="py-3.5 px-space-md">Date Added</th>
                <th className="py-3.5 px-space-md">Status</th>
                <th className="py-3.5 px-space-md text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low text-body-sm font-body-sm">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-surface-container-low/60 transition-colors group"
                >
                  <td className="py-3.5 px-space-md">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-12 h-12 rounded-lg bg-surface-container-lowest p-1 shadow-sm flex items-center justify-center shrink-0">
                        <img
                          src={product.imageUrl}
                          alt={product.imageAlt}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-headline-sm text-sm text-primary font-semibold truncate group-hover:text-secondary transition-colors">
                          {product.name}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-label-technical text-label-technical text-secondary">
                            SKU: {product.sku}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-outline-variant" />
                          <span className="font-label-code text-[11px] text-on-surface-variant">
                            {product.standardRef}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-space-md">
                    <span className="px-2.5 py-1 rounded bg-surface-container-low text-on-surface font-label-md text-label-md">
                      {product.category}
                    </span>
                    <div className="font-label-technical text-[11px] text-secondary mt-0.5">
                      {product.subCategory}
                    </div>
                  </td>

                  <td className="py-3.5 px-space-md">
                    <div className="font-body-sm text-primary font-medium">{product.alloy}</div>
                    <div className="font-label-code text-label-code text-on-surface-variant">
                      {product.finishNote}
                    </div>
                  </td>

                  <td className="py-3.5 px-space-md font-label-code text-label-code text-on-surface-variant">
                    {product.dateAdded}
                  </td>

                  <td className="py-3.5 px-space-md">
                    {product.status === 'Published' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-label-code text-label-code font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Published
                      </span>
                    )}
                    {product.status === 'Draft' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-label-code text-label-code font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" /> Draft Review
                      </span>
                    )}
                    {product.status === 'Archived' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-code text-label-code font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-outline" /> Archived
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-space-md text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEditDrawer(product)}
                        className="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-primary transition-colors"
                        title="Edit Spec Sheet"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditDrawer(product)}
                        className="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-primary transition-colors"
                        title="View Technical Manifest"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleArchiveProduct(product)}
                        className="p-1.5 rounded hover:bg-error-container text-secondary hover:text-error transition-colors"
                        title="Decommission / Archive"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Technical Table Pagination Footnote */}
        <div className="px-space-md py-space-sm bg-surface-container-lowest flex flex-col sm:flex-row items-center justify-between gap-y-3">
          <div className="flex items-center gap-2">
            <span className="font-label-code text-label-code text-on-surface-variant">
              Showing <strong className="text-primary font-semibold">1-{filteredProducts.length}</strong> of{' '}
              <strong className="text-primary font-semibold">2,480</strong> instruments
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim" />
            <span className="font-label-code text-label-code text-secondary">
              Registry Page 1 of 414
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled
              className="px-3 py-1.5 rounded-lg bg-surface-container-low text-outline opacity-50 cursor-not-allowed font-label-md text-label-md flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              <span>Previous</span>
            </button>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-primary-container text-on-primary font-label-code text-label-code font-bold"
              >
                1
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-code text-label-code"
              >
                2
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-code text-label-code"
              >
                3
              </button>
              <span className="px-1 text-on-surface-variant font-label-code text-label-code">
                ...
              </span>
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-code text-label-code"
              >
                414
              </button>
            </div>
            <button
              type="button"
              className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1"
            >
              <span>Next</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Slide-Over Drawer Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Slide-Over Drawer Shell */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-surface-container-lowest shadow-[0_20px_40px_-8px_rgba(20,43,69,0.22)] z-50 transition-transform duration-300 ease-out flex flex-col justify-between overflow-hidden ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-20 px-space-lg flex items-center justify-between bg-surface-container-lowest shrink-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm text-primary font-semibold tracking-tight">
                {editingId ? 'Edit Surgical Instrument' : 'Add New Product'}
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container font-label-code text-label-code text-secondary uppercase font-semibold">
                Creating Draft / Live Instrument
              </span>
            </div>
            <span className="font-label-technical text-label-technical text-on-surface-variant mt-0.5">
              DIN 58298 Surgical Matrix &amp; Metallurgy Verification
            </span>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="w-9 h-9 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Drawer Scrollable Form Fields */}
        <div className="flex-1 overflow-y-auto px-space-lg py-space-md flex flex-col gap-space-lg">
          {/* 01. Nomenclature & Taxonomy */}
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <span className="font-label-technical text-label-technical text-secondary uppercase tracking-wider">
                01. Nomenclature &amp; Taxonomy
              </span>
              <span className="font-label-code text-[11px] text-on-surface-variant">
                Required Specs *
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-primary font-semibold">
                Product Name *
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-primary font-semibold">
                  Primary Category *
                </label>
                <div className="relative">
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-9 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:outline-none cursor-pointer"
                  >
                    <option value="Surgical Instruments">Surgical Instruments</option>
                    <option value="Needle Holders">Needle Holders</option>
                    <option value="Orthopedic Instruments">Orthopedic Instruments</option>
                    <option value="Ophthalmic Instruments">Ophthalmic Instruments</option>
                    <option value="Dental Instruments">Dental Instruments</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[18px]">
                    expand_more
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-primary font-semibold">
                  Secondary / Sub-Category
                </label>
                <div className="relative">
                  <select
                    value={formSubCategory}
                    onChange={(e) => setFormSubCategory(e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-9 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:outline-none cursor-pointer"
                  >
                    <option value="Dissecting & Cutting">Dissecting &amp; Cutting</option>
                    <option value="Hemostatic Clamps">Hemostatic Clamps</option>
                    <option value="Vascular Micro Scissors">Vascular Micro Scissors</option>
                    <option value="Bandage & Wire Cutters">Bandage &amp; Wire Cutters</option>
                    <option value="Delicate Plastic Surgery">Delicate Plastic Surgery</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[18px]">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-primary font-semibold">
                SKU / Pattern Ref *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formSku}
                  onChange={(e) => setFormSku(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-label-code text-label-code focus:outline-none focus:bg-surface-container-lowest transition-all"
                />
                <button
                  type="button"
                  onClick={handleAutoSku}
                  className="px-3 py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-secondary font-label-code text-label-code uppercase tracking-wide"
                >
                  Auto Generate
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-primary font-semibold">
                Short Technical Description
              </label>
              <textarea
                rows={3}
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest transition-all"
              />
            </div>
          </div>

          {/* 02. Metallurgy & Engineering Metrics */}
          <div className="flex flex-col gap-space-md bg-surface-container-low p-space-md rounded-xl">
            <div className="flex items-center justify-between">
              <span className="font-label-technical text-label-technical text-secondary uppercase tracking-wider">
                02. Metallurgy &amp; Technical Specifications
              </span>
              <span className="font-label-code text-label-code text-secondary">
                ASTM F899 Compliant
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-primary font-semibold">
                  Operating Length
                </label>
                <input
                  type="text"
                  value={formLength}
                  onChange={(e) => setFormLength(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-code text-label-code focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-primary font-semibold">
                  Alloy Formulation
                </label>
                <div className="relative">
                  <select
                    value={formAlloy}
                    onChange={(e) => setFormAlloy(e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-8 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-code text-label-code focus:outline-none cursor-pointer"
                  >
                    <option value="AISI 420B Martensitic + Tungsten Carbide">
                      AISI 420B Martensitic + Tungsten Carbide
                    </option>
                    <option value="AISI 440C High-Carbon Stainless">
                      AISI 440C High-Carbon Stainless
                    </option>
                    <option value="German Stainless DIN 1.4021">
                      German Stainless DIN 1.4021
                    </option>
                    <option value="Titanium Gr. 5 (Ti-6Al-4V)">
                      Titanium Gr. 5 (Ti-6Al-4V)
                    </option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[16px]">
                    expand_more
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-primary font-semibold">
                  Rockwell Hardness (HRC)
                </label>
                <input
                  type="text"
                  value={formHardness}
                  onChange={(e) => setFormHardness(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-code text-label-code focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-primary font-semibold">
                  Surface Passivation
                </label>
                <div className="relative">
                  <select
                    value={formPassivation}
                    onChange={(e) => setFormPassivation(e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-8 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-code text-label-code focus:outline-none cursor-pointer"
                  >
                    <option value="ASTM A967 Citric Passivation">
                      ASTM A967 Citric Passivation
                    </option>
                    <option value="Electropolished Ultra-Specular">
                      Electropolished Ultra-Specular
                    </option>
                    <option value="Micro-Bead Blasted Satin Matte">
                      Micro-Bead Blasted Satin Matte
                    </option>
                    <option value="Titanium Nitride (TiN) Gold Ceramic">
                      Titanium Nitride (TiN) Gold Ceramic
                    </option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[16px]">
                    expand_more
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 03. Studio Photography */}
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-technical text-label-technical text-secondary uppercase tracking-wider">
                03. Studio Photography (Isolated Cutout)
              </span>
              <span className="font-label-code text-[11px] text-on-surface-variant">
                Min. 1600 × 1200px • RGB 255 White
              </span>
            </div>
            <div className="relative p-space-md rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-center gap-space-md">
              <div className="w-28 h-28 rounded-lg bg-surface-container-lowest p-2 shadow-sm shrink-0 flex items-center justify-center">
                <img
                  src={formImage}
                  alt={formName}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <span className="font-label-lg text-label-lg text-primary font-semibold">
                  drop high-res PNG/JPG, white background
                </span>
                <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">
                  Instruments must feature lossless pure white clipping `#FFFFFF` with no studio
                  drop shadows for clinical tenders.
                </p>
                <div className="flex items-center gap-2 mt-1 justify-center sm:justify-start">
                  <button
                    type="button"
                    onClick={() => setFormImage(DEFAULT_STUDIO_IMG)}
                    className="px-2.5 py-1 rounded bg-surface-container-lowest hover:bg-surface-container font-label-code text-label-code text-secondary font-medium"
                  >
                    Replace Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormImage(DEFAULT_STUDIO_IMG)}
                    className="px-2.5 py-1 rounded bg-surface-container-lowest hover:bg-error-container hover:text-error font-label-code text-label-code text-on-surface-variant font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-1">
              <span className="font-label-code text-label-code text-secondary uppercase">
                Detail Macro Angles (4 Slots)
              </span>
              <div className="grid grid-cols-4 gap-2">
                <div className="h-16 rounded-lg bg-surface-container-low hover:bg-surface-container flex flex-col items-center justify-center cursor-pointer transition-colors p-1 text-center">
                  <span className="material-symbols-outlined text-secondary text-[18px]">biotech</span>
                  <span className="font-label-code text-[9px] text-on-surface-variant uppercase mt-0.5">
                    Jaws Close-up
                  </span>
                </div>
                <div className="h-16 rounded-lg bg-surface-container-low hover:bg-surface-container flex flex-col items-center justify-center cursor-pointer transition-colors p-1 text-center">
                  <span className="material-symbols-outlined text-secondary text-[18px]">build</span>
                  <span className="font-label-code text-[9px] text-on-surface-variant uppercase mt-0.5">
                    Screw Boxlock
                  </span>
                </div>
                <div className="h-16 rounded-lg bg-surface-container-low hover:bg-surface-container flex flex-col items-center justify-center cursor-pointer transition-colors p-1 text-center">
                  <span className="material-symbols-outlined text-secondary text-[18px]">
                    radio_button_checked
                  </span>
                  <span className="font-label-code text-[9px] text-on-surface-variant uppercase mt-0.5">
                    Rings / TC Gold
                  </span>
                </div>
                <div className="h-16 rounded-lg bg-surface-container-low hover:bg-surface-container flex flex-col items-center justify-center cursor-pointer transition-colors p-1 text-center border-dashed border-2 border-outline-variant/30">
                  <span className="material-symbols-outlined text-secondary text-[18px]">
                    add_photo_alternate
                  </span>
                  <span className="font-label-code text-[9px] text-secondary uppercase mt-0.5">
                    Upload Scale
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 04. Visibility & Storefront Distribution */}
          <div className="flex flex-col gap-space-sm pt-2">
            <span className="font-label-technical text-label-technical text-secondary uppercase tracking-wider">
              04. Visibility &amp; Storefront Distribution
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
              <label className="flex items-start gap-3 p-space-md rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                <input
                  type="radio"
                  name="publish_status"
                  value="published"
                  checked={formStatus === 'Published'}
                  onChange={() => setFormStatus('Published')}
                  className="mt-1 accent-primary w-4 h-4 cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg text-primary font-semibold">
                    Published (Live on Website)
                  </span>
                  <span className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                    Visible to institutional hospital buyers and B2B tender quoting systems.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-space-md rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                <input
                  type="radio"
                  name="publish_status"
                  value="draft"
                  checked={formStatus === 'Draft'}
                  onChange={() => setFormStatus('Draft')}
                  className="mt-1 accent-primary w-4 h-4 cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg text-primary font-semibold">
                    Draft (Internal Review)
                  </span>
                  <span className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                    Held in review. Only visible to BlueNeedle engineering and QA personnel.
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Drawer Footer CTAs */}
        <div className="h-20 px-space-lg flex items-center justify-between bg-surface-container-lowest shadow-[0_-4px_12px_rgba(20,43,69,0.04)] shrink-0">
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="px-space-md py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-secondary hover:text-primary font-label-lg text-label-lg transition-colors"
          >
            Cancel Changes
          </button>
          <div className="flex items-center gap-space-sm">
            <button
              type="button"
              onClick={() => handleSaveProduct('Draft')}
              className="px-space-md py-2.5 rounded-lg bg-surface-container text-primary font-label-lg text-label-lg hover:bg-surface-container-high transition-colors"
            >
              Save Draft Spec
            </button>
            <button
              type="button"
              onClick={() => handleSaveProduct('Published')}
              className="flex items-center gap-2 px-space-lg py-2.5 rounded-lg bg-primary-container hover:bg-inverse-surface text-on-primary font-label-lg text-label-lg font-semibold tracking-wide transition-all shadow-[0_2px_8px_rgba(20,43,69,0.14)]"
            >
              <span className="material-symbols-outlined text-[18px]">publish</span>
              <span>Save Product &amp; Publish</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary-container text-on-primary px-space-md py-3 rounded-xl shadow-xl flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-emerald-500 text-on-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[16px]">check</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg font-semibold">{toastMsg.title}</span>
            <span className="font-label-code text-[11px] text-surface-container-high">
              {toastMsg.subtitle}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
