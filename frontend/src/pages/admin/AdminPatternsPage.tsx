import React, { useMemo, useState } from 'react';

interface MasterPatternRow {
  sku: string;
  rev: string;
  name: string;
  subtitle: string;
  previewTitle: string;
  category: string;
  categorySub: string;
  alloy: string;
  alloySub: string;
  hrcCore: string;
  hrcSub: string;
  hrcSummary: string;
  tolerance: string;
  die: string;
  status: string;
  icon: string;
  presetTag: 'tc' | 'supercut' | 'titanium' | 'all';
}

const INITIAL_PATTERNS: MasterPatternRow[] = [
  {
    sku: 'BN-SC-1021-TC',
    rev: 'REV D',
    name: 'Mayo Dissecting Scissors',
    subtitle: '17.0cm Straight | Beveled Edge',
    previewTitle: 'Mayo Dissecting Scissors (17.0cm Straight)',
    category: 'Surgical Scissors',
    categorySub: 'Class IIa Surgical Active',
    alloy: 'AISI 420B Martensitic',
    alloySub: '+ Sintered TC Tip Matrix',
    hrcCore: 'HRC 54–56 (Core)',
    hrcSub: 'TC Insert: 71–73 HRC',
    hrcSummary: '54-56 / TC 71-73 HRC',
    tolerance: '±0.025 mm',
    die: 'Die-SC-04',
    status: 'In Active Production',
    icon: 'content_cut',
    presetTag: 'tc',
  },
  {
    sku: 'BN-FC-2044',
    rev: 'REV B',
    name: 'Halsted Mosquito Forceps',
    subtitle: '12.5cm Curved | Serrated Jaw',
    previewTitle: 'Halsted Mosquito Forceps (12.5cm Curved)',
    category: 'Hemostatic Clamps',
    categorySub: 'Class I Reusable Invasive',
    alloy: 'AISI 420B Martensitic',
    alloySub: 'Passivated Cr-Oxide',
    hrcCore: 'HRC 52–54',
    hrcSub: 'Box-Lock: 3-Pos Ratchet',
    hrcSummary: '52-54 HRC',
    tolerance: '±0.015 mm',
    die: 'Die-FC-12',
    status: 'Production Ready',
    icon: 'healing',
    presetTag: 'supercut',
  },
  {
    sku: 'BN-NH-3105-TC',
    rev: 'REV E',
    name: 'Crile-Wood Needle Holder',
    subtitle: '15.0cm | 0.4mm Cross Serration',
    previewTitle: 'Crile-Wood Needle Holder (15.0cm)',
    category: 'Suturing & Ligation',
    categorySub: 'Micro Jaw Insert Pattern',
    alloy: 'AISI 420B + Micro TC',
    alloySub: 'Gold-Plated Ring Shanks',
    hrcCore: 'HRC 53–55',
    hrcSub: 'TC Insert: 70–72 HRC',
    hrcSummary: '53-55 / TC 70-72 HRC',
    tolerance: '±0.018 mm',
    die: 'Die-NH-09',
    status: 'In Active Production',
    icon: 'hardware',
    presetTag: 'tc',
  },
  {
    sku: 'BN-OR-6120',
    rev: 'REV C',
    name: 'Beyer Bone Rongeur',
    subtitle: '18.0cm | 3.5mm Curved Scoop',
    previewTitle: 'Beyer Bone Rongeur (18.0cm / 3.5mm Curved Jaw)',
    category: 'Orthopedics & Spine',
    categorySub: 'Double-Action Articulated',
    alloy: 'AISI 440C High-Carbon',
    alloySub: 'Cryogenic Annealed',
    hrcCore: 'HRC 58–60',
    hrcSub: 'Hinge Pin: Induction Hardened',
    hrcSummary: '58-60 HRC',
    tolerance: '±0.030 mm',
    die: 'Die-OR-21',
    status: 'Batch Scheduled',
    icon: 'carpenter',
    presetTag: 'all',
  },
  {
    sku: 'BN-OP-7005',
    rev: 'REV A',
    name: 'Castroviejo Micro Caliper',
    subtitle: '0–20mm Scale | 0.5mm Grad',
    previewTitle: 'Castroviejo Micro Caliper (0-20mm)',
    category: 'Ophthalmic Microsurgery',
    categorySub: 'Measurement Precision',
    alloy: 'Surgical S/S + Ti-6Al-4V',
    alloySub: 'Laser-Etched Vernier Scale',
    hrcCore: 'HRC 50–52',
    hrcSub: 'Micro Lead Screw: Class 2 Fit',
    hrcSummary: '50-52 HRC',
    tolerance: '±0.008 mm',
    die: 'Die-OP-03',
    status: 'Calibration Approved',
    icon: 'straighten',
    presetTag: 'titanium',
  },
];

