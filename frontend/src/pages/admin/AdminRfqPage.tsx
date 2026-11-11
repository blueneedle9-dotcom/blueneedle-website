import React, { useMemo, useState } from 'react';

interface RfqRecord {
  id: string;
  docCode: string;
  institution: string;
  regionLabel: string;
  jurisdiction: 'EU' | 'UK' | 'US' | 'GULF';
  clientType: 'hospital' | 'distributor' | 'oem';
  portLabel: string;
  portIcon: string;
  volumeLabel: string;
  patterns: string[];
  alloyBadge: string;
  laserSpec: string;
  finishSpec: string;
  valuationDisplay: string;
  unitPriceDisplay: string;
  incotermSub: string;
  slaLabel: string;
  slaSub: string;
  slaStyle: 'urgent' | 'sent' | 'bid' | 'contract';
  statusBucket: 'new' | 'review' | 'dispatched' | 'production';
  baseSubtotal: number;
  surchargesSubtotal: number;
  associatedSubtotal: number;
  heatLot: string;
}

const RFQ_ROWS: RfqRecord[] = [
  {
    id: 'RFQ-2025-0891',
    docCode: 'DOC-MDR-09B',
    institution: 'Asklepios Kliniken Hamburg',
    regionLabel: 'Germany (Central Procurement)',
    jurisdiction: 'EU',
    clientType: 'hospital',
    portLabel: 'CIF Hamburg (DEHAM)',
    portIcon: 'sailing',
    volumeLabel: '2,400 pcs',
    patterns: [
      'Mayo Scissors 170mm',
      'Metzenbaum Curved',
      'TC Needle Holders (Hegar)',
    ],
    alloyBadge: 'AISI 420B + TC Jaws',
    laserSpec: 'Laser: "ASKLEPIOS-DE"',
    finishSpec: 'Satin Antireflective',
    valuationDisplay: '€124,500',
    unitPriceDisplay: '€51.87 / unit blended',
    incotermSub: 'FOB Net: €116,200',
    slaLabel: '4h Remaining',
    slaSub: 'Stage: In Technical Review',
    slaStyle: 'urgent',
    statusBucket: 'review',
    baseSubtotal: 63648,
    surchargesSubtotal: 12840,
    associatedSubtotal: 45162,
    heatLot: '420B-DE-9921',
  },
  {
    id: 'RFQ-2025-0888',
    docCode: 'DOC-MOH-941',
    institution: 'Cleveland Clinic Abu Dhabi',
    regionLabel: 'United Arab Emirates (Specialty Eye/Neuro)',
    jurisdiction: 'GULF',
    clientType: 'hospital',
    portLabel: 'CIP Abu Dhabi Airport (AUH)',
    portIcon: 'flight_takeoff',
    volumeLabel: '850 pcs',
    patterns: [
      'Castroviejo Micro Forceps',
      'Vannas Scissors Straight',
      'Micro Calipers 0.25mm',
    ],
    alloyBadge: 'Titanium Gr. 5 + AISI 440C',
    laserSpec: 'Laser: CCAD Micro UID',
    finishSpec: 'Blue Anodized Hub',
    valuationDisplay: '$68,200',
    unitPriceDisplay: '$80.23 / unit',
    incotermSub: 'Air Express Included',
    slaLabel: 'Approved Quote Sent',
    slaSub: 'Counter-party reviewing',
    slaStyle: 'sent',
    statusBucket: 'dispatched',
    baseSubtotal: 42500,
    surchargesSubtotal: 5100,
    associatedSubtotal: 17750,
    heatLot: 'TI6AL4V-AE-404',
  },
  {
    id: 'RFQ-2025-0884',
    docCode: 'TND-NHS-LND-24',
    institution: 'Barts Health NHS Trust',
    regionLabel: 'London, UK (Tender Batch #3)',
    jurisdiction: 'UK',
    clientType: 'hospital',
    portLabel: 'DDP London Central Hub',
    portIcon: 'local_shipping',
    volumeLabel: '4,200 pcs',
    patterns: [
      'General Surgery Sets (60 trays)',
      'Backhaus Towel Clamps',
      'Langenbeck Retractor series',
    ],
    alloyBadge: 'DIN 1.4021 Passivated',
    laserSpec: 'Laser: "NHS-BARTS-CSSD"',
    finishSpec: 'Autoclave Barcode 2D Datamatrix',
    valuationDisplay: '£182,000',
    unitPriceDisplay: '£43.33 / unit',
    incotermSub: 'Customs Duty Paid',
    slaLabel: 'Tender Bid Submitted',
    slaSub: 'Adjudication: 14 Oct',
    slaStyle: 'bid',
    statusBucket: 'new',
    baseSubtotal: 112000,
    surchargesSubtotal: 18400,
    associatedSubtotal: 48750,
    heatLot: '420B-UK-7102',
  },
  {
    id: 'RFQ-2025-0879',
    docCode: 'OEM-SCAND-003',
    institution: 'SurgiCorp Scandinavia AB',
    regionLabel: 'Stockholm, Sweden (Private OEM)',
    jurisdiction: 'EU',
    clientType: 'oem',
    portLabel: 'FOB Karachi Port (PKKHI)',
    portIcon: 'anchor',
    volumeLabel: '1,100 pcs',
    patterns: [
      'Stille-Luer Bone Rongeurs',
      'Cobb Spinal Osteotomes',
      'Double-Action Bone Cutters',
    ],
    alloyBadge: 'High-Carbon AISI 440C',
    laserSpec: 'Gold Dipped Rings / TC Inset',
    finishSpec: 'SurgiCorp OEM Stamp',
    valuationDisplay: '€79,800',
    unitPriceDisplay: '€72.54 / unit',
    incotermSub: 'Ex-Factory Dry Lock',
    slaLabel: 'Contract Finalized',
    slaSub: 'Foundry Heat Lot #402 Assigned',
    slaStyle: 'contract',
    statusBucket: 'production',
    baseSubtotal: 48400,
    surchargesSubtotal: 8950,
    associatedSubtotal: 19600,
    heatLot: '440C-SE-402',
  },
];

const METZENBAUM_THUMB =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDGT9SLJ5sP8IAX9jetesxsvix07pQRW93-tIXKCF6w6t9OQGcfQWCms2_y6ijBrmNBdSp6cv6kXJ9NbELAIvNXmfyKbe-A7eEnSf_NfnNm73bvgKvImhz8Q3JBSX50PKjVU8UavEgc4I8QklZhGJ9XyMzOJMi81Lm952VLR7I-I1mtFbvoqjyYNWdxAXXriJLrcgcYeqo2Sn0MxcebSgkbKcRm9y9FfhkhIX6fif0';

export const AdminRfqPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(RFQ_ROWS[0].id);
  const [statusTab, setStatusTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [jurisdictionFilter, setJurisdictionFilter] = useState('');
  const [clientFilter, setClientFilter] = useState('');
  const [freightMode, setFreightMode] = useState<'ocean' | 'air'>('ocean');
  const [dispatchNotice, setDispatchNotice] = useState<string | null>(null);

  const selectedRfq =
    RFQ_ROWS.find((r) => r.id === selectedId) ?? RFQ_ROWS[0];

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return RFQ_ROWS.filter((r) => {
      if (statusTab !== 'all' && r.statusBucket !== statusTab) return false;
      if (jurisdictionFilter && r.jurisdiction !== jurisdictionFilter) return false;
      if (clientFilter && r.clientType !== clientFilter) return false;
      if (!q) return true;
      return `${r.id} ${r.institution} ${r.patterns.join(' ')} ${r.alloyBadge}`
        .toLowerCase()
        .includes(q);
    });
  }, [statusTab, jurisdictionFilter, clientFilter, searchQuery]);

  const freightCost = freightMode === 'ocean' ? 2850 : 6420;
  const calculatedTotal =
    selectedRfq.baseSubtotal +
    selectedRfq.surchargesSubtotal +
    selectedRfq.associatedSubtotal +
    freightCost;

  const formatEur = (val: number) =>
    `€${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-xs">
            <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-technical text-label-technical uppercase tracking-wider">
              Institutional Desk
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="font-label-code text-label-code text-secondary">
              Export Dispatch Node: SKT-DRY-DOCK-02
            </span>
          </div>
          <h1 className="font-headline-md text-headline-md text-primary tracking-tight">
            B2B RFQ &amp; Tender Management Desk
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
            Review hospital tender requisitions, generate wholesale price
            schedules, and manage international export contract pricing across
            CE/MDR 2017/745 accredited product lines.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm self-start lg:self-center">
          <button
            type="button"
            className="flex items-center gap-space-xs px-space-md py-2.5 rounded bg-surface-container hover:bg-surface-container-high text-primary font-label-lg text-label-lg transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">
              table_view
            </span>
            <span>Download Tender Register</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-space-xs px-space-md py-2.5 rounded bg-surface-container hover:bg-surface-container-high text-primary font-label-lg text-label-lg transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">
              currency_exchange
            </span>
            <span>Export Incoterms Rates</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-space-xs px-space-md py-2.5 rounded bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">
              add_circle
            </span>
            <span>Create Manual RFQ / Quotation</span>
          </button>
        </div>
      </div>

      {/* Quick KPIs Bento Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary">
            <span className="font-label-technical text-label-technical uppercase">
              Open Tender Volume
            </span>
            <span className="material-symbols-outlined text-[20px] text-secondary">
              inventory_2
            </span>
          </div>
          <div className="my-space-xs">
            <span className="font-headline-md text-headline-md text-primary">
              8,550{' '}
              <span className="font-label-md text-label-md text-secondary font-normal">
                units
              </span>
            </span>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
            <span className="text-primary font-medium">4 active contracts</span>
            <span>SLA: 98.4% met</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary">
            <span className="font-label-technical text-label-technical uppercase">
              Committed Pipeline Value
            </span>
            <span className="material-symbols-outlined text-[20px] text-secondary">
              account_balance
            </span>
          </div>
          <div className="my-space-xs">
            <span className="font-headline-md text-headline-md text-primary">
              €454,500{' '}
              <span className="font-label-md text-label-md text-secondary font-normal">
                equiv
              </span>
            </span>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
            <span className="text-secondary font-medium">
              Weighted Margin: 36.2%
            </span>
            <span>Avg cycle: 7.2d</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary">
            <span className="font-label-technical text-label-technical uppercase">
              Tungsten Surcharge Index
            </span>
            <span className="material-symbols-outlined text-[20px] text-secondary">
              diamond
            </span>
          </div>
          <div className="my-space-xs">
            <span className="font-headline-md text-headline-md text-primary">
              +€4.20{' '}
              <span className="font-label-md text-label-md text-secondary font-normal">
                / TC pair
              </span>
            </span>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
            <span>AISI 420B: €1,840/MT</span>
            <span className="text-primary font-medium">Updated 08:00 PKT</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary">
            <span className="font-label-technical text-label-technical uppercase">
              MDR Technical Dossiers
            </span>
            <span className="material-symbols-outlined text-[20px] text-secondary">
              verified_user
            </span>
          </div>
          <div className="my-space-xs">
            <span className="font-headline-md text-headline-md text-primary">
              100%{' '}
              <span className="font-label-md text-label-md text-secondary font-normal">
                Compliant
              </span>
            </span>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
            <span className="text-secondary">DIN EN ISO 13485:2016</span>
            <span className="text-primary font-medium">TÜV SÜD Valid</span>
          </div>
        </div>
      </div>

      {/* Pipeline Tabs & Complex Filtering Bar */}
      <div className="flex flex-col bg-surface-container-lowest p-space-md rounded-xl shadow-sm gap-space-md">
        <div className="flex items-center gap-space-xs overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Requests (46)', badge: null, badgeCls: '' },
            {
              id: 'new',
              label: 'New Requisitions',
              badge: '12',
              badgeCls: 'bg-error-container text-on-error-container font-bold',
            },
            {
              id: 'review',
              label: 'Technical Spec Review',
              badge: '8',
              badgeCls: 'bg-surface-container text-secondary',
            },
            {
              id: 'dispatched',
              label: 'Formal Quote Dispatched (16)',
              badge: null,
              badgeCls: '',
            },
            {
              id: 'production',
              label: 'Contract Awarded / In Production',
              badge: '7',
              badgeCls: 'bg-secondary-container text-on-secondary-container',
            },
            {
              id: 'archived',
              label: 'Archived (3)',
              badge: null,
              badgeCls: '',
            },
          ].map((tab) => {
            const active = statusTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusTab(tab.id)}
                className={`px-space-md py-2 rounded font-label-lg text-label-lg shrink-0 flex items-center gap-1.5 transition-colors ${
                  active
                    ? 'bg-primary-container text-on-primary font-medium shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full font-label-code text-label-code ${tab.badgeCls}`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-space-sm items-center">
          <div className="xl:col-span-4 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
              manage_search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest"
              placeholder="Filter by RFQ #, Hospital entity, or German DIN pattern..."
              type="text"
            />
          </div>
          <div className="xl:col-span-3">
            <select
              value={jurisdictionFilter}
              onChange={(e) => setJurisdictionFilter(e.target.value)}
              className="w-full h-10 px-3 rounded bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest"
            >
              <option value="">
                Destination: All Jurisdictions (EU, UK, US, Gulf, APAC)
              </option>
              <option value="EU">European Union (MDR Compliant)</option>
              <option value="UK">United Kingdom (MHRA / UKCA)</option>
              <option value="US">United States (FDA 510k OEM)</option>
              <option value="GULF">
                Gulf Cooperation Council (MOH Registered)
              </option>
            </select>
          </div>
          <div className="xl:col-span-3">
            <select
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="w-full h-10 px-3 rounded bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest"
            >
              <option value="">Client Type: All Institutional Classes</option>
              <option value="hospital">
                Hospital Network / Public Health Authority
              </option>
              <option value="distributor">
                Regional Master Medical Distributor
              </option>
              <option value="oem">
                Private Label Surgical OEM (Contract MFG)
              </option>
            </select>
          </div>
          <div className="xl:col-span-2 flex items-center gap-space-xs">
            <select className="w-full h-10 px-3 rounded bg-surface-container-low font-label-technical text-label-technical text-on-surface focus:outline-none focus:bg-surface-container-lowest">
              <option value="ALL">Currency: Any</option>
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
            </select>
            <button
              type="button"
              onClick={() => {
                setStatusTab('all');
                setSearchQuery('');
                setJurisdictionFilter('');
                setClientFilter('');
              }}
              className="p-2 rounded bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
              title="Reset Filters"
            >
              <span className="material-symbols-outlined text-[20px]">
                filter_alt_off
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace: Table (8 cols) & Quotation Builder Desk (4 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
        <div className="xl:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-space-md py-space-sm bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[18px] text-secondary">
                ballot
              </span>
              <span className="font-label-technical text-label-technical uppercase text-on-surface font-semibold">
                Active Tender Requisitions Matrix
              </span>
              <span className="font-label-code text-label-code px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface">
                Showing {filteredRows.length} of 46 items
              </span>
            </div>
            <div className="flex items-center gap-space-xs font-label-code text-label-code text-secondary">
              <span className="w-2 h-2 rounded-full bg-secondary-container" />
              <span>Live Quotation Lock Enabled</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-body-sm">
              <thead>
                <tr className="bg-surface-container font-label-technical text-label-technical text-secondary uppercase tracking-wider">
                  <th className="p-space-md">RFQ ID</th>
                  <th className="p-space-md">Institution &amp; Port</th>
                  <th className="p-space-md">Patterns &amp; Volume</th>
                  <th className="p-space-md">Alloy &amp; Markings</th>
                  <th className="p-space-md text-right">Valuation</th>
                  <th className="p-space-md">SLA Status</th>
                  <th className="p-space-md text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => {
                  const isSelected = row.id === selectedRfq.id;
                  return (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedId(row.id)}
                      className={`cursor-pointer transition-colors group ${
                        isSelected
                          ? 'bg-surface-container-high/40 hover:bg-surface-container'
                          : 'hover:bg-surface-container'
                      }`}
                    >
                      <td className="p-space-md align-top">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-label-code text-label-code font-bold text-primary">
                            {row.id}
                          </span>
                          <span className="font-label-code text-label-code text-secondary">
                            {row.docCode}
                          </span>
                          {isSelected && (
                            <span className="inline-flex mt-1 items-center gap-1 font-label-code text-label-code px-1.5 py-0.5 rounded bg-primary-container text-on-primary w-fit">
                              SELECTED
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-space-md align-top">
                        <div className="flex flex-col">
                          <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                            {row.institution}
                          </span>
                          <span className="font-label-md text-label-md text-secondary">
                            {row.regionLabel}
                          </span>
                          <div className="flex items-center gap-1 mt-1 text-on-surface-variant font-label-technical text-label-technical">
                            <span className="material-symbols-outlined text-[14px]">
                              {row.portIcon}
                            </span>
                            <span>{row.portLabel}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-space-md align-top">
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md font-bold text-primary">
                            {row.volumeLabel}
                          </span>
                          {row.patterns.map((p, idx) => (
                            <span
                              key={p}
                              className={`font-label-technical text-label-technical text-on-surface-variant ${
                                idx === 0 ? 'mt-0.5' : ''
                              }`}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-space-md align-top">
                        <div className="flex flex-col gap-1">
                          <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-label-code text-label-code w-fit">
                            {row.alloyBadge}
                          </span>
                          <span className="text-secondary font-label-code text-label-code">
                            {row.laserSpec}
                          </span>
                          <span className="font-label-code text-label-code text-on-surface-variant">
                            {row.finishSpec}
                          </span>
                        </div>
                      </td>
                      <td className="p-space-md align-top text-right">
                        <div className="flex flex-col">
                          <span className="font-headline-sm text-headline-sm text-primary">
                            {row.valuationDisplay}
                          </span>
                          <span className="font-label-code text-label-code text-secondary">
                            {row.unitPriceDisplay}
                          </span>
                          <span className="font-label-code text-label-code text-on-surface-variant">
                            {row.incotermSub}
                          </span>
                        </div>
                      </td>
                      <td className="p-space-md align-top">
                        <div className="flex flex-col gap-1">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-label-technical text-label-technical ${
                              row.slaStyle === 'urgent'
                                ? 'bg-error-container text-on-error-container font-semibold'
                                : row.slaStyle === 'bid'
                                  ? 'bg-secondary-container text-on-secondary-container font-semibold'
                                  : row.slaStyle === 'contract'
                                    ? 'bg-primary-container text-on-primary font-semibold'
                                    : 'bg-surface-container text-on-surface'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              {row.slaStyle === 'urgent'
                                ? 'alarm'
                                : row.slaStyle === 'sent'
                                  ? 'send'
                                  : row.slaStyle === 'bid'
                                    ? 'verified'
                                    : 'precision_manufacturing'}
                            </span>
                            <span>{row.slaLabel}</span>
                          </span>
                          <span className="font-label-code text-label-code text-on-surface-variant">
                            {row.slaSub}
                          </span>
                        </div>
                      </td>
                      <td className="p-space-md align-top text-right">
                        <div className="flex flex-col gap-1 items-end">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedId(row.id);
                            }}
                            className="px-2.5 py-1 rounded bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors shadow-sm"
                          >
                            Prepare Quote
                          </button>
                          <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            className="px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
                          >
                            Spec Sheet
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm font-label-code text-label-code text-secondary">
              <span>
                Displaying Rows 1 to {filteredRows.length} of 46 Institutional
                Records
              </span>
              <span>•</span>
              <button type="button" className="text-primary hover:underline">
                Download Current CSV View
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled
                className="p-1.5 rounded bg-surface-container-lowest text-on-surface-variant opacity-40"
              >
                <span className="material-symbols-outlined text-[18px]">
                  chevron_left
                </span>
              </button>
              <span className="px-3 py-1 rounded bg-primary-container text-on-primary font-label-code text-label-code font-bold">
                1
              </span>
              <button
                type="button"
                className="px-3 py-1 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-code text-label-code"
              >
                2
              </button>
              <button
                type="button"
                className="px-3 py-1 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-code text-label-code"
              >
                3
              </button>
              <span className="px-2 font-label-code text-label-code text-secondary">
                ...
              </span>
              <button
                type="button"
                className="px-3 py-1 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-code text-label-code"
              >
                12
              </button>
              <button
                type="button"
                className="p-1.5 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-[18px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Instant Quotation Side Desk (4 cols) */}
        <div className="xl:col-span-4 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px] text-primary">
                  calculate
                </span>
                <span className="font-headline-sm text-headline-sm text-primary">
                  Quotation Builder Engine
                </span>
              </div>
              <span className="font-label-code text-label-code px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-semibold">
                {selectedRfq.id}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Live institutional calculator configuring bulk tiered schedules,
              alloy surcharges, passivation certs, and Incoterms shipping nodes.
            </p>

            {/* Visual Instrument Reference Card */}
            <div className="p-space-sm bg-surface-container-low rounded flex items-center gap-space-sm">
              <div className="w-16 h-16 bg-surface-container-lowest rounded overflow-hidden shrink-0 flex items-center justify-center p-1">
                <img
                  alt="Metzenbaum TC Scissors 180mm"
                  className="w-full h-full object-contain"
                  src={METZENBAUM_THUMB}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-lg text-label-lg font-semibold text-on-surface truncate">
                  {selectedRfq.patterns[0]}
                </span>
                <span className="font-label-code text-label-code text-secondary">
                  {selectedRfq.institution}
                </span>
                <div className="flex items-center gap-space-xs mt-1">
                  <span className="font-label-technical text-label-technical text-primary font-medium">
                    Batch Base: €34.00
                  </span>
                  <span className="text-on-surface-variant text-[10px]">•</span>
                  <span className="font-label-technical text-label-technical text-secondary">
                    Lead: 14 Days
                  </span>
                </div>
              </div>
            </div>

            {/* Tiered Volume Discount Matrix */}
            <div className="flex flex-col gap-1 mt-space-xs">
              <span className="font-label-technical text-label-technical uppercase text-secondary font-semibold">
                Tiered Quantity Discount Schedule
              </span>
              <div className="bg-surface-container-low rounded overflow-hidden">
                <div className="grid grid-cols-3 p-2 font-label-technical text-label-technical text-secondary uppercase bg-surface-container">
                  <span>Lot Tier</span>
                  <span>Discount</span>
                  <span className="text-right">Unit Price</span>
                </div>
                <div className="grid grid-cols-3 p-2 font-label-code text-label-code text-on-surface-variant">
                  <span>100 – 499 pcs</span>
                  <span>Base Standard</span>
                  <span className="text-right font-medium text-on-surface">
                    €34.00
                  </span>
                </div>
                <div className="grid grid-cols-3 p-2 font-label-code text-label-code text-on-surface-variant bg-surface-container-lowest/60">
                  <span>500 – 1,999 pcs</span>
                  <span className="text-secondary">-12.0% Wholesale</span>
                  <span className="text-right font-medium text-on-surface">
                    €29.92
                  </span>
                </div>
                <div className="grid grid-cols-3 p-2 font-label-code text-label-code bg-surface-container-highest text-primary font-bold">
                  <span>2,000+ pcs [ACTIVE]</span>
                  <span>-22.0% Institutional</span>
                  <span className="text-right text-primary">€26.52</span>
                </div>
              </div>
            </div>

            {/* Specification Surcharges */}
            <div className="flex flex-col gap-space-xs mt-space-xs">
              <span className="font-label-technical text-label-technical uppercase text-secondary font-semibold">
                Specification Surcharges &amp; Extras
              </span>
              {[
                {
                  icon: 'hardware',
                  title: 'Tungsten Carbide Inserts',
                  sub: 'Rockwell 70 HRC Grade Jaws',
                  price: '+€4.20 / unit',
                },
                {
                  icon: 'sanitizer',
                  title: 'Sterile Medical Peel-Pouch',
                  sub: 'Tyvek/Film ISO 11607-1 Validated',
                  price: '+€0.85 / unit',
                },
                {
                  icon: 'fingerprint',
                  title: 'Custom Laser Marking (GS1 UDI)',
                  sub: `${selectedRfq.laserSpec} + Datamatrix Code`,
                  price: '+€0.30 / unit',
                },
              ].map((extra) => (
                <div
                  key={extra.title}
                  className="flex items-center justify-between p-2 rounded bg-surface-container-low"
                >
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[18px] text-primary">
                      {extra.icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-medium text-on-surface">
                        {extra.title}
                      </span>
                      <span className="font-label-code text-label-code text-secondary">
                        {extra.sub}
                      </span>
                    </div>
                  </div>
                  <span className="font-label-technical text-label-technical font-bold text-primary">
                    {extra.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Incoterms & Freight Matrix */}
            <div className="flex flex-col gap-space-xs mt-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-technical text-label-technical uppercase text-secondary font-semibold">
                  Freight Mode &amp; Incoterms 2020
                </span>
                <span className="font-label-code text-label-code text-primary font-bold">
                  Origin: Sialkot Hub
                </span>
              </div>
              <div className="grid grid-cols-2 gap-space-xs">
                <button
                  type="button"
                  onClick={() => setFreightMode('ocean')}
                  className={`p-space-sm rounded text-left flex flex-col gap-1 transition-colors ${
                    freightMode === 'ocean'
                      ? 'bg-surface-container'
                      : 'bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-label-technical text-label-technical uppercase font-bold text-primary">
                      Ocean FCL (Hamburg)
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      {freightMode === 'ocean'
                        ? 'check_circle'
                        : 'radio_button_unchecked'}
                    </span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-primary">
                    €2,850
                  </span>
                  <span className="font-label-code text-label-code text-secondary">
                    Transit: 24-28 Calendar Days
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setFreightMode('air')}
                  className={`p-space-sm rounded text-left flex flex-col gap-1 transition-colors ${
                    freightMode === 'air'
                      ? 'bg-surface-container'
                      : 'bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-label-technical text-label-technical uppercase font-medium text-on-surface-variant">
                      Air Cargo (Frankfurt)
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      {freightMode === 'air'
                        ? 'check_circle'
                        : 'radio_button_unchecked'}
                    </span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    €6,420
                  </span>
                  <span className="font-label-code text-label-code text-secondary">
                    Transit: 3-5 Working Days
                  </span>
                </button>
              </div>
            </div>

            {/* Total Breakdown Drawer */}
            <div className="p-space-md bg-surface-container rounded-lg flex flex-col gap-space-xs mt-space-xs">
              <div className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant">
                <span>Aggregated {selectedRfq.volumeLabel} (Tier -22%):</span>
                <span className="font-label-code text-label-code font-medium text-on-surface">
                  {formatEur(selectedRfq.baseSubtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant">
                <span>Specialty Surcharges (TC + Pouch + Laser):</span>
                <span className="font-label-code text-label-code font-medium text-on-surface">
                  {formatEur(selectedRfq.surchargesSubtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant">
                <span>Associated Patterns:</span>
                <span className="font-label-code text-label-code font-medium text-on-surface">
                  {formatEur(selectedRfq.associatedSubtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant">
                <span>
                  {freightMode === 'ocean'
                    ? 'CIF Maritime Insurance + Port Charges:'
                    : 'Air Express Priority + Customs:'}
                </span>
                <span className="font-label-code text-label-code font-medium text-on-surface">
                  {formatEur(freightCost)}
                </span>
              </div>
              <div className="h-px bg-surface-container-highest my-1" />
              <div className="flex items-baseline justify-between">
                <div className="flex flex-col">
                  <span className="font-label-technical text-label-technical uppercase text-secondary font-semibold">
                    Total Contract Quotation
                  </span>
                  <span className="font-label-code text-label-code text-on-surface-variant">
                    Valid for 30 days | Fixed Metal Clause
                  </span>
                </div>
                <span className="font-headline-md text-headline-md font-bold text-primary">
                  {formatEur(calculatedTotal)}
                </span>
              </div>
            </div>

            {dispatchNotice && (
              <div className="p-2.5 rounded bg-emerald-50 border border-emerald-300 text-xs font-mono text-emerald-950">
                {dispatchNotice}
              </div>
            )}

            <div className="flex flex-col gap-space-xs mt-space-xs">
              <button
                type="button"
                onClick={() =>
                  setDispatchNotice(
                    `Formal Offer Dossier authorized & queued for ${selectedRfq.institution} (${selectedRfq.id}).`
                  )
                }
                className="w-full py-3 rounded bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg transition-colors shadow-sm flex items-center justify-center gap-space-xs"
              >
                <span className="material-symbols-outlined text-[18px]">
                  verified
                </span>
                <span>Authorize &amp; Dispatch Formal Offer Dossier</span>
              </button>
              <div className="grid grid-cols-2 gap-space-xs">
                <button
                  type="button"
                  onClick={() =>
                    setDispatchNotice(`Proforma Invoice PDF generated for ${selectedRfq.id}.`)
                  }
                  className="py-2 rounded bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    picture_as_pdf
                  </span>
                  <span>Generate Proforma PDF</span>
                </button>
                <button
                  type="button"
                  className="py-2 rounded bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    edit_note
                  </span>
                  <span>Modify Price Matrix</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-xs">
            <div className="flex items-center justify-between text-secondary">
              <span className="font-label-technical text-label-technical uppercase">
                Metallurgical Heat Guarantee
              </span>
              <span className="material-symbols-outlined text-[18px] text-primary">
                lock_clock
              </span>
            </div>
            <div className="flex items-center gap-space-sm mt-1">
              <div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  biotech
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  Forging Heat Lot: {selectedRfq.heatLot}
                </span>
                <span className="font-label-code text-label-code text-on-surface-variant">
                  Passivation DIN EN ISO 16062 / ASTM A967
                </span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Material mill certificates (EN 10204 3.1) and ultrasonic crack
              detection reports are automatically bound to this quotation bundle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