export const AdminPatternsPage: React.FC = () => {
  const [patterns, setPatterns] = useState<MasterPatternRow[]>(INITIAL_PATTERNS);
  const [selectedPattern, setSelectedPattern] = useState<MasterPatternRow>(
    INITIAL_PATTERNS[0]
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [activePreset, setActivePreset] = useState<
    'all' | 'tc' | 'supercut' | 'titanium'
  >('all');
  const [rotated, setRotated] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSku, setNewSku] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('General Surgical Instrumentation');
  const [newAlloy, setNewAlloy] = useState('AISI 420B Martensitic');

  const filteredPatterns = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return patterns.filter((row) => {
      if (activePreset !== 'all' && row.presetTag !== activePreset) {
        return false;
      }
      if (!q) return true;
      return `${row.sku} ${row.name} ${row.subtitle} ${row.category} ${row.alloy} ${row.die}`
        .toLowerCase()
        .includes(q);
    });
  }, [patterns, searchQuery, activePreset]);

  const handleAddPattern = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSku.trim() || !newName.trim()) return;
    const created: MasterPatternRow = {
      sku: newSku.trim().toUpperCase(),
      rev: 'REV A',
      name: newName.trim(),
      subtitle: 'Custom CAD Pattern | DIN Spec',
      previewTitle: `${newName.trim()} (${newSku.trim().toUpperCase()})`,
      category: newCategory,
      categorySub: 'Class I Reusable',
      alloy: newAlloy,
      alloySub: 'ASTM A967 Passivated',
      hrcCore: 'HRC 52–54',
      hrcSub: 'Vacuum Hardened',
      hrcSummary: '52-54 HRC',
      tolerance: '±0.020 mm',
      die: 'Die-CST-01',
      status: 'Draft Blueprint',
      icon: 'precision_manufacturing',
      presetTag: 'all',
    };
    setPatterns((prev) => [created, ...prev]);
    setSelectedPattern(created);
    setNewSku('');
    setNewName('');
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Context Header Bar */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md mb-space-lg">
        <div className="flex flex-col max-w-3xl">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="font-label-technical text-label-technical uppercase tracking-wider text-secondary">
              MDR 2017/745 Annex VIII &amp; ISO 13485:2016 Compliant Repository
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-semibold">
            Master Pattern Repertoire &amp; Engineering Specifications
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Manage medical instrument blueprints, DIN/ISO geometric tolerances,
            alloy formulations, and laser marking dies across all manufacturing lines.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-space-xs sm:gap-space-sm">
          <button
            type="button"
            className="h-10 px-space-md bg-surface-container-low hover:bg-surface-container text-on-surface rounded font-label-lg text-label-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">
              picture_as_pdf
            </span>
            <span>Generate Master Catalogue PDF</span>
          </button>
          <button
            type="button"
            className="h-10 px-space-md bg-surface-container-low hover:bg-surface-container text-on-surface rounded font-label-lg text-label-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">
              file_upload
            </span>
            <span>Batch Import DIN (CSV/XML)</span>
          </button>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="h-10 px-space-md bg-primary hover:bg-primary-container text-on-primary rounded font-label-lg text-label-lg font-medium flex items-center gap-2 transition-colors shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">
              add_circle
            </span>
            <span>Add New Master Pattern</span>
          </button>
        </div>
      </div>

      {/* Metric Summary Badges Stripe */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">
        {[
          {
            label: 'Repository Registry',
            val: '2,480',
            sub: 'Valid Patterns',
            chip: false,
            icon: 'format_list_bulleted',
          },
          {
            label: 'CAD / STEP Linked',
            val: '412',
            sub: '3D NURBS Mesh',
            chip: true,
            icon: 'view_in_ar',
          },
          {
            label: 'Clinical Disciplines',
            val: '9',
            sub: 'Active Sectors',
            chip: false,
            icon: 'category',
          },
          {
            label: 'Metallurgical Audit',
            val: '100%',
            sub: 'DIN EN ISO 7153-1',
            chip: false,
            icon: 'verified',
          },
        ].map((tile) => (
          <div
            key={tile.label}
            className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex items-center justify-between"
          >
            <div className="flex flex-col">
              <span className="font-label-technical text-label-technical text-secondary uppercase font-semibold">
                {tile.label}
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline-md text-headline-md font-semibold text-primary">
                  {tile.val}
                </span>
                <span
                  className={
                    tile.chip
                      ? 'font-label-code text-label-code px-1.5 py-0.5 rounded bg-surface-container text-on-surface'
                      : 'font-label-technical text-label-technical text-secondary font-medium'
                  }
                >
                  {tile.sub}
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">
                {tile.icon}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Multi-Axis Engineering Facets */}
      <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm mb-space-lg flex flex-col gap-space-md">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              id="patternFilterInput"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-space-md bg-surface-container-low text-on-surface rounded font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant"
              placeholder="Filter by SKU, DIN pattern moniker, REF, or Die ID (e.g. BN-SC-1021, Mayo, Metzenbaum, Crile, Kerrison)..."
              type="text"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {(
              [
                { id: 'all', label: 'All Specs (2,480)' },
                { id: 'tc', label: 'Tungsten Carbide (TC)' },
                { id: 'supercut', label: 'SuperCut Precision' },
                { id: 'titanium', label: 'Titanium Grade 5' },
              ] as const
            ).map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setActivePreset(preset.id)}
                className={`px-3 py-1.5 rounded font-label-technical text-label-technical whitespace-nowrap transition-colors ${
                  activePreset === preset.id
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm pt-space-xs">
          <div className="flex flex-col gap-1">
            <label className="font-label-code text-label-code uppercase text-on-surface-variant font-medium">
              Discipline / Taxonomy
            </label>
            <select className="h-9 px-3 bg-surface-container-low rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest">
              <option>All Categories (General Surgical, Dental, Ortho...)</option>
              <option>General Surgical Instrumentation</option>
              <option>Hemostatic &amp; Vascular Clamps</option>
              <option>Suturing &amp; Needle Drive Systems</option>
              <option>Orthopedic &amp; Bone Surgery</option>
              <option>Ophthalmic Microsurgery</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-label-code text-label-code uppercase text-on-surface-variant font-medium">
              Surgical Alloy Formulation
            </label>
            <select className="h-9 px-3 bg-surface-container-low rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest">
              <option>All Alloys (AISI 410, 420A/B/C, 440C, Ti...)</option>
              <option>AISI 420B Martensitic Stainless</option>
              <option>AISI 440C High-Carbon Tool Steel</option>
              <option>AISI 316L Austenitic Stainless</option>
              <option>Ti-6Al-4V Medical Grade Titanium</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-label-code text-label-code uppercase text-on-surface-variant font-medium">
              Working Length (Range)
            </label>
            <select className="h-9 px-3 bg-surface-container-low rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest">
              <option>Full Spectrum (10.0cm - 32.0cm)</option>
              <option>Micro / Delicate (10.0cm - 13.5cm)</option>
              <option>Standard Surgical (14.0cm - 19.5cm)</option>
              <option>Deep Cavity / Extended (20.0cm - 30.0cm)</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-label-code text-label-code uppercase text-on-surface-variant font-medium">
              Passivation &amp; Surface Finish
            </label>
            <select className="h-9 px-3 bg-surface-container-low rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest">
              <option>All Finishes (Satin Anti-Glare, Gold Handle...)</option>
              <option>Satin Anti-Glare Electropolished</option>
              <option>Tungsten Carbide 24K Gold Ring Handle</option>
              <option>Black Ceramic Diamond-Like Carbon (DLC)</option>
              <option>High Mirror Polish</option>
            </select>
          </div>
        </div>
      </div>

      {/* Master Engineering Product Matrix */}
      <div className="bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden mb-space-lg">
        <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[20px]">
              tune
            </span>
            <span className="font-headline-sm text-headline-sm font-semibold text-primary">
              Master Blueprint Ledger
            </span>
            <span className="font-label-code text-label-code px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-semibold">
              Active Batch: LOT-2025-04
            </span>
          </div>
          <div className="flex items-center gap-space-sm">
            <span className="font-label-technical text-label-technical text-secondary">
              Showing {filteredPatterns.length} of 2,480 Patterns
            </span>
            <div className="h-4 w-px bg-surface-container-high" />
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActivePreset('all');
              }}
              className="p-1 rounded text-on-surface-variant hover:text-on-surface"
              title="Refresh DIN specs"
            >
              <span className="material-symbols-outlined text-[18px]">sync</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-code text-label-code uppercase tracking-wider">
                <th className="py-3 px-space-md font-semibold">
                  Instrument &amp; SKU Identifier
                </th>
                <th className="py-3 px-space-md font-semibold">
                  Clinical Category
                </th>
                <th className="py-3 px-space-md font-semibold">
                  Metallurgical Spec
                </th>
                <th className="py-3 px-space-md font-semibold">
                  Calibration Hardness
                </th>
                <th className="py-3 px-space-md font-semibold">
                  Tolerance &amp; Die
                </th>
                <th className="py-3 px-space-md font-semibold">MDR Status</th>
                <th className="py-3 px-space-md text-right font-semibold">
                  Engineering Ops
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-transparent font-body-sm text-body-sm text-on-surface">
              {filteredPatterns.map((row) => {
                const isSelected = selectedPattern.sku === row.sku;
                return (
                  <tr
                    key={row.sku}
                    onClick={() => setSelectedPattern(row)}
                    className={`hover:bg-surface-container-low/70 transition-colors group cursor-pointer ${
                      isSelected ? 'bg-surface-container-low/80' : ''
                    }`}
                  >
                    <td className="py-3.5 px-space-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[20px] text-primary">
                            {row.icon}
                          </span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-label-technical text-label-technical font-semibold text-primary">
                              {row.sku}
                            </span>
                            <span className="font-label-code text-label-code px-1.5 rounded bg-surface-container-high text-on-surface font-medium">
                              {row.rev}
                            </span>
                          </div>
                          <span className="font-label-lg text-label-lg font-semibold text-on-surface truncate">
                            {row.name}
                          </span>
                          <span className="font-label-technical text-label-technical text-secondary">
                            {row.subtitle}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-space-md">
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-medium text-on-surface">
                          {row.category}
                        </span>
                        <span className="font-label-technical text-label-technical text-secondary">
                          {row.categorySub}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-space-md">
                      <div className="flex flex-col">
                        <span className="font-label-technical text-label-technical text-on-surface font-medium">
                          {row.alloy}
                        </span>
                        <span className="font-label-code text-label-code text-secondary">
                          {row.alloySub}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-space-md">
                      <div className="flex flex-col">
                        <span className="font-label-code text-label-code font-semibold text-on-surface">
                          {row.hrcCore}
                        </span>
                        <span className="font-label-code text-label-code text-primary font-bold">
                          {row.hrcSub}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-space-md">
                      <div className="flex flex-col">
                        <span className="font-label-technical text-label-technical text-primary font-semibold">
                          {row.tolerance}
                        </span>
                        <span className="font-label-code text-label-code text-secondary">
                          Forging: {row.die}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-space-md">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-label-technical text-label-technical bg-surface-container text-on-surface font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-space-md text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPattern(row);
                          }}
                          className="px-2.5 py-1 rounded bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface font-label-technical text-label-technical transition-colors"
                        >
                          Edit CAD
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded hover:bg-surface-container text-secondary"
                          title="Material Test Cert"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            verified_user
                          </span>
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded hover:bg-surface-container text-secondary"
                          title="SKT Stock Link"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            inventory_2
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-space-md py-space-sm bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm">
          <span className="font-label-code text-label-code text-secondary">
            Displaying 1–{filteredPatterns.length} of 2,480 recorded master patterns
            (SKT Facility Zone A)
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled
              className="px-2 py-1 rounded bg-surface-container-lowest text-on-surface font-label-technical text-label-technical opacity-50 cursor-not-allowed"
            >
              Previous
            </button>
            <button
              type="button"
              className="px-2.5 py-1 rounded bg-primary text-on-primary font-label-code text-label-code font-bold"
            >
              1
            </button>
            <button
              type="button"
              className="px-2.5 py-1 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-code text-label-code transition-colors"
            >
              2
            </button>
            <button
              type="button"
              className="px-2.5 py-1 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-code text-label-code transition-colors"
            >
              3
            </button>
            <span className="px-1 text-on-surface-variant font-label-code">
              ...
            </span>
            <button
              type="button"
              className="px-2.5 py-1 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-code text-label-code transition-colors"
            >
              496
            </button>
            <button
              type="button"
              className="px-2 py-1 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-technical text-label-technical transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: CAD/STEP Blueprint Inspection & Revision ECO Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-lg p-space-md shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md gap-space-xs">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px] text-primary">
                  biotech
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-label-technical text-label-technical font-bold text-primary">
                    {selectedPattern.sku}
                  </span>
                  <span className="font-label-code text-label-code px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface">
                    3D Parasolid / STEP AP242
                  </span>
                </div>
                <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                  {selectedPattern.previewTitle}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setRotated((r) => !r)}
                className="px-2.5 py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-technical text-label-technical flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">
                  3d_rotation
                </span>
                <span>Rotate Wireframe</span>
              </button>
              <button
                type="button"
                className="px-2.5 py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-technical text-label-technical flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">
                  file_download
                </span>
                <span>Download .STP</span>
              </button>
            </div>
          </div>

          <div className="relative w-full h-80 rounded bg-primary-container text-on-primary-container overflow-hidden flex flex-col justify-between p-4 shadow-inner">
            <svg
              className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  height="32"
                  id="admin-cad-grid"
                  patternUnits="userSpaceOnUse"
                  width="32"
                >
                  <path
                    d="M 32 0 L 0 0 0 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect fill="url(#admin-cad-grid)" height="100%" width="100%" />
              <line
                stroke="currentColor"
                strokeDasharray="4 4"
                strokeWidth="1"
                x1="50%"
                x2="50%"
                y1="0"
                y2="100%"
              />
              <line
                stroke="currentColor"
                strokeDasharray="4 4"
                strokeWidth="1"
                x1="0"
                x2="100%"
                y1="50%"
                y2="50%"
              />
            </svg>

            <div className="relative z-10 flex items-center justify-between text-on-primary">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="font-label-technical text-label-technical font-semibold">
                  TOLERANCE CALLOUT ENGINE: ON
                </span>
              </div>
              <span className="font-label-code text-label-code text-secondary-fixed-dim">
                Projection: 1st Angle DIN 6 / CMM Validated
              </span>
            </div>

            <div className="relative z-10 flex-1 flex items-center justify-center">
              <div className="relative w-full max-w-lg h-44 flex items-center justify-center">
                <svg
                  className={`w-full h-full text-secondary-fixed-dim stroke-current fill-none stroke-[1.2] transition-transform duration-500 ${
                    rotated ? 'rotate-6 scale-105' : ''
                  }`}
                  viewBox="0 0 600 160"
                >
                  <path d="M 40,80 C 60,30 90,30 110,60 L 260,76 L 310,80 L 460,70 C 510,66 540,64 560,62" />
                  <path d="M 40,80 C 60,130 90,130 110,100 L 260,84 L 310,80 L 460,90 C 510,94 540,96 560,98" />
                  <ellipse cx="65" cy="50" rx="30" ry="22" strokeWidth="1.8" />
                  <ellipse cx="65" cy="110" rx="30" ry="22" strokeWidth="1.8" />
                  <circle
                    className="fill-primary-container stroke-white stroke-2"
                    cx="310"
                    cy="80"
                    r="9"
                  />
                  <circle className="fill-secondary-fixed" cx="310" cy="80" r="3" />
                  <path
                    className="stroke-white"
                    d="M 420,72 L 555,64"
                    strokeDasharray="2 2"
                    strokeWidth="2"
                  />
                  <path
                    className="stroke-white"
                    d="M 420,88 L 555,96"
                    strokeDasharray="2 2"
                    strokeWidth="2"
                  />
                </svg>

                <div className="absolute right-4 top-2 bg-primary/90 text-on-primary px-2 py-1 rounded shadow-md flex items-center gap-1.5 backdrop-blur-sm pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim" />
                  <div className="flex flex-col">
                    <span className="font-label-code text-[10px] uppercase text-secondary-fixed-dim leading-none">
                      Jaw Shear Clearance
                    </span>
                    <span className="font-label-technical text-[11px] font-bold leading-tight">
                      0.012mm ±0.003
                    </span>
                  </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 bottom-2 bg-primary/90 text-on-primary px-2 py-1 rounded shadow-md flex items-center gap-1.5 backdrop-blur-sm pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim" />
                  <div className="flex flex-col">
                    <span className="font-label-code text-[10px] uppercase text-secondary-fixed-dim leading-none">
                      Pivot Pin Torque Load
                    </span>
                    <span className="font-label-technical text-[11px] font-bold leading-tight">
                      0.85 Nm ±0.05
                    </span>
                  </div>
                </div>

                <div className="absolute left-4 top-1 bg-primary/90 text-on-primary px-2 py-1 rounded shadow-md flex items-center gap-1.5 backdrop-blur-sm pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim" />
                  <div className="flex flex-col">
                    <span className="font-label-code text-[10px] uppercase text-secondary-fixed-dim leading-none">
                      Internal Oval Axis
                    </span>
                    <span className="font-label-technical text-[11px] font-bold leading-tight">
                      28.4 x 21.0mm
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-on-primary-fixed">
              <div className="flex items-center gap-3">
                <span className="font-label-code text-label-code text-secondary-fixed-dim">
                  Laser Etch Matrix:{' '}
                  <strong className="text-on-primary font-mono">
                    LOT-BN420-SKT
                  </strong>
                </span>
                <span className="font-label-code text-label-code text-secondary-fixed-dim">
                  Scale: <strong className="text-on-primary">1:1 Calibrated</strong>
                </span>
              </div>
              <span className="font-label-code text-label-code px-1.5 py-0.5 rounded bg-primary text-secondary-fixed-dim">
                Opto-Mechanical Inspection OK
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-md mt-auto">
            <div className="p-2.5 rounded bg-surface-container-low flex flex-col">
              <span className="font-label-code text-label-code text-secondary uppercase">
                Geometric Tolerance
              </span>
              <span className="font-label-technical text-label-technical font-bold text-primary mt-0.5">
                {selectedPattern.tolerance}
              </span>
            </div>
            <div className="p-2.5 rounded bg-surface-container-low flex flex-col">
              <span className="font-label-code text-label-code text-secondary uppercase">
                Hardness Calibration
              </span>
              <span className="font-label-technical text-label-technical font-bold text-primary mt-0.5">
                {selectedPattern.hrcSummary}
              </span>
            </div>
            <div className="p-2.5 rounded bg-surface-container-low flex flex-col">
              <span className="font-label-code text-label-code text-secondary uppercase">
                Primary Forging Die
              </span>
              <span className="font-label-technical text-label-technical font-bold text-primary mt-0.5">
                {selectedPattern.die} (H13 Tool Steel)
              </span>
            </div>
            <div className="p-2.5 rounded bg-surface-container-low flex flex-col">
              <span className="font-label-code text-label-code text-secondary uppercase">
                Electropolish Depth
              </span>
              <span className="font-label-technical text-label-technical font-bold text-primary mt-0.5">
                0.004 mm (ASTM A967)
              </span>
            </div>
          </div>
        </div>

        {/* Revision & ECO Trail */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-lg p-space-md shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-space-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary">
                history_edu
              </span>
              <span className="font-headline-sm text-headline-sm font-semibold text-primary">
                Revision &amp; ECO Trail
              </span>
            </div>
            <button
              type="button"
              className="font-label-technical text-label-technical text-secondary hover:text-primary transition-colors"
            >
              + New ECO
            </button>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
            Engineering Change Orders tied to European MDR notified body
            documentation.
          </p>

          <div className="flex flex-col gap-space-sm flex-1">
            {[
              {
                id: 'ECO-2025-089',
                time: 'Yesterday 16:40',
                title: 'TC Jaw Brazing Solder Migration',
                desc: 'Adjusted silver-copper eutectoid solder temperature profile from 690°C to 715°C to eliminate micro-voids at blade interfaces.',
                auth: 'Auth: Eng. Tariq Mehmood',
                badge: 'TÜV Validated',
              },
              {
                id: 'ECO-2025-064',
                time: '08 Feb 2025',
                title: 'Laser Mark UDI Format Update',
                desc: 'Applied GS1 DataMatrix 2D barcoding to satisfy FDA UDI Direct Mark (DM) requirement on all 12.5cm mosquito forceps.',
                auth: 'Auth: QA Compliance Directorate',
                badge: 'ISO 15459',
              },
              {
                id: 'ECO-2025-012',
                time: '19 Jan 2025',
                title: 'Double Action Rongeur Pin Redesign',
                desc: 'Switched pivot cross-pin from 420A to induction hardened 440C to enhance cyclic fatigue resistance to >15,000 actuations.',
                auth: 'Auth: Tooling Shop SKT-01',
                badge: 'Released',
              },
            ].map((eco) => (
              <div
                key={eco.id}
                className="p-space-sm rounded bg-surface-container-low flex flex-col gap-1 transition-colors hover:bg-surface-container"
              >
                <div className="flex items-center justify-between">
                  <span className="font-label-technical text-label-technical font-bold text-primary">
                    {eco.id}
                  </span>
                  <span className="font-label-code text-label-code text-secondary">
                    {eco.time}
                  </span>
                </div>
                <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                  {eco.title}
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {eco.desc}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-label-code text-label-code text-on-surface font-medium">
                    {eco.auth}
                  </span>
                  <span className="font-label-code text-label-code px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface font-semibold">
                    {eco.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-space-md mt-space-sm flex items-center justify-between">
            <span className="font-label-code text-label-code text-secondary">
              38 Pending Notified Body Submissions
            </span>
            <button
              type="button"
              className="font-label-technical text-label-technical text-primary font-bold hover:underline flex items-center gap-1"
            >
              <span>Audit Vault</span>
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Master Pattern Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm flex items-center justify-center p-margin"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-space-lg shadow-2xl space-y-space-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-primary">
                Register New Master DIN Pattern
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded bg-surface-container flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <form onSubmit={handleAddPattern} className="space-y-space-sm">
              <div>
                <label className="block font-label-technical text-label-technical text-secondary mb-1">
                  SKU / REF IDENTIFIER
                </label>
                <input
                  required
                  value={newSku}
                  onChange={(e) => setNewSku(e.target.value)}
                  placeholder="e.g. BN-SC-1090-TC"
                  className="w-full px-3 py-2 rounded bg-surface-container-low text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-label-technical text-label-technical text-secondary mb-1">
                  INSTRUMENT PATTERN TITLE
                </label>
                <input
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Iris Micro Dissecting Scissors"
                  className="w-full px-3 py-2 rounded bg-surface-container-low text-sm focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-space-sm">
                <div>
                  <label className="block font-label-technical text-label-technical text-secondary mb-1">
                    DISCIPLINE
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-surface-container-low text-sm focus:outline-none"
                  >
                    <option>General Surgical Instrumentation</option>
                    <option>Hemostatic Clamps</option>
                    <option>Suturing &amp; Ligation</option>
                    <option>Orthopedics &amp; Spine</option>
                    <option>Ophthalmic Microsurgery</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-technical text-label-technical text-secondary mb-1">
                    ALLOY SPEC
                  </label>
                  <select
                    value={newAlloy}
                    onChange={(e) => setNewAlloy(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-surface-container-low text-sm focus:outline-none"
                  >
                    <option>AISI 420B Martensitic</option>
                    <option>AISI 440C High-Carbon</option>
                    <option>AISI 420B + Micro TC</option>
                    <option>Ti-6Al-4V Titanium</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded bg-surface-container text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-primary text-on-primary text-sm font-semibold"
                >
                  Save Pattern Blueprint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
